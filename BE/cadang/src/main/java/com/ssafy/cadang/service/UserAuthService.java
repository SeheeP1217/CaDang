package com.ssafy.cadang.service;


import com.ssafy.cadang.domain.User;
import com.ssafy.cadang.error.CustomException;
import com.ssafy.cadang.error.ExceptionEnum;
import com.ssafy.cadang.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@Slf4j
public class UserAuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public UserAuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 아이디 찾기
    public String findId(String username, String email) {


        if (!userRepository.existsUserByMemberIdAndEmail(username,email)) {
            throw new CustomException(ExceptionEnum.USER_NOT_FOUND);
        }

        User user = userRepository.findByMemberIdAndEmail(username, email);

        return user.getMemberId();

    }



}
