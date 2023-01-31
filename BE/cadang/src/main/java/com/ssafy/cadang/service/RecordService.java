package com.ssafy.cadang.service;

import com.ssafy.cadang.domain.Drink;
import com.ssafy.cadang.domain.Order;
import com.ssafy.cadang.domain.OrderStatus;
import com.ssafy.cadang.domain.User;
import com.ssafy.cadang.dto.record.MyPageRecordDto;
import com.ssafy.cadang.dto.record.MyPageRecordListDto;
import com.ssafy.cadang.dto.record.RecordSaveRequestDto;
import com.ssafy.cadang.repository.DrinkRepository;
import com.ssafy.cadang.repository.RecordReposiotry;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecordService {
    private final RecordReposiotry recordReposiotry;
    private final UserRepository userRepository;
    private final DrinkRepository drinkRepository;
    private static OrderStatus[] recordStatus = {OrderStatus.RECORD, OrderStatus.PICKUP};

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

    public MyPageRecordListDto getOrderBySlice(Long lastUpdateId, int size, Long userId) {
        PageRequest pageRequest = PageRequest.of(0, size);

        Slice<Order> orders = recordReposiotry.findByIdLessThanAndUserIdAndOrderStatusIn(lastUpdateId, userId, Arrays.asList(recordStatus), pageRequest);
        List<MyPageRecordDto> recordDtos = toMyPqgeRecordDtos(orders);
        return MyPageRecordListDto.builder()
                .recordList(recordDtos)
                .hasNext(orders.hasNext())
                .build();
    }

    public Order getOrderByRecordId(Long recordId) {
        Optional<Order> byUserId = recordReposiotry.findById(recordId);
        if (byUserId.isEmpty())
            throw new IllegalStateException("기록이 존재하지 않습니다.");
        return byUserId.get();
    }

    private List<MyPageRecordDto> toMyPqgeRecordDtos(Slice<Order> orders) {
        return orders.getContent()
                .stream()
                .map(o -> MyPageRecordDto.builder()
                        .id(o.getId())
                        .storeName(o.getStoreName())
                        .drinkName(o.getDrink().getDrinkName())
                        .regDate(o.getRegDate())
                        .caffeine(o.getCaffeine())
                        .sugar(o.getSugar())
                        .cal(o.getCal())
                        .price(o.getPrice())
                        .isPublic(o.isPublic())
                        .memo(o.getMemo())
                        .photo(o.getPhoto())
                        .build())
                .sorted(Comparator.comparing(MyPageRecordDto::getRegDate).reversed())
                .collect(Collectors.toList());
    }


}
