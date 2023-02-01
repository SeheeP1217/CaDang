//package com.ssafy.cadang.file;
//
//
//import com.ssafy.cadang.dto.UserDto;
//import com.ssafy.cadang.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.servlet.mvc.support.RedirectAttributes;
//
//import java.io.IOException;
//
//@Slf4j
////@Controller
//@RequiredArgsConstructor
//public class UserProfileImgController {
//
//    //private final UserRepository userRepository;
//    private final FileStore fileStore;
//
//
//    // 서버내 해당 경로에 프로필 이미지를 저장한다.
//    public String saveProfile(@ModelAttribute
//                              UserDto userDto) throws IOException{
//        // 이 부분을 user/join 부분에서 구현해야 한다.
//        // 유저가 회원가입 폼에 올린 이미지 파일을 서버에 저장한다.
//        // 만약에 이미지를 올리지 않은 경우는 FileStore에 있는 storefile 메소드에서 로직을 처리한다.
//        if (userDto.getImg() == null) {
//
//        }else{
//            // 서버에 이미지 올리기
//            fileStore.storefile(userDto.getImg());
//        }
//
//
//
//
//    }
//
//}
