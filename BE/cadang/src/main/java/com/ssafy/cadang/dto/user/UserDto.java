package com.ssafy.cadang.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.cadang.valid.ValidId;
import com.ssafy.cadang.valid.ValidPassword;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    //회원 가입시에 사용할 userDto 클래스

    @NotNull
    @NotEmpty(message = "회원 이름은 필수입니다.")
    @Size(min = 1, max = 8, message = "이름은 1~8자만 가능합니다.")
    private String username;

    @NotNull
    @NotEmpty(message = "회원 아이디는 필수입니다.")
    @ValidId
    @Size(min = 5, max = 15, message = "아이디는 5~15자로 입력해주세요.")
    private String memberId;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    @NotEmpty(message = "패스워드는 필수입니다.")
    @Size(min = 8, max = 20, message = "비밀번호는 8~20자로 입력해주세요.")
    @ValidPassword
    private String password;

    @NotNull
    @NotEmpty(message = "이메일은 필수입니다.")
    @Email
    private String email;

    @NotNull
    @NotEmpty(message = "닉네임은 필수입니다.")
    @Size(min = 1, max = 8, message = "닉네임은 1~8자만 가능합니다.")
    private String nickname;



    @Min(value = 0,  message = "카페인 목표량은 최소 0 최대 1000 mg만 가능합니다.")
    @Max(value = 1000,  message = "카페인 목표량은 최소 0 최대 1000 mg만 가능합니다.")
    private Long caffeGoal;


    @Min(value = 0,  message = "당 목표량은 최소 0 최대 1000 mg만 가능합니다.")
    @Max(value = 500,  message = "당 목표량은 최소 0 최대 1000 mg만 가능합니다.")
    private Long sugarGoal;

    MultipartFile img;




}
