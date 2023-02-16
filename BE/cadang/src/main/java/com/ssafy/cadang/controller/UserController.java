package com.ssafy.cadang.controller;


import com.ssafy.cadang.dto.user.EmailVerifyDto;
import com.ssafy.cadang.dto.user.UserDto;
import com.ssafy.cadang.dto.user.UserFindPassDto;
import com.ssafy.cadang.service.DataService;
import com.ssafy.cadang.service.EmailServiceImpl;
import com.ssafy.cadang.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


@Tag(name = "권한 없음", description = "권한이 필요하지않은 api 입니다.")
@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final EmailServiceImpl emailService;
    private final DataService dataService;
    private final Logger logger = LoggerFactory.getLogger(OrderController.class);

    //회원가입
    @PostMapping("/user/join")
    @Operation(summary = "회원가입")
    public ResponseEntity<?> join(@Valid UserDto userDto, BindingResult bindingResult) throws IOException {

        logger.info("join - 호출 {} ");
        logger.info(" 요청 시간 - {}", LocalDateTime.now());

        System.out.println("userDto: " + userDto);
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
    @Operation(summary = "회원가입 시 이메일 인증번호 발송")
    public ResponseEntity<?> sendEmailCode(@RequestParam("email") String email) throws Exception {

        logger.info("sendEmailCode - 호출 {} ");
        logger.info(" 요청 시간 - {}", LocalDateTime.now());
        // 이메일 중복 검사
        userService.verifyEmail(email);
        emailService.sendSignupMessage(email);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    //이메일 인증 번호 검증
    //Todo: 검증 성공시 성공했다는 반환값을 프론트로 보내줘야 함
    @GetMapping("/user/email/verify")
    @Operation(summary = "회원가입 시 이메일 인증번호 확인")
    public boolean emailVerify(@RequestParam("key") String key, @RequestParam("email") String email) {

        logger.info("emailVerify - 호출 {} ");
        logger.info(" 요청 시간 - {}", LocalDateTime.now());

        boolean key_check;

        key_check = emailService.verifyEmail(email, key);

        return key_check;

    }

    // 아이디 중복 검증
    @GetMapping("/user/id/verify")
    @Operation(summary = "아이디 중복 확인")
    public boolean idVerify(@RequestParam("id") String id) {

        logger.info("idVerify - 호출 {} ");
        logger.info(" 요청 시간 - {}", LocalDateTime.now());

        boolean id_check;

        id_check = userService.verifyId(id);

        return id_check;

    }

    // 비밀번호 찾아서 변경하는 이메일 보내기
    @PostMapping("/user/email/findpw")
    @Operation(summary = "비밀번호 찾기 시 이메일 인증번호 발송")
    public ResponseEntity<?> findPw(@RequestBody UserFindPassDto userFindPassDto) throws Exception {

        logger.info("findPw - 호출 {} ");
        logger.info(" 요청 시간 - {}", LocalDateTime.now());
        System.out.println("여기 들어감?: " + userFindPassDto.getEmail() + " " + userFindPassDto.getMemberId());

        // 이메일 중복 검사
        if (userService.verifyId(userFindPassDto.getEmail(), userFindPassDto.getMemberId())) {
            emailService.sendChangePassMessage(userFindPassDto.getEmail());
        }
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @GetMapping("/user/email/findpw")
    @Operation(summary = "비밀번호 찾기 시 이메일 인증번호 확인")
    public ResponseEntity<?> verifyEmail(@RequestParam String email, @RequestParam String key) {

        logger.info("verifyEmail - 호출 {} ");
        logger.info(" 요청 시간 - {}", LocalDateTime.now());

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
    @Operation(summary = "아이디 찾기")
    public String findid(@RequestParam("username") String name, @RequestParam("email") String email) {

        logger.info("findid - 호출 {} ");
        logger.info(" 요청 시간 - {}", LocalDateTime.now());

        return userService.findId(name, email);
    }

    @PutMapping("/user/newpass")
    @Operation(summary = "비밀번호 찾기 - 이메일 인증 후 비밀번호 재설정")
    public boolean updatePassword(@RequestParam Long memberId, @RequestParam String password) {

        logger.info("updatePassword - 호출 {} ");
        logger.info(" 요청 시간 - {}", LocalDateTime.now());

        userService.updatePasswordByMemberId(memberId, password);
        return true;
    }

}
