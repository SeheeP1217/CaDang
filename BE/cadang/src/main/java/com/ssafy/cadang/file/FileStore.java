//package com.ssafy.cadang.file;
//
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.io.IOException;
//import java.util.UUID;
//
/////////////////////서버에 프로필 이미지를 저장하는 역할
////@Component
//public class FileStore {
//
////    @Value("${USER_PROFILE_PATH}")
////    private String fileDir;
////
////    @Value("${DEFAULT_PROFILE_PATH}")
////
////    public String getFullPath(String filename){
////        return fileDir + filename;
////    }
//
//    // 서버에 변경된 파일명으로 저장한다.
////    public UploadFile storefile(MultipartFile multipartFile) throws IOException{
////
////        // 유저가 프로필 이미지를 올리지 않은 경우
////        // ToDo : 기본이미지 경로로 DB에 저장해야 한다.
////        // ToDo: 이 부분이 UserService join() 부분에 경로를 추가하는 코드로 추가 되야한다.
////        if (multipartFile.isEmpty()) {
////            return null;
////        }
////        String originalFilename = multipartFile.getOriginalFilename();
////        String storeFilename = createStoreFileName(originalFilename);
////        multipartFile.transferTo(new File(getFullPath(storeFilename)));
////        return new UploadFile(originalFilename, storeFilename);
////
////    }
//
//    // 서버에 변경된 파일명으로 저장한다.
////    public void storefile(MultipartFile multipartFile) throws IOException{
////
////        // 유저가 프로필 이미지를 올리지 않은 경우
////        // ToDo : 기본이미지 경로로 DB에 저장해야 한다.
////        // ToDo: 이 부분이 UserService join() 부분에 경로를 추가하는 코드로 추가 되야한다.
////        if (multipartFile.isEmpty()) {
////            return null;
////        }
////        String originalFilename = multipartFile.getOriginalFilename();
////        String storeFilename = createStoreFileName(originalFilename);
////        multipartFile.transferTo(new File(getFullPath(storeFilename)));
////
////    }
////
////    // 서버에 저장할 파일명을 만든다.
////    private String createStoreFileName(String originalFilename) {
////        String ext = extractExt(originalFilename);
////        String uuid = UUID.randomUUID().toString();
////        return uuid + "." + ext;
////    }
////
////    // 원본 파일의 확장자를 반환한다.
////    private String extractExt(String originalFilename){
////        int pos = originalFilename.lastIndexOf(".");
////        return originalFilename.substring(pos + 1);
////    }
//
//
//}
