package com.ssafy.cadang.dto.cafe;

public class DrinkNumCheckDto {

    int count;
    String drinkName;
    long franchiseId;
    String storeName;

    public DrinkNumCheckDto(int count, String drinkName, long franchiseId, String storeName){

        this.count = count;
        this.drinkName = drinkName;
        this.franchiseId = franchiseId;
        this.storeName = storeName;

    }


}
