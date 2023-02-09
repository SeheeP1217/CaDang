package com.ssafy.cadang.dto.cafe;

import lombok.Getter;

import java.util.List;

@Getter
public class DrinkDetailDto {

    Long storeId;
    String storeName;
    List<DrinkResponseDto> drinkResponseDtos;

    public DrinkDetailDto(Long storeId, String storeName, List<DrinkResponseDto> drinkResponseDtos){
        this.storeId = storeId;
        this.storeName = storeName;
        this.drinkResponseDtos = drinkResponseDtos;
    }
 }
