package com.ssafy.cadang.dto.user;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserFindPassDto {


    private String memberId;
    private String email;
    private String key;


}
