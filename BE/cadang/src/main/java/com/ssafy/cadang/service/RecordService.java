package com.ssafy.cadang.service;

import com.ssafy.cadang.domain.Drink;
import com.ssafy.cadang.domain.Order;
import com.ssafy.cadang.domain.OrderStatus;
import com.ssafy.cadang.domain.User;
import com.ssafy.cadang.dto.record.RecordSaveRequestDto;
import com.ssafy.cadang.repository.DrinkRepository;
import com.ssafy.cadang.repository.RecordReposiotry;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecordService {
    private final RecordReposiotry recordReposiotry;
    private final UserRepository userRepository;
    private final DrinkRepository drinkRepository;

    public Order getOrderByUserId(Long userId) {
        Optional<Order> byUserId = recordReposiotry.findByUserId(userId);
        if (byUserId.isEmpty())
            throw new IllegalStateException("사용자가 존재하지 않습니다.");
        return byUserId.get();
    }

    @Transactional
    public Long saveOrderDirectly(RecordSaveRequestDto recordDto) {
        User user = userRepository.findById(recordDto.getUserId())
                .orElseThrow(() -> new NoSuchElementException());
        Drink drink = drinkRepository.findById(recordDto.getDrinkId())
                .orElseThrow(() -> new NoSuchElementException());
        Order record = Order.builder()
                .user(user)
                .drink(drink)
                .regDate(LocalDateTime.now())
                .caffeine(recordDto.getCaffeine())
                .sugar(recordDto.getSugar())
                .cal(recordDto.getCal())
                .price(recordDto.getPrice())
                .shot(recordDto.getShot())
                .whip(recordDto.getWhip())
                .sugarContent(recordDto.getSugarContent())
                .syrup(recordDto.getSyrup())
                .vanilla(recordDto.getVanilla())
                .hazelnut(recordDto.getHazelnut())
                .caramel(recordDto.getCaramel())
                .photo(recordDto.getPhoto())
                .storeName(recordDto.getStoreName())
                .orderStatus(OrderStatus.RECORD)
                .build();
        Order saveRecord = recordReposiotry.save(record);
        return saveRecord.getId();


    }
}
