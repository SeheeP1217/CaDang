package com.ssafy.cadang.dto.data;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class WeekDataDto {

    WeekGraphDto thisWeekGraphList;
    int todayCaffe;
    int todaySugar;
    int dayCaffeGap;
    int daySugarGap;
    int thisWeekCaffe;
    int thisWeekSugar;
    int weekCaffeGap;
    int weekSugarGap;

}
