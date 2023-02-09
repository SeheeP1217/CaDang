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

}
