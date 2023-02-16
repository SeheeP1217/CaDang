package com.ssafy.cadang.error;

import com.ssafy.cadang.domain.Franchise;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ExceptionEnum {

    // User
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "USER-001", "사용자를 찾을 수 없습니다."),
    USER_ID_DUPLICATED(HttpStatus.BAD_REQUEST, "USER-002", "사용중인 아이디입니다."),
    USER_MAIL_DUPLICATED(HttpStatus.BAD_REQUEST, "USER-003", "사용중인 이메일입니다."),
    USER_ID_EMPTY(HttpStatus.BAD_REQUEST, "USER-004", "아이디를 입력해주세요"),
    MAIL_VERIFY_FAIL(HttpStatus.BAD_REQUEST, "USER-005", "이메일 인증번호가 만료되었거나 다릅니다"),
    MAIL_VERIFY_EMPTY(HttpStatus.BAD_REQUEST, "USER-006", "인증번호를 입력해주세요."),
    ID_OR_PW_NOT_FOUND(HttpStatus.NOT_FOUND, "USER-007", "아이디 또는 비밀번호를 잘못 입력하셨습니다."),
    PASSWORD_NOT_VALID(HttpStatus.BAD_REQUEST, "USER-008", "비밀번호 형식이 유효하지 않습니다."),
    MAIL_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "USER-009", "사용중인 이메일입니다."),

    PASSWORD_INCORRECT(HttpStatus.BAD_REQUEST, "USER-010", "비밀번호가 틀렸습니다"),

    NEWPASSWORD_DIFFERENT(HttpStatus.BAD_REQUEST, "USER-011", "새 비밀번호를 다시 확인해주세요"),

    USER_NOT_SAME(HttpStatus.BAD_REQUEST, "USER-012", "사용자 정보가 일치하지 않습니다."),

    MAIL_EMPTY(HttpStatus.NOT_FOUND, "USER-013", "이메일을 입력해주세요"),
    // Data
    DATA_NOT_FOUND(HttpStatus.NOT_FOUND, "DATA-001", "데이터를 찾을 수 없습니다."),

    // Drink
    DRINK_NOT_FOUND(HttpStatus.NOT_FOUND, "DRINK-001", "음료를 찾을 수 없습니다."),

    // Record
    RECORD_NOT_FOUND(HttpStatus.NOT_FOUND, "RECORD-001", "기록을 찾을 수 없습니다."),
    RECORD_NOT_ALLOWED_MODIFY(HttpStatus.BAD_REQUEST, "RECORD-002", "주문 음료는 등록 날짜를 수정할 수 없습니다."),

    // Store
    STORE_NOT_FOUND(HttpStatus.NOT_FOUND, "STORE-001", "가게를 찾을 수 없습니다."),
    STORE_NO_INPUT(HttpStatus.BAD_REQUEST, "STORE-002", "들어온 가게 리스트가 없습니다"),

    // Order
    ORDER_NOT_FOUND(HttpStatus.NOT_FOUND, "ORDER-001", "주문을 찾을 수 없습니다."),
    ORDER_NOT_SAME(HttpStatus.BAD_REQUEST, "ORDER-002", "주문정보와 사용자정보가 일치하지 않습니다."),

    FRANCHISE_NOT_FOUND(HttpStatus.NOT_FOUND, "FRANCHISE-001", "프랜차이즈를 찾을 수 없습니다."),
    FRANCHISE_NOT_IN_DATABASE(HttpStatus.NOT_FOUND, "FRANCHISE-002", "DB에 요청하신 가게와 맞는 프랜차이즈가 없습니다." );



    private final HttpStatus httpStatus;
    private final String errorCode;
    private final String message;

}
