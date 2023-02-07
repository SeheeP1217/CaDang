package com.ssafy.cadang.dto.data;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class DayGraphDto {

    private LocalDate date;
    private int caffeine;
    private int sugar;
}
