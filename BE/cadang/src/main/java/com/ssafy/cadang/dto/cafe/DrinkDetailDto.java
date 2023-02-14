package com.ssafy.cadang.dto.cafe;

import com.ssafy.cadang.dto.data.DayDataDto;
import lombok.Getter;

import java.util.List;

@Getter
public class DrinkDetailDto {

    Long storeId;
    String storeName;
    List<DrinkResponseDto> drinkResponseDtos;
    List<OptionDto> optionDtos;
    DayDataDto dayDataDto;

    public DrinkDetailDto(Long storeId, String storeName, List<DrinkResponseDto> drinkResponseDtos, List<OptionDto> optionDtos, DayDataDto dayDataDto){
        this.storeId = storeId;
        this.storeName = storeName;
        this.drinkResponseDtos = drinkResponseDtos;
        this.optionDtos = optionDtos;
        this.dayDataDto = dayDataDto;
    }

    public DrinkDetailDto(List<DrinkResponseDto> drinkResponseDtos, List<OptionDto> optionDtos, DayDataDto dayDataDto){
        this.drinkResponseDtos = drinkResponseDtos;
        this.optionDtos = optionDtos;
        this.dayDataDto = dayDataDto;
    }
 }
