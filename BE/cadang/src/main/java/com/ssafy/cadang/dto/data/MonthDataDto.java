package com.ssafy.cadang.dto.data;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MonthDataDto {

    private List<DayDataDtoByMonth> monthDataList;
    private boolean hasPrevious;
    private boolean hasNext;



}
