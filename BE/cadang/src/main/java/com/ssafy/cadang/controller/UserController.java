package com.ssafy.cadang.controller;


import com.ssafy.cadang.domain.User;
import com.ssafy.cadang.dto.UserDto;


import com.ssafy.cadang.service.EmailServiceImpl;
import com.ssafy.cadang.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;


@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final EmailServiceImpl emailService;


    //회원가입
    @PostMapping("/user/join")
    public ResponseEntity<String> join(@Valid UserDto userDto) throws IOException {
        userService.join(userDto);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }


    // 이메일 인증 번호 발송 및 재발송
    @PostMapping("/user/email")
    public ResponseEntity<String> sendEmailCode(@RequestParam("email") String email) throws Exception {
        emailService.sendMessage(email);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    //이메일 인증 번호 검증
    //Todo: 검증 성공시 성공했다는 반환값을 프론트로 보내줘야 함
    @PostMapping("/user/email/verify")
    public boolean emailVerify(@RequestParam("key") String key, @RequestParam("email") String email) {
        boolean key_check;

        key_check = emailService.verifyEmail(email, key);

        return key_check;

    }
    // 아이디 중복 검증
    @PostMapping("/user/id/verify")
    public boolean idVerify(@RequestParam("id") String id) {
        boolean id_check;

        id_check = userService.verifyId(id);

        return id_check;

    }


}
