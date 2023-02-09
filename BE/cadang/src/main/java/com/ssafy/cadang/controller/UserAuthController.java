package com.ssafy.cadang.controller;


import com.ssafy.cadang.dto.user.UserDto;
import com.ssafy.cadang.dto.user.UserGoalDto;
import com.ssafy.cadang.dto.user.UserPassChangeDto;
import com.ssafy.cadang.service.DataService;
import com.ssafy.cadang.service.UserAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user2")
public class UserAuthController {

    private final UserAuthService userAuthService;
    private final DataService dataService;

    // 초기 카페인, 당목표량 설정
    @PutMapping("/goalSet")
    public ResponseEntity<String> goalSet(HttpServletRequest request, UserGoalDto userGoalDto) throws Exception {
        Long id = Long.valueOf(request.getAttribute("userId").toString());

        userAuthService.setGoal(userGoalDto,id);

        return new ResponseEntity<>("success", HttpStatus.OK);

    }


    //유저 프로필 수정
    @PutMapping("/modify")
    public ResponseEntity<String> modify(HttpServletRequest request, UserDto userDto) {
        Long id = Long.valueOf(request.getAttribute("userId").toString());

        userAuthService.modifyUserInfo(userDto, id);
        dataService.updateGoal(id);


        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    // 유저 프로필 사진



    //로그인 이후 비밀번호 재설정
    @PutMapping("/newpass")
    public ResponseEntity<String> newpass(HttpServletRequest request, UserPassChangeDto userPassChangeDto) {
        Long id = Long.valueOf(request.getAttribute("userId").toString());

        userAuthService.newpass(userPassChangeDto, id);

        return new ResponseEntity<>("success", HttpStatus.OK);
    }


    // 회원 탈퇴하기
    //Todo: 토큰 삭제하기
    @DeleteMapping("/deleteAccount")
    public ResponseEntity<String> deleteAccount(HttpServletRequest request,String password) {
        Long id = Long.valueOf(request.getAttribute("userId").toString());

        userAuthService.deleteUser(id, password);

        return new ResponseEntity<>("success", HttpStatus.OK);

    }


}
