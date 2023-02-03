package com.ssafy.cadang.valid;

import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Slf4j
public abstract class AbstractValidator<T> implements Validator {

    @Override
    public boolean supports(Class<?> classes) {
        return true;
    }

    @SuppressWarnings("unchecked")// 컴파일러에서 경고하지 않도록 하기 위해 사용
    @Override
    public void validate(Object target, Errors errors) {
        try {
            doValidate((T) target, errors);
        } catch (RuntimeException e) {
            log.error("중복 검증 에러", e);
            throw e;
        }
    }

    protected abstract void doValidate(final T dto, final Errors errors);

}
