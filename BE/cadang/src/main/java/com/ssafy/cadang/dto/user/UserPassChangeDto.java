package com.ssafy.cadang.dto.user;


import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@Builder
public class UserPassChangeDto {

    @NotNull
    private String curpass;

    @NotNull
    private String newPass;

    @NotNull
    private String newPassRe;


}
