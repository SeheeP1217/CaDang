package com.ssafy.cadang.controller;

import com.ssafy.cadang.dto.cafe.*;
import com.ssafy.cadang.service.CafeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@Tag(name = "카페", description = "카페 관련 api 입니다.")
@RestController
@RequestMapping("/cafe")
@RequiredArgsConstructor
public class CafeController {

    private final CafeService cafeService;


    @GetMapping("/drinklist")
    @Operation(summary = "카페 별 음료목록 조회", description = "유저의 목표량/섭취량 및 선택한 카페의 음료 목록을 반환합니다.")
    public ResponseEntity<DrinksForCafeDto> getDrinkByStoreName(Long userId, @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date, String storeName){

        DrinksForCafeDto drinksForCafeDto = cafeService.getDrinkByStoreName(userId, date, storeName);

        return new ResponseEntity<DrinksForCafeDto>(drinksForCafeDto, HttpStatus.ACCEPTED);
    }

    @GetMapping("/drink")
    @Operation(summary = "음료 정보 조회", description = "조회 대상 음료의 사이즈별 정보를 사이즈 순서로 오름차순으로 반환합니다.")
    public ResponseEntity<DrinkDetailDto> getDrinkInfo(Long franchiseId, String drinkName, String storeName) {

        DrinkDetailDto drinkDetailDto = cafeService.getDrinkInfoByCafeIdAndDrinkName(franchiseId, drinkName, storeName);

        return new ResponseEntity<DrinkDetailDto>(drinkDetailDto, HttpStatus.ACCEPTED);
    }

    @GetMapping("/option/{franchiseId}")
    @Operation(summary = "옵션 정보 조회", description = "프렌차이즈별 각 옵션의 정보를 조회합니다.")
    public ResponseEntity<List<OptionDto>> getOptionInfoByFranchiseId(@PathVariable Long franchiseId){

        List<OptionDto> optionDtos = cafeService.findOptionsByFranchiseId(franchiseId);

        return new ResponseEntity<List<OptionDto>>(optionDtos, HttpStatus.ACCEPTED);
    }

    @PostMapping("/recommend")
    @Operation(summary = "추천 음료 조회", description = "위치 기반으로 받은 카페 정보를 토대로 음료 정보를 조회합니다.")
    public ResponseEntity<List<DrinkResponseDto>> getRecommendDrinkList(@RequestBody DrinkRequestDto drinkRequestDto) {

        List<DrinkResponseDto> drinkResponseDtos = cafeService.findRecommendDrinksByStoreName(drinkRequestDto);

        for (DrinkResponseDto drinkResponseDto: drinkResponseDtos){
            System.out.println(drinkResponseDto.toString());
        }

        return new ResponseEntity<List<DrinkResponseDto>>(drinkResponseDtos,HttpStatus.ACCEPTED) ;
    }

    @GetMapping
    @Operation(summary = "프랜차이즈 목록 조회", description = "DB에 등록되어 있는 프랜차이즈 목록을 조회합니다.")
    public ResponseEntity<List<FranchiseDto>> getFranchiseList() {

        List<FranchiseDto> franchiseDtos = cafeService.findAllFranchises();

        return new ResponseEntity<List<FranchiseDto>>(franchiseDtos, HttpStatus.ACCEPTED);
    }






}
