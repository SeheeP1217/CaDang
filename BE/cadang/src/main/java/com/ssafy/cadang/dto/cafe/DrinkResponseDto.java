package com.ssafy.cadang.dto.cafe;

import com.ssafy.cadang.domain.Drink;
import com.ssafy.cadang.dto.cafe.query.DrinkInterface;
import com.ssafy.cadang.dto.data.DayDataDto;
import lombok.Data;

import java.util.List;

@Data
public class DrinkResponseDto {

    Long drinkId;
    String drinkName;
    String img;
    Integer caffeine;
    Integer sugar;
    Integer cal;
    Integer price;

    Long franchiseId;
    String storeName;

    long cnt;

    public DrinkResponseDto(Drink drink){

        drinkId = drink.getId();
        franchiseId = drink.getFranchise().getId();
        drinkName = drink.getDrinkName();
        img = drink.getImage();
        caffeine = drink.getCaffeine();
        sugar = drink.getSugar();
        cal = drink.getCal();
        price = drink.getPrice();

    }

    public DrinkResponseDto(DrinkInterface drinkInterface){

        drinkId = drinkInterface.getId();
        drinkName = drinkInterface.getDrinkName();
        img = drinkInterface.getImage();
        caffeine = drinkInterface.getCaffeine();
        sugar = drinkInterface.getSugar();
        cal = drinkInterface.getCal();
        price = drinkInterface.getPrice();
        storeName = drinkInterface.getStoreName();
        franchiseId = drinkInterface.getFranchiseId();

    }
}
