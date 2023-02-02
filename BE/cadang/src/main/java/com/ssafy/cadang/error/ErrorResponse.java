package com.ssafy.cadang.error;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.ResponseEntity;

@Data
@Builder
public class ErrorResponse {
    private int status;
    private String message;


    public static ResponseEntity<ErrorResponse> toResponseEntity(ExceptionEnum e) {
        return ResponseEntity
                .status(e.getHttpStatus())
                .body(ErrorResponse.builder()
                        .status(e.getHttpStatus().value())
                        .message(e.getMessage())
                        .build());
    }
}
