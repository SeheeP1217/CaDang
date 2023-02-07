package com.ssafy.cadang.dto.data;


import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class EmailRequest {
    @Email
    @NotBlank(message = "이메일은 필수입니다")
    private String email;
}
