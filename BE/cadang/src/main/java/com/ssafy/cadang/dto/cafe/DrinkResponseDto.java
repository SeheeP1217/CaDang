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
    String size;
    Integer vol;
    String img;
    Integer caffeine;
    Integer sugar;
    Integer cal;
    Integer price;
    Integer shot;
    Boolean whip;

    Long franchiseId;
    String storeName;

    long cnt;

    public DrinkResponseDto(Drink drink){

        drinkId = drink.getId();
        franchiseId = drink.getFranchise().getId();
        drinkName = drink.getDrinkName();
        size = drink.getSize();
        vol = drink.getVol();
        img = drink.getImage();
        caffeine = drink.getCaffeine();
        sugar = drink.getSugar();
        cal = drink.getCal();
        price = drink.getPrice();
        shot = drink.getShot();
        whip = drink.getWhip();
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

    public DrinkResponseDto(String drinkName, Integer caffeine, Integer sugar, Integer cal, Integer price, String image) {

        this.drinkName = drinkName;
        this.caffeine = caffeine;
        this.sugar = sugar;
        this.cal = cal;
        this.price = price;
        this.img = image;

    }
}
