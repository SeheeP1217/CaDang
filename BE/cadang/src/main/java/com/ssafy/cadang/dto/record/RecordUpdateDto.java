package com.ssafy.cadang.dto.record;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class RecordUpdateDto {
    private Long id;

    private String regDate;
    private Boolean isPublic;
    private String memo;
    private MultipartFile image;
    private int isModified;

    public RecordUpdateDto() {
    }
}
