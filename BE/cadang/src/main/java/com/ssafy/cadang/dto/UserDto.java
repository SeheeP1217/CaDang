package com.ssafy.cadang.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.cadang.domain.User;
import lombok.*;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class UserDto {
    //회원 가입시에 사용할 userDto 클래스

    @NotNull
    @NotEmpty(message = "회원 이름은 필수입니다.")
    @Size(min = 3, max = 50)
    private String username;


    @NotNull
    @NotEmpty(message = "회원 아이디는 필수입니다.")
    private String memberId;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    @NotEmpty(message = "패스워드는 필수입니다.")
    @Size(min = 3, max = 100)
    private String password;

    @NotNull
    @NotEmpty(message = "이메일은 필수입니다.")
    private String email;

    @NotNull
    @NotEmpty(message = "닉네임은 필수입니다.")
    @Size(min = 3, max = 50)
    private String nickname;

    private String img;


    public UserDto(User user){
        username = user.getUserName();
        memberId = user.getMemberId();
        password = user.getPassword();
        email = user.getEmail();
        nickname = user.getNickname();
        img = user.getImg();

    }


}
