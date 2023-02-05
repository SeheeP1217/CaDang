package com.ssafy.cadang.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ExceptionEnum {
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "USER-001", "사용자를 찾을 수 없습니다."),

    DATA_NOT_FOUND(HttpStatus.NOT_FOUND, "DATA-001", "데이터를 찾을 수 없습니다."),
    DRINK_NOT_FOUND(HttpStatus.NOT_FOUND, "DRINK-001", "음료를 찾을 수 없습니다."),

    USER_ID_DUPLICATED(HttpStatus.BAD_REQUEST, "USER-002", "사용중인 아이디입니다."),
    USER_MAIL_DUPLICATED(HttpStatus.BAD_REQUEST, "USER-003", "사용중인 이메일입니다."),
    USER_ID_EMPTY(HttpStatus.BAD_REQUEST, "USER-004", "아이디를 입력해주세요"),
    MAIL_VERIFY_FAIL(HttpStatus.BAD_REQUEST, "USER-005", "이메일 인증번호가 만료되었거나 다릅니다"),
    MAIL_VERIFY_EMPTY(HttpStatus.BAD_REQUEST, "USER-006", "인증번호를 입력해주세요.");


    private final HttpStatus httpStatus;
    private final String errorCode;
    private final String message;

}
