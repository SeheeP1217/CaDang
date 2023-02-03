package com.ssafy.cadang.valid;

import com.ssafy.cadang.dto.UserDto;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;


@RequiredArgsConstructor
@Component
public class CheckMemberidValidator extends AbstractValidator<UserDto> {

    private final UserRepository userRepository;

    @Override
    protected void doValidate(UserDto userDto, Errors errors) {
        if (userRepository.existsByMemberId(userDto.getMemberId())) {
            errors.rejectValue("memberId", "아이디 중복 오류", "이미 사용중인 아이디 입니다.");
        }
    }

}
