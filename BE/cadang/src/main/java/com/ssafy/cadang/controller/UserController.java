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

//    public UserController(UserService userService) {
//        this.userService = userService;
//    }


    @PostMapping("/user/join")
    public void join(@Valid UserDto userDto){

        User user = new User();
        user.setUserName(userDto.getUsername());
        user.setMemberId(userDto.getMemberId());
        user.setPassword(userDto.getPassword());
        user.setNickname(userDto.getNickname());
        user.setImg(userDto.getImg());

        userService.validateDuplicateUserId(user);
        userService.validateDuplicateEmail(user);
        userService.validateDuplicateNickname(user);

        userService.join(user);

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
