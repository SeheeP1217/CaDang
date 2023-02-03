package com.ssafy.cadang.controller;


import com.ssafy.cadang.dto.UserDto;

import com.ssafy.cadang.service.EmailServiceImpl;
import com.ssafy.cadang.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
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
    public ResponseEntity<String> join(@Valid @ModelAttribute UserDto userDto) throws IOException {

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

        // Todo: key 값을 입력하지 않았을시 예외처리
        if (key.isEmpty()) {
            // 키를 입력해주세요 알림
            return false;
        }
        try {
            key_check = emailService.verifyEmail(email, key);
            if (!key_check) {
                return false;
            }
        } catch (ChangeSetPersister.NotFoundException e) {
            // Todo: 키 값을 잘못 입력했을 시 에러 메시지 띄우기
            // Todo: 인증번호를 잘못입력하였습니다.
            throw new RuntimeException(e);
        }

        return true;

    }


//    @PostMapping("/signup")
//    public ResponseEntity<User> signup(
//            @Valid @RequestBody UserDto userDto
//    ) {
//        return ResponseEntity.ok(userService.signup(userDto));
//    }
//
//    // USER,ADMIN 두가지 권한 모두 허용
//    @GetMapping("/user")
//    @PreAuthorize("hasAnyRole('USER','ADMIN')")
//    public ResponseEntity<User> getMyUserInfo() {
//        return ResponseEntity.ok(userService.getMyUserWithAuthorities().get());
//    }
//
//    // ADMIN 권한만 호출 허용
//    @GetMapping("/user/{username}")
//    @PreAuthorize("hasAnyRole('ADMIN')")
//    public ResponseEntity<User> getUserInfo(@PathVariable String username) {
//        return ResponseEntity.ok(userService.getUserWithAuthorities(username).get());
//    }
}
