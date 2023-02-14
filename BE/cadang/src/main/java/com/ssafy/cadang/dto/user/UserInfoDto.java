package com.ssafy.cadang.dto.user;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDto {


    private String memberId;

    private String username;

    @Length(min = 1, max = 20, message = "닉네임은 1~20자만 가능합니다.")
    private String nickname;

    private String email;

    @Min(value = 0, message = "카페인 목표량은 최소 0 최대 1000 mg만 가능합니다.")
    @Max(value = 1000, message = "카페인 목표량은 최소 0 최대 1000 mg만 가능합니다.")
    private Long caffeGoal;

    @Min(value = 0, message = "당 목표량은 최소 0 최대 1000 mg만 가능합니다.")
    @Max(value = 500, message = "당 목표량은 최소 0 최대 1000 mg만 가능합니다.")
    private Long sugarGoal;


    private String imgUrl;
    private int isModified;


}
