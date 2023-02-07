package com.ssafy.cadang.dto.record.query;

import lombok.Data;

@Data
public class RecordRankingDto {
    private String drinkName;
    private String franchiseName;
    private int amount;

    public RecordRankingDto(String drinkName, String franchiseName, int amount) {
        this.drinkName = drinkName;
        this.franchiseName = franchiseName;
        this.amount = amount;
    }
}
