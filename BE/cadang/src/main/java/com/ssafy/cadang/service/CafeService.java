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

        DrinksForCafeDto drinksForCafeDto;    // 카페 별 음료 목록 담을 객체

        Data data = dataRepository.findByUserAndDate(date, userId)     // 목표량 충족 리스트 만들기 위해 오늘 data 받아옴
                .orElseThrow(() -> new CustomException(ExceptionEnum.DATA_NOT_FOUND));

        DayDataDto dayDataDto = new DayDataDto(data);

        long caffeRest = (long)data.getCaffeGoal() - data.getCaffeDaily();    // 카페인 잔여량 계산
        long sugarRest = (long)data.getSugarGoal() - data.getCaffeDaily();    // 당 잔여량 계산

        List<DrinkNumCheckDto> drinkNumCheckDtos    // 유저가 주문해서 마신 음료의 마신 회수 & 리턴을 위해 프랜차이즈 id까지 함꼐 조회해서 담는 객체
                = drinkRepository.findByUserIdAndStoreNameAndOrderStatus(userId, storeName, OrderStatus.CANCEL);

        // 프론트에서 다음 로직을 위해 사용할 데이터(가게id, 프랜차이즈id) 초기화
        Long franchiseId = drinkNumCheckDtos.get(0).getFranchiseId(); 
        Long storeId = drinkNumCheckDtos.get(0).getStoreId();

        List<DrinkInterface> findDrinks = drinkRepository.getDrinksByStoreName(storeName);   // 음료 이름으로 통일해서 제일 작은 사이즈 정보만 가져옴

        List<DrinkResponseDto> drinkResponseDtos = findDrinks.stream()
                            .map(o -> new DrinkResponseDto(o))
                            .collect(Collectors.toList());

        // 마신 기록이 있는 음료들과 이름으로 비교하여 마신 횟수 초기화
        for(DrinkNumCheckDto drinkNumCheckDto: drinkNumCheckDtos) {
            for(DrinkResponseDto drinkResponseDto: drinkResponseDtos) {
                if(drinkNumCheckDto.getDrinkName().equals(drinkResponseDto.getDrinkName())) {
                    drinkResponseDto.setCnt(drinkNumCheckDto.getCnt());
                }
            }
        }
        
        List<DrinkResponseDto> drinkableDrinks = new ArrayList<>();       // 목표량 초과하지 않는 음료 리스트 담을 객체
        List<DrinkResponseDto> nonDrinkableDrinks = new ArrayList<>();    // 목표량 초과하는 음료 리스트 담을 객체

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

        List<DrinkResponseDto> drinkResponseDtos = new ArrayList<>(); // 최종 결과를 반환할 객체

        List<String> storeNameList = drinkRequestDto.getStoreNames(); // 프랜차이즈명 + 지점명 리스트 받음 

        if(storeNameList.size() == 0) return drinkResponseDtos; // 들어온 값이 없으면 size 0인 리스트 리턴

        List<Franchise> findAllFranchises = franchiseRepository.findAllByFranchiseNameAsc(); // DB의 프랜차이즈 목록 받아옴
        List<Long> franchiseIds = new ArrayList<>();  // 받아온 리스트 중 DB에 있는 것들만 franchiseId를 넣을 리스트 선언

        // Franchise명이 있는지 비교해서 있는 것만 franchiseId를 List에 넣기
        for(String storeName: storeNameList) {
            String receivedFranchiseName = storeName.split(" ")[0]; // franchise명 + 지점명에서 앞에만 자름
            for(Franchise franchise: findAllFranchises){
                if(franchise.getFranchiseName().equals(receivedFranchiseName)){
                    franchiseIds.add(franchise.getId());
                    break;
                }
            }
        }
        
        if(franchiseIds.size() == 0) return drinkResponseDtos; // DB에 있는 프랜차이즈가 받아온 리스트에 없으면 size가 0인 리스트 리턴

        LocalDate date = drinkRequestDto.getDate();
        Long userId = drinkRequestDto.getUserId();

        Data data = dataRepository.findByUserAndDate(date, userId)
                .orElseThrow(() -> new CustomException(ExceptionEnum.DATA_NOT_FOUND));

        long caffeRest = (long)data.getCaffeGoal() - data.getCaffeDaily();
        long sugarRest = (long)data.getSugarGoal() - data.getCaffeDaily();

        List<DrinkInterface> drinkInterfaces = drinkRepository.getRecommendDrinksByRestVolumeAndFranchiseIds(caffeRest, sugarRest, franchiseIds);

        drinkResponseDtos = drinkInterfaces.stream()
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
