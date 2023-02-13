package com.ssafy.cadang.jwt;

public interface JwtProperties {
    String SECRET = "amF5amF5LXZlbG9nLWp3dC1zcHJpbmctYm9vdC10cmFpbmluZy1zZWNyZXQta2V5LWpheWpheS1qd3QtdHJhaW5pbmctdHV0b3JpYWw=";
    String REFRESH_SECRET = "Y2FkYW5nLXZlbG9nLWp3dC1zcHJpbmctYm9vdC10cmFpbmluZy1yZWZyZXNoLXNlY3JldC1rZXktand0LXJlZnJlc2gtdG9rZW4tZ2VuZXJhdGU=";

    String DOMAIN = "i8a808.p.ssafy.io";
    int EXPIRATION_TIME = 60000 * 60 * 24; // 뒤에 숫자가 분
    int REFRESH_EXPIRATION_TIME = 60000 * 60 * 24 * 14; // 2주로 설정, int 범위를 넘지 않는다.

    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
