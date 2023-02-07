package com.ssafy.cadang.jwt;

public interface JwtProperties {
    String SECRET = "amF5amF5LXZlbG9nLWp3dC1zcHJpbmctYm9vdC10cmFpbmluZy1zZWNyZXQta2V5LWpheWpheS1qd3QtdHJhaW5pbmctdHV0b3JpYWw=";
    int EXPIRATION_TIME = 60000 * 5; // 뒤에 숫자가 분

    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
