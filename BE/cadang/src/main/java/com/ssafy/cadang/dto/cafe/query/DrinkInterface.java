package com.ssafy.cadang.dto.cafe.query;

public interface DrinkInterface {

    Long getId();
    String getDrinkName();
    String getSize();
    Integer getVol();
    String getImage();
    Integer getCaffeine();
    Integer getSugar();
    Integer getCal();
    Integer getPrice();
    Integer getShot();
    Boolean getWhip();

}
