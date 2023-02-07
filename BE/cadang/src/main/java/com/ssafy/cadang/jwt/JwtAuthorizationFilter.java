package com.ssafy.cadang.jwt;


import com.ssafy.cadang.auth.PrincipalDetails;
import com.ssafy.cadang.repository.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

// 시큐리티가 filter 가지고 있는데 그 필터 중에 BasicAuthenticationFilter 라는 것이 있음.
// 권한이나 인증이 필요한 특정 주소를 요청했을 때 위 필터를 무조건 타게 되어있음.
// 만약에 권한이 인증이 필요한 주소가 아니라면 이 필터를 안 탄다.
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {


    private UserRepository userRepository;
    private Key key;
    private static final String AUTHORITIES_KEY = "auth";


     public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
        super(authenticationManager);
        this.userRepository = userRepository;
    }

    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(JwtProperties.SECRET);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // 인증이나 권한이 필요한 주소요청이 있을 때 해당 필터를 타게 된다.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        System.out.println("인증이나 권한이 필요한 주소 요청이 됨.");
        System.out.println("request:  " +request);
        System.out.println(request.getHeader("Authorization"));

        String jwtHeader = request.getHeader(JwtProperties.HEADER_STRING);

        // header 가 있는지 확인

        if (jwtHeader == null || !jwtHeader.startsWith("Bearer")) {
            chain.doFilter(request, response);
            System.out.println("header가 없음");

            return;
        }

        // JWT 토큰을 검증해서 정상적인 사용자인지 확인해야 한다.
        String token = request.getHeader(JwtProperties.HEADER_STRING).replace(JwtProperties.TOKEN_PREFIX,"");

        System.out.println("token: " + token);

        //Todo: 토큰 유효성 검사 만들기
        // Todo: 권한이 없으면 에러 띄우기

        if (validateToken(token)) {

            afterPropertiesSet();

            Claims claims = Jwts
                    .parserBuilder()
                    .setSigningKey(this.key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            Collection<? extends GrantedAuthority> authorities =
                    Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());



            String username = claims.getSubject();


            // 서명이 정상적으로 됨
            if (username != null) {
                com.ssafy.cadang.domain.User userEntity = userRepository.findByMemberId(username);

                PrincipalDetails principalDetails = new PrincipalDetails(userEntity);
                // JWT 토큰 서명을 통해서 서명이 정상이면 Authentication 객체를 만들어준다.
                Authentication authentication =
                        new UsernamePasswordAuthenticationToken(principalDetails, principalDetails.getUser().getPassword(),principalDetails.getAuthorities());

                // 강제로 시큐리티의 세션에 접근하여 Authentication 객체를 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println("인증이 정상적으로 됨");


            }
        }
        chain.doFilter(request, response);
     }






    private boolean validateToken(String token) {
        afterPropertiesSet();
        System.out.println("key: " + this.key);
        System.out.println(token);

        try {
            Jwts.parserBuilder().setSigningKey(this.key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            logger.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            logger.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            logger.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            logger.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }
}
