package com.ssafy.cadang.file;


import com.ssafy.cadang.dto.UserDto;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;

@Slf4j
//@Controller
@RequiredArgsConstructor
public class UserProfileImgController {

    private final UserRepository userRepository;
    private final FileStore fileStore;


//    public String saveProfile(@ModelAttribute
//                              UserDto userDto,
//                              RedirectAttributes) throws IOException{
//        UploadFile attachFile = fileStore.storefile(userDto.getImg());
//
//
//    }

}
