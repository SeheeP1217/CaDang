package com.ssafy.cadang.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        Info info = new Info()
                .title("마실까? 말까? API")
                .version("1.6.7")
                .description("마실까 말까 프로젝트 API 설명서 입니다! 조랭이떡 화이팅!!!");

        return new OpenAPI()
                .components(new Components())
                .info(info);
    }
}
