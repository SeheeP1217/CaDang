package com.ssafy.cadang.controller;



import com.ssafy.cadang.dto.UserDto;
import com.ssafy.cadang.dto.data.EmailRequest;
import com.ssafy.cadang.file.FileStore;
import com.ssafy.cadang.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.Random;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    //회원가입
    @PostMapping("/user/join")
    public void join(@Valid @ModelAttribute UserDto userDto) throws IOException {
        // 유효성 검증은 서비스에서 한다.
        userService.join(userDto);
    }

    // 이메일 전송
    @PostMapping("/user/email")
    public ResponseEntity<Void> authEmail(@RequestBody @Valid EmailRequest request) {
        userService.authEmail(request);
        return ResponseEntity.ok().build();
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
