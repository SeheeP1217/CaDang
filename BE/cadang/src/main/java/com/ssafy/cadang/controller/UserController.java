package com.ssafy.cadang.controller;


import com.ssafy.cadang.domain.User;
import com.ssafy.cadang.dto.UserDto;
import com.ssafy.cadang.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


    //회원가입
    @PostMapping("/user/join")
    public void join(@Valid @RequestBody UserDto userDto){


        // 유효성 검증은 서비스에서 한다.
        userService.join(userDto);

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
