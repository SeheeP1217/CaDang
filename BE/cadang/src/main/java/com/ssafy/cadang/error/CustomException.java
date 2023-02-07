package com.ssafy.cadang.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CustomException extends RuntimeException{
    ExceptionEnum exceptionEnum;
}
