package com.ssafy.cadang.dto.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmailVerifyDto {
    private boolean check;
    private Long id;
}
