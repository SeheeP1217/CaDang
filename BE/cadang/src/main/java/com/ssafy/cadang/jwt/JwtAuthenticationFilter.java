package com.ssafy.cadang.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.cadang.auth.PrincipalDetails;
import com.ssafy.cadang.dto.user.LoginDto;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;


// 스프링 시큐리티에서 UsernamePasswordAuthenticationFilter 가 있음.
// /login 요청해서 id, pw 를 전송하면(post)
// UsernamePasswordAuthenticationFilter 동작을 함
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    private static final String AUTHORITIES_KEY = "auth";
    private Key key;





    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(JwtProperties.SECRET);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // /login 요청을 하면 로그인 시도를 위해서 실행되는 함수
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        System.out.println("로그인 시도");
        // 1. id, pw 를 받아서
        try {
//            BufferedReader br = request.getReader();
//
//            String input = null;
            ObjectMapper om = new ObjectMapper();
            LoginDto loginDto = om.readValue(request.getInputStream(), LoginDto.class);

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(loginDto.getMemberId(), loginDto.getPassword());

            // PrincipalDetailsService의 loadUserByUsername() 함수가 실행된 후 정상이면
            // authentication이 리턴됨.
            // DB에 있는 id와 pw 가 일치한다.
            // authentication 에 로그인한 정보가 담긴다.
            Authentication authentication =
                    authenticationManager.authenticate(authenticationToken);

            // authentication 객체가 session 영역에 저장됨! => 로그인이 되었다는 뜻
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

            // authentication 객체가 session 영역에 저장을 해야하고 그 방법이 return 해주면 됨.
            // 리턴의 이유는 권한 권리를 security가 대신 해주기 때문에 편하려고 하는 것임
            // 근데 굳이 JWT 토큰을 사용하면서 세션을 만들 이유가 없음. 단지 권한 처리 때문에 session에 넣어준다.

            System.out.println("로그인 정상");

            return authentication;
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 2. 정상인지 로그인 시도를 해보는 거다. authenticationManager로 로그인 시도를 하면!
        //    PrincipalDetailsService 가 호출이 된다. loadUserByUsername 함수 실행됨.

        // 3. PrincipalDetails를 세션에 담고 (세션에 담아야 권한 권리가 된다,권한 관리를 위해서 필요함)

        // 4. JWT 토큰을 만들어서 응답해주면 됨.

        //Todo: 오류가 나면 에러 리턴
        return null;
    }

    // attemptAuthentication 실행 후 인증이 정상적으로 되었으면 successfulAuthentication 함수가 실행됨
    // JWT 토큰을 만들어서 request 요청한 사용자에게 JWT토큰을 response해주면 됨.
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {

        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        String authorities = authResult.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date validity = new Date(now + JwtProperties.EXPIRATION_TIME);
        System.out.println(validity);

        // RSA 방식은 아니고 Hash 암호방식
        // claim을 통해 넣고 싶은 정보들을 집어넣는다.
        // 권한, 아이디, 패스워드를 집어넣었다.
        System.out.println(principalDetails.getUsername() + " " + authorities + " " + principalDetails.getUser().getPassword());
        afterPropertiesSet();
        System.out.println(this.key);


        String jwtToken = Jwts.builder()
                .setSubject(principalDetails.getUsername())
                .claim("id",principalDetails.getUser().getId())
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(this.key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();


        System.out.println("토큰: " + jwtToken);

        response.addHeader("Authorization", "Bearer " + jwtToken);
        System.out.println("토큰 발급 성공");


    }
}
