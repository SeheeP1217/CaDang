package com.ssafy.cadang.dto.user;


import lombok.*;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Builder
public class UserGoalDto {



    @NotNull
    @NotEmpty(message = "카페인 목표량은 필수입니다.")
    @Size(min = 0, max = 1000, message = "카페인 목표량은 최소 0 최대 1000 mg만 가능합니다.")
    private Long caffeGoal;

    @NotNull
    @NotEmpty(message = "당 목표량은 필수입니다.")
    @Size(min = 0, max = 500, message = "당 목표량은 최소 0 최대 500g만 가능합니다.")
    private Long sugarGoal;
}
