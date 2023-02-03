package com.ssafy.cadang.dto.cafe;

import com.ssafy.cadang.domain.Drink;
import lombok.Data;

@Data
public class DrinkResponseDto {

    Long drinkId;
    Long franchiseId;
    String name;
    String size;
    int vol;
    String img;
    int caffeine;
    int sugar;
    int cal;
    int price;
    int shot;
    Boolean whip;
    String storeName;
    
    public DrinkResponseDto(Drink drink, String storeName){

        drinkId = drink.getId();
        franchiseId = drink.getFranchise().getId();
        name = drink.getDrinkName();
        size = drink.getSize();
        vol = drink.getVol();
        img = drink.getImage();
        caffeine = drink.getCaffeine();
        sugar = drink.getSugar();
        cal = drink.getCal();
        price = drink.getPrice();
        shot = drink.getShot();
        whip = drink.getWhip();
        this.storeName = storeName;

    }
}
