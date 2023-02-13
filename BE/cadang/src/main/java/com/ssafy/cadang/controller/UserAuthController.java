package com.ssafy.cadang.controller;


import com.ssafy.cadang.dto.user.UserGoalDto;
import com.ssafy.cadang.dto.user.UserModifyDto;
import com.ssafy.cadang.dto.user.UserPassChangeDto;
import com.ssafy.cadang.service.DataService;
import com.ssafy.cadang.service.UserAuthService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user2")
public class UserAuthController {

    private final UserAuthService userAuthService;
    private final DataService dataService;
    private final Logger logger = LoggerFactory.getLogger(OrderController.class);


    // 초기 카페인, 당목표량 설정
    @PutMapping("/goalSet")
    public ResponseEntity<?> goalSet(HttpServletRequest request, @Valid @RequestBody UserGoalDto userGoalDto, BindingResult bindingResult) throws Exception {

        logger.info("goalSet - 호출 {} ");
        logger.info(" 요청 시간 - {}", LocalDateTime.now());


        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(fieldError ->
                    errors.put(fieldError.getField(), fieldError.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }
        Long id = Long.valueOf(request.getAttribute("userId").toString());

        userAuthService.setGoal(userGoalDto, id);
        dataService.updateGoal(id);

        return new ResponseEntity<>("success", HttpStatus.OK);

    }


    //유저 프로필 수정
    @PutMapping("/modify")
    public ResponseEntity<?> modify( @Valid UserModifyDto userModifyDto, BindingResult bindingResult, HttpServletRequest request) throws IOException {

        logger.info("modify - 호출 {} ");
        logger.info(" 요청 시간 - {}", LocalDateTime.now());

        System.out.println(userModifyDto.getCaffeGoal());
        System.out.println(userModifyDto.getSugarGoal());
        System.out.println(userModifyDto.getNickname());

        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(fieldError ->
                    errors.put(fieldError.getField(), fieldError.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }

        Long id = Long.valueOf(request.getAttribute("userId").toString());


        userAuthService.modifyUserInfo(userModifyDto, id);
        dataService.updateGoal(id);


        return new ResponseEntity<>("success", HttpStatus.OK);
    }



    //로그인 이후 비밀번호 재설정
    @PutMapping("/newpass")
    public ResponseEntity<?> newpass(HttpServletRequest request, @Valid UserPassChangeDto userPassChangeDto, BindingResult bindingResult) {

        logger.info("newpass - 호출 {} ");
        logger.info(" 요청 시간 - {}", LocalDateTime.now());

        Long id = Long.valueOf(request.getAttribute("userId").toString());

        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(fieldError ->
                    errors.put(fieldError.getField(), fieldError.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }

        userAuthService.newpass(userPassChangeDto, id);

        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ResponseEntity<String> logout(HttpServletResponse response) {

        logger.info("logout - 호출 {} ");
        logger.info(" 요청 시간 - {}", LocalDateTime.now());

        response.setHeader("Authorization","logout");

        return new ResponseEntity<>("logout success", HttpStatus.OK);

    }



    // 회원 탈퇴하기
    @DeleteMapping("/deleteAccount")
    public ResponseEntity<?> deleteAccount(HttpServletRequest request,String password) {

        logger.info("deleteAccount - 호출 {} ");
        logger.info(" 요청 시간 - {}", LocalDateTime.now());

        Long id = Long.valueOf(request.getAttribute("userId").toString());

        userAuthService.deleteUser(id, password);

        return new ResponseEntity<>("success", HttpStatus.OK);

    }


}
