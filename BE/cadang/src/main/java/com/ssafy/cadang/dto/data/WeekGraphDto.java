package com.ssafy.cadang.dto.data;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class WeekGraphDto {

    List<DayGraphDto> weekDataList;
    boolean hasPrevious;
    boolean hasNext;
}
