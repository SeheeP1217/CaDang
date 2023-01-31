package com.ssafy.cadang.file;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

//@Component
public class FileStore {

    @Value("${file.dir}")
    private String fileDir;

    public String getFullPath(String filename){
        return fileDir + filename;
    }

    public UploadFile storefile(MultipartFile multipartFile) throws IOException{
        if (multipartFile.isEmpty()) {
            return null;
        }
        String originalFilename = multipartFile.getOriginalFilename();
        String storeFilename = createStoreFileName(originalFilename);
        multipartFile.transferTo(new File(getFullPath(storeFilename)));
        return new UploadFile(originalFilename, storeFilename);

    }

    // 서버에 저장할 파일명을 만든다.
    private String createStoreFileName(String originalFilename) {
        String ext = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    // 원본 파일의 확장자를 반환한다.
    private String extractExt(String originalFilename){
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }


}
