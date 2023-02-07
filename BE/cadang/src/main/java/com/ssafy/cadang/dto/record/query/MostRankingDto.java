package com.ssafy.cadang.dto.record.query;

import lombok.Data;

@Data
public class MostRankingDto {
    private String drinkName;
    private String franchiseName;
    private long cnt;

    public MostRankingDto(String drinkName, String franchiseName, long cnt) {
        this.drinkName = drinkName;
        this.franchiseName = franchiseName;
        this.cnt = cnt;
    }
}
