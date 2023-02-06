package com.ssafy.cadang.service;

import com.ssafy.cadang.domain.Data;
import com.ssafy.cadang.domain.Drink;
import com.ssafy.cadang.domain.Franchise;
import com.ssafy.cadang.domain.OrderStatus;
import com.ssafy.cadang.domain.custom.Option;
import com.ssafy.cadang.dto.cafe.*;
import com.ssafy.cadang.dto.cafe.query.DrinkInterface;
import com.ssafy.cadang.dto.cafe.query.DrinkNumCheckDto;
import com.ssafy.cadang.dto.data.DayDataDto;
import com.ssafy.cadang.error.CustomException;
import com.ssafy.cadang.error.ExceptionEnum;
import com.ssafy.cadang.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CafeService {

    private final DrinkRepository drinkRepository;
    private final DataRepository dataRepository;
    private final FranchiseRepository franchiseRepository;
    private final OptionRepository optionRepository;

    public DrinksForCafeDto getDrinkByStoreName(Long userId, LocalDate date, String storeName) {

        DrinksForCafeDto drinksForCafeDto;

        Data data = dataRepository.findByUserAndDate(date, userId)
                .orElseThrow(() -> new CustomException(ExceptionEnum.DATA_NOT_FOUND));

        DayDataDto dayDataDto = new DayDataDto(data);

        long caffeRest = (long)data.getCaffeGoal() - data.getCaffeDaily();
        long sugarRest = (long)data.getSugarGoal() - data.getCaffeDaily();

        List<DrinkNumCheckDto> drinkNumCheckDtos
                = drinkRepository.findByUserIdAndStoreNameAndOrderStatus(userId, storeName, OrderStatus.CANCEL);

        Long franchiseId = drinkNumCheckDtos.get(0).getFranchiseId();
        Long storeId = drinkNumCheckDtos.get(0).getStoreId();

        List<DrinkInterface> findDrinks = drinkRepository.getDrinksByStoreName(storeName);

        List<DrinkResponseDto> drinkResponseDtos = findDrinks.stream()
                            .map(o -> new DrinkResponseDto(o))
                            .collect(Collectors.toList());

        for(DrinkNumCheckDto drinkNumCheckDto: drinkNumCheckDtos) {
            for(DrinkResponseDto drinkResponseDto: drinkResponseDtos) {
                if(drinkNumCheckDto.getDrinkName().equals(drinkResponseDto.getDrinkName())) {
                    drinkResponseDto.setCnt(drinkNumCheckDto.getCnt());
                }
            }
        }

        // for문 돌리면서 마실 수 있는 것 없는 것 필터링해서 리스트 2개 만들기

        List<DrinkResponseDto> drinkableDrinks = new ArrayList<>();
        List<DrinkResponseDto> nonDrinkableDrinks = new ArrayList<>();

        for(DrinkResponseDto drinkResponseDto: drinkResponseDtos ){
            if(drinkResponseDto.getCaffeine() <= caffeRest && drinkResponseDto.getSugar() <= sugarRest){
                drinkableDrinks.add(drinkResponseDto);
            }else{
                nonDrinkableDrinks.add(drinkResponseDto);
            }
        }


        drinksForCafeDto = new DrinksForCafeDto(drinkableDrinks, nonDrinkableDrinks,
                                                dayDataDto, franchiseId, storeId, storeName);

        return drinksForCafeDto;
    }

    public DrinkDetailDto getDrinkInfoByCafeIdAndDrinkName(Long franchiseId, String drinkName, String storeName) {

        List<Drink> findDrinks = drinkRepository.getDrinkByFranchiseIdAndDrinkName(franchiseId, drinkName);
        List<DrinkResponseDto> drinkResponseDtos = findDrinks.stream()
                .map((o) -> new DrinkResponseDto(o)).collect(Collectors.toList());

        return new DrinkDetailDto(storeName, drinkResponseDtos);
    }

    public List<OptionDto> findOptionsByFranchiseId(Long franchiseId){

        List<Option> findOptions = optionRepository.FindOptionsByFranchiseId(franchiseId);

        List<OptionDto> optionDtos = findOptions.stream()
                .map((o) -> new OptionDto(o))
                .collect(Collectors.toList());

        return optionDtos;
    }

    public List<DrinkResponseDto> findRecommendDrinksByStoreName(DrinkRequestDto drinkRequestDto){

        List<String> storeNameList = drinkRequestDto.getStoreNames();
        List<Franchise> findAllFranchises = franchiseRepository.findAllByFranchiseNameAsc();
        List<Long> franchiseIds = new ArrayList<>();

        // Franchise명이 있는지 비교해서 있는 것만 franchiseId를 List에 넣기
        for(String storeName: storeNameList) {
            String franchiseName = storeName.split(" ")[0]; // franchise명 + 지점명에서 앞에만 자름
            for(Franchise franchise: findAllFranchises){
                if(franchise.getFranchiseName().equals(franchiseName)){
                    franchiseIds.add(franchise.getId());
                    break;
                }
            }
        }

        LocalDate date = drinkRequestDto.getDate();
        Long userId = drinkRequestDto.getUserId();

        Data data = dataRepository.findByUserAndDate(date, userId)
                .orElseThrow(() -> new CustomException(ExceptionEnum.DATA_NOT_FOUND));

        long caffeRest = (long)data.getCaffeGoal() - data.getCaffeDaily();
        long sugarRest = (long)data.getSugarGoal() - data.getCaffeDaily();

        List<DrinkInterface> drinkInterfaces = drinkRepository.getRecommendDrinksByRestVolumeAndFranchiseIds(caffeRest, sugarRest, franchiseIds);

        System.out.println(drinkInterfaces.get(0).getDrinkName());

        List<DrinkResponseDto> drinkResponseDtos = drinkInterfaces.stream()
                        .map((o) -> new DrinkResponseDto(o))
                        .collect(Collectors.toList());


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
