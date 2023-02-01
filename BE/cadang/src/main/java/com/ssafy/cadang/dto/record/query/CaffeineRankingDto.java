package com.ssafy.cadang.dto.record.query;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class CaffeineRankingDto {
    private String drinkName;
    private String franchiseName;
    private int caffeine;

    public CaffeineRankingDto(String drinkName, String franchiseName, int caffeine) {
        this.drinkName = drinkName;
        this.franchiseName = franchiseName;
        this.caffeine = caffeine;
    }
}
