package com.ssafy.cadang.config;


import com.ssafy.cadang.jwt.*;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Repository;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
//@EnableMethodSecurity(prePostEnabled = true)
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final CorsFilter corsFilter;
    private final UserRepository userRepository;

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;


    public WebSecurityConfiguration(CorsFilter corsFilter, UserRepository userRepository,
                                    JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
                                    JwtAccessDeniedHandler jwtAccessDeniedHandler) {
        this.corsFilter = corsFilter;
        this.userRepository = userRepository;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;

    }


    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/swagger-ui/**",
                "/v3/api-docs/**",
                "/favicon.ico"
        );
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션을 사용하지 않겠다.
                .and()
                .addFilter(corsFilter) //@CrossOrigin(인증X일 때), 인증(O) => 시큐리티 필터에 등록해야함
                .formLogin().disable() // form 태그로 로그인을 하지 않는다
                .httpBasic().disable() // basic 사용하지 않고 토큰을 사용하겠다.
                .authorizeRequests()
                //.antMatchers("/")
                //.permitAll()
                .antMatchers("/user2/**").hasRole("USER") // 유저 권한을 가진 클라이언트만 접근이 가능하다.
                .antMatchers("/admin/**").hasRole("ADMIN") // 어드민 권한을 가진 클라이언트만 접근이 가능하다.
                .anyRequest().permitAll()
                .and()
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), passwordEncoder(), userRepository)) // AuthenticationManager  // 로그인을 하면 클라이언트에게 토큰을 발급해주는 필터
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), userRepository));

    // 사용자가 요청을 보낼 때마다 토큰을 검증하는 필터





    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


}