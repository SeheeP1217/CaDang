package com.ssafy.cadang.dto.cafe.query;

public interface DrinkInterface {

    Long getId();
    Long getFranchiseId();
    String getDrinkName();
    String getImage();
    Integer getCaffeine();
    Integer getSugar();
    Integer getCal();
    Integer getPrice();
    String getStoreName();

}
