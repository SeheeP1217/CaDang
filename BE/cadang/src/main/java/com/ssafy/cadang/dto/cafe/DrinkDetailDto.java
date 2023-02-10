package com.ssafy.cadang.dto.cafe;

import lombok.Getter;

import java.util.List;

@Getter
public class DrinkDetailDto {

    Long storeId;
    String storeName;
    List<DrinkResponseDto> drinkResponseDtos;
    List<OptionDto> optionDtos;

    public DrinkDetailDto(Long storeId, String storeName, List<DrinkResponseDto> drinkResponseDtos, List<OptionDto> optionDtos){
        this.storeId = storeId;
        this.storeName = storeName;
        this.drinkResponseDtos = drinkResponseDtos;
        this.optionDtos = optionDtos;
    }

    public DrinkDetailDto(List<DrinkResponseDto> drinkResponseDtos, List<OptionDto> optionDtos){
        this.drinkResponseDtos = drinkResponseDtos;
        this.optionDtos = optionDtos;
    }
 }
