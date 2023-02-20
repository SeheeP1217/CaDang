package com.ssafy.cadang.dto.data;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Builder
@Data
public class DayDataDtoByMonth {
    private LocalDate date;
    private int caffeDaily;
    private int sugarDaily;
    private Long sugarGoal;
    private Long caffeGoal;
    private boolean caffeSuccess;
    private boolean sugarSuccess;

}