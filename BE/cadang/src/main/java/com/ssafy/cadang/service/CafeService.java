package com.ssafy.cadang.service;

import com.ssafy.cadang.dto.cafe.DrinkResponseDto;
import com.ssafy.cadang.repository.DrinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CafeService {

    private final DrinkRepository drinkRepository;

    public List<DrinkResponseDto> getDrinkByCafeIdAndDrinkName(Long cafeId, String drinkName) {

        return null;
    }

}
