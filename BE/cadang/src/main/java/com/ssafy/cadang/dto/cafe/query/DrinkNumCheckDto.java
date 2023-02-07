package com.ssafy.cadang.dto.cafe.query;

import lombok.Data;

@Data
public class DrinkNumCheckDto {

    private long cnt;
    private String drinkName;
    private Long franchiseId;
    private String storeName;
    private Long storeId;

    public DrinkNumCheckDto(String drinkName, long cnt){

        this.drinkName = drinkName;
        this.cnt = cnt;

    }
    public DrinkNumCheckDto(String drinkName, Long franchiseId, long cnt, Long storeId){

        this.drinkName = drinkName;
        this.franchiseId = franchiseId;
        this.cnt = cnt;
        this.storeId = storeId;

    }
}
