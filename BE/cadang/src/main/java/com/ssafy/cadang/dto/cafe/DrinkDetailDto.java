package com.ssafy.cadang.dto.cafe;

import lombok.Getter;

import java.util.List;

@Getter
public class DrinkDetailDto {

    String storeName;
    List<DrinkResponseDto> drinkResponseDtos;

    public DrinkDetailDto(String storeName, List<DrinkResponseDto> drinkResponseDtos){
        this.storeName = storeName;
        this.drinkResponseDtos = drinkResponseDtos;
    }
 }
