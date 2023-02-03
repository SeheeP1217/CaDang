package com.ssafy.cadang.controller;

import com.ssafy.cadang.dto.cafe.DrinkDto;
import com.ssafy.cadang.dto.cafe.DrinkResponseDto;
import com.ssafy.cadang.dto.cafe.FranchiseDto;
import com.ssafy.cadang.service.CafeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "카페", description = "카페 관련 api 입니다.")
@RestController
@RequestMapping("/cafe")
@RequiredArgsConstructor
public class CafeController {

    private final CafeService cafeService;


    @GetMapping("/drinklist")
    @Operation(summary = "카페 별 음료목록 조회", description = "유저의 목표량/섭취량 및 선택한 카페의 음료 목록을 반환합니다.")
    public ResponseEntity<List<DrinkResponseDto>> getDrinkByStoreName(@RequestBody DrinkDto drinkDto){



        return null;
    }

    @GetMapping("/drink")
    @Operation(summary = "음료 정보 조회", description = "조회 대상 음료의 사이즈별 정보를 사이즈 순서로 오름차순으로 반환합니다.")
    public ResponseEntity<List<DrinkResponseDto>> getDrinkInfo(Long franchiseId, String drinkName, String storeName) {

        List<DrinkResponseDto> drinkResponseDtos = cafeService.getDrinkInfoByCafeIdAndDrinkName(franchiseId, drinkName, storeName);

        return new ResponseEntity<List<DrinkResponseDto>>(drinkResponseDtos, HttpStatus.ACCEPTED);
    }


    @GetMapping
    @Operation(summary = "프랜차이즈 목록 조회", description = "DB에 등록되어 있는 프랜차이즈 목록을 조회합니다.")
    public ResponseEntity<List<FranchiseDto>> getFranchiseList() {

        List<FranchiseDto> franchiseDtos = cafeService.findAllFranchises();

        return new ResponseEntity<List<FranchiseDto>>(franchiseDtos, HttpStatus.ACCEPTED);
    }



}
