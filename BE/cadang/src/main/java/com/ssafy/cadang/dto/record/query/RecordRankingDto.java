package com.ssafy.cadang.dto.record.query;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RecordRankingDto {
    private String drinkName;
    private String franchiseName;
    private int amount;

}
