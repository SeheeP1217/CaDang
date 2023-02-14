package com.ssafy.cadang.dto.user;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenDto {
    // 토큰 정보를 response 할 때 사용하는 클래스

    private String grantType;
    private String accesstoken;
    private String refreshToken;
    private Long accessTokenExpiresIn;
}
