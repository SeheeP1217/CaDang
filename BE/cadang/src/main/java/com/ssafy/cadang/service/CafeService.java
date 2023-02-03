package com.ssafy.cadang.service;

import com.ssafy.cadang.domain.Data;
import com.ssafy.cadang.domain.Drink;
import com.ssafy.cadang.domain.Franchise;
import com.ssafy.cadang.domain.OrderStatus;
import com.ssafy.cadang.dto.cafe.DrinkDto;
import com.ssafy.cadang.dto.cafe.DrinkResponseDto;
import com.ssafy.cadang.dto.cafe.FranchiseDto;
import com.ssafy.cadang.error.CustomException;
import com.ssafy.cadang.error.ExceptionEnum;
import com.ssafy.cadang.repository.DataRepository;
import com.ssafy.cadang.repository.DrinkRepository;
import com.ssafy.cadang.repository.FranchiseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CafeService {

    private final DrinkRepository drinkRepository;
    private final DataRepository dataRepository;
    private final FranchiseRepository franchiseRepository;


    public List<DrinkResponseDto> getDrinkByStoreName(DrinkDto drinkDto) {

        Long userId = drinkDto.getUserId();
        LocalDate date = drinkDto.getToday();
        String storeName = drinkDto.getStoreName();

        Data data = dataRepository.findByUserAndDate(date, userId)
                .orElseThrow(() -> new CustomException(ExceptionEnum.DATA_NOT_FOUND));

        long caffeRest = (long)data.getCaffeGoal() - data.getCaffeDaily();
        long sugarRest = (long)data.getSugarGoal() - data.getCaffeDaily();

//        DrinkRepository.getNumberOfDrink(userId, storeName, OrderStatus.CANCEL);



        return null;
    }

    public List<DrinkResponseDto> getDrinkInfoByCafeIdAndDrinkName(Long franchiseId, String drinkName, String storeName) {

        List<Drink> findDrinks = drinkRepository.getDrinkByFranchiseIdAndDrinkName(franchiseId, drinkName);
        List<DrinkResponseDto> drinkResponseDtos = findDrinks.stream()
                .map((o) -> new DrinkResponseDto(o, storeName)).collect(Collectors.toList());

        return drinkResponseDtos;
    }

    public List<FranchiseDto> findAllFranchises() {

        List<Franchise> findAllFranchises = franchiseRepository.findAllByFranchiseNameAsc();

        List<FranchiseDto> franchiseDtos = findAllFranchises.stream()
                .map((o) -> new FranchiseDto(o))
                .collect(Collectors.toList());

        return franchiseDtos;
    }

}
