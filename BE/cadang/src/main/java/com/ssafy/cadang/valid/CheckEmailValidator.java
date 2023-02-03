package com.ssafy.cadang.valid;

import com.ssafy.cadang.dto.UserDto;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;


@RequiredArgsConstructor
@Component
public class CheckEmailValidator extends AbstractValidator<UserDto> {

    private final UserRepository userRepository;

    @Override
    protected void doValidate(UserDto userDto, Errors errors) {
        if (userRepository.existsByEmail(userDto.getEmail())) {
            errors.rejectValue("email", "이메일 중복 오류", "이미 사용중인 이메일 입니다.");
        }
    }

}
