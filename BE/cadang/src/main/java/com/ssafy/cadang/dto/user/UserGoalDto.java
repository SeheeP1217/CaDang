package com.ssafy.cadang.dto.user;


import lombok.*;

import javax.validation.constraints.*;

@Data
@Builder
public class UserGoalDto {



    @NotNull
    @Min(value = 0,  message = "카페인 목표량은 최소 0 최대 1000 mg만 가능합니다.")
    @Max(value = 1000,  message = "카페인 목표량은 최소 0 최대 1000 mg만 가능합니다.")
    private Long caffeGoal;

    @NotNull
    @Min(value = 0,  message = "당 목표량은 최소 0 최대 1000 mg만 가능합니다.")
    @Max(value = 500,  message = "당 목표량은 최소 0 최대 1000 mg만 가능합니다.")
    private Long sugarGoal;
}
