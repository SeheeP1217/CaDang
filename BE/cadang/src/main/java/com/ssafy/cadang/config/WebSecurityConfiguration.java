package com.ssafy.cadang.config;


import com.ssafy.cadang.filter.MyFilter1;
import com.ssafy.cadang.jwt.JwtAuthenticationFilter;
import com.ssafy.cadang.jwt.JwtAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
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
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final CorsFilter corsFilter;




    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/swagger-ui/**",
                "/v3/api-docs/**",
                "/favicon.ico"
        );
    }

    @Autowired
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // …
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(corsFilter) //@CrossOrigin(인증X일 때), 인증(O) => 시큐리티 필터에 등록해야함
                .formLogin().disable() // form 태그로 로그인을 하지 않는다
                .httpBasic().disable() // basic 사용하지 않고 토큰을 사용하겠다.
                //.addFilter(new JwtAuthenticationFilter(authenticationManager(),"${JWT_SECRET}",Long.parseLong("${JWT_EXPIRE_TIME}"))) // AuthenticationManager
                //.addFilter(new JwtAuthorizationFilter(authenticationManager(),"${JWT_SECRET}"))
                .authorizeRequests()
                .antMatchers("/")
                //.access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
                .permitAll();
                //Todo: 권한 설정

//                .anyRequest().authenticated();
//
//                .and()
//                .addFilterBefore(new JwtFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}