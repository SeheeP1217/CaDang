package com.ssafy.cadang.controller;

//import com.jayjay.jwttest.dto.UserDto;
//import com.jayjay.jwttest.entity.User;
//import com.jayjay.jwttest.service.UserService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//import javax.validation.Valid;
//
//@RestController
//@RequestMapping("/api")
//public class UserController {
//    private final UserService userService;
//
//    public UserController(UserService userService) {
//        this.userService = userService;
//    }
//
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
//}
