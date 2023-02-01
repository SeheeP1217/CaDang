package com.ssafy.cadang.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    //회원 가입시에 사용할 userDto 클래스

//
//    @JsonIgnore
//    private Long id;

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

    // ec2 내의 이미지 경로가 저장된다.
    String imgUrl;
    MultipartFile img;


    // DTO에서는 Entity에 값을 전달할 수 있는 toEntity() 메소드와
    // @Builder 어노테이션 기능을 이용한 필더패턴을 정의해서 사용하고 있습니다.


//    public UserDto(User user){
//        username = user.getUserName();
//        memberId = user.getMemberId();
//        password = user.getPassword();
//        email = user.getEmail();
//        nickname = user.getNickname();
//        img = user.getImg();
//
//    }


}
