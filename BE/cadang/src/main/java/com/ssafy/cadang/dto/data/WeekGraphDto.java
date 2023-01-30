package com.ssafy.cadang.dto.data;

import lombok.Data;

import java.util.List;

@Data
public class WeekGraphDto {

    List<DayGraphDto> weekDataList;
    boolean hasContent;
}
