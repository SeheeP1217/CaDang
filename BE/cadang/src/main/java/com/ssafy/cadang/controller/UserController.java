package com.ssafy.cadang.controller;


import com.ssafy.cadang.domain.User;


import com.ssafy.cadang.dto.user.EmailVerifyDto;
import com.ssafy.cadang.dto.user.UserDto;
import com.ssafy.cadang.service.EmailServiceImpl;
import com.ssafy.cadang.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final EmailServiceImpl emailService;


    //회원가입
    @PostMapping("/user/join")
    public ResponseEntity<?> join(@Valid UserDto userDto, BindingResult bindingResult) throws IOException {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(fieldError ->
                    errors.put(fieldError.getField(), fieldError.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }
        userService.join(userDto);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }


    // 회원가입 이메일 인증 번호 발송 및 재발송
    @PostMapping("/user/email")
    public ResponseEntity<?> sendEmailCode(@RequestParam("email") String email) throws Exception {
        // 이메일 중복 검사
        userService.verifyEmail(email);
        emailService.sendSignupMessage(email);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    //이메일 인증 번호 검증
    //Todo: 검증 성공시 성공했다는 반환값을 프론트로 보내줘야 함
    @GetMapping("/user/email/verify")
    public boolean emailVerify(@RequestParam("key") String key, @RequestParam("email") String email) {
        boolean key_check;

        key_check = emailService.verifyEmail(email, key);

        return key_check;

    }

    // 아이디 중복 검증
    @GetMapping("/user/id/verify")
    public boolean idVerify(@RequestParam("id") String id) {
        boolean id_check;

        id_check = userService.verifyId(id);

        return id_check;

    }

    // 비밀번호 찾아서 변경하는 이메일 보내기
    @PostMapping("/user/email/findpw")
    public ResponseEntity<Boolean> findPw(@RequestParam String email, @RequestParam String memberId) throws Exception {
        // 이메일 중복 검사
        if (userService.verifyId(email, memberId))
            emailService.sendChangePassMessage(email);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @GetMapping("/user/email/findpw")
    public ResponseEntity<?> verifyEmail(@RequestParam String key, @RequestParam String email) {
        if (emailService.verifyEmail(email, key)) {
            Long id = userService.findByEmail(email);
            EmailVerifyDto emailVerifyDto = EmailVerifyDto.builder()
                    .check(true)
                    .id(id)
                    .build();
            return new ResponseEntity<>(emailVerifyDto, HttpStatus.OK);
        }

        return new ResponseEntity<Void>(HttpStatus.OK);
    }


    @GetMapping("/user/findid")
    public String findid(@RequestParam("name") String name, @RequestParam("email") String email) {
        return userService.findId(name, email);
    }

    @PutMapping("/user/newpass")
    public boolean updatePassword(@RequestParam Long memberId, @RequestParam String password) {

        userService.updatePasswordByMemberId(memberId, password);

        return true;
    }

}
