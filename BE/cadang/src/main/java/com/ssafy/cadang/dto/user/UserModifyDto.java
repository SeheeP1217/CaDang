package com.ssafy.cadang.dto.user;


import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;

@Data
@Builder
public class UserModifyDto {

    @NotNull
    @NotEmpty(message = "닉네임은 필수입니다.")
    @Size(min = 1, max = 8, message = "닉네임은 1~8자만 가능합니다.")
    private String nickname;

    @NotNull
    @Min(value = 0,  message = "카페인 목표량은 최소 0 최대 1000 mg만 가능합니다.")
    @Max(value = 1000,  message = "카페인 목표량은 최소 0 최대 1000 mg만 가능합니다.")
    private Long caffeGoal;

    @NotNull
    @Min(value = 0,  message = "당 목표량은 최소 0 최대 1000 mg만 가능합니다.")
    @Max(value = 500,  message = "당 목표량은 최소 0 최대 1000 mg만 가능합니다.")
    private Long sugarGoal;

    MultipartFile img;
}
