package com.ssafy.cadang.file;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;

@Controller
@Slf4j
public class UploadController {

    private String fileDir = ("${IMAGE_PATH}");

    //회원 가입 시 프로필 사진 올리기
    @PostMapping("/user/upload")
    public void saveProfileImg(@RequestParam MultipartFile file,
                               HttpServletRequest request) throws IOException {
        log.info("request={}",request);
        log.info("multipartFile={}",file);
        // Todo: 이미지 저장할 때 예외처리 (확장자가 맞는지,크기가 너무 크지 않는지)
        // Todo: 서버에 저장되는 이미지의 이름이 동일할 수 있으므로 처리가 필요하다.
        if(!file.isEmpty()){
            String fullPath = fileDir + file.getOriginalFilename();
            log.info("파일 저장 fullPath={}", fullPath);
            file.transferTo(new File(fullPath)); //해당 경로에 파일 저장
        }

    }





}
