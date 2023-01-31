package com.ssafy.cadang.service;

import com.ssafy.cadang.domain.Drink;
import com.ssafy.cadang.domain.Order;
import com.ssafy.cadang.domain.OrderStatus;
import com.ssafy.cadang.domain.User;
import com.ssafy.cadang.dto.record.*;
import com.ssafy.cadang.repository.DrinkRepository;
import com.ssafy.cadang.repository.RecordReposiotry;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDate;
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

    public MyPageRecordListDto getOrderBySlice(Long lastUpdateId, Long userId, int size) {
        PageRequest pageRequest = PageRequest.of(0, size);

        Slice<Order> orders = recordReposiotry.findByIdLessThanAndUserIdAndOrderStatusIn(lastUpdateId, userId, Arrays.asList(recordStatus), pageRequest);
        List<MyPageRecordDto> recordDtos = toMyPqgeRecordDtos(orders);
        return MyPageRecordListDto.builder()
                .recordList(recordDtos)
                .hasNext(orders.hasNext())
                .build();
    }

    public RecordDetailDto getOrderByRecordId(Long recordId) {
        Optional<Order> order = recordReposiotry.findById(recordId);
        if (order.isEmpty())
            throw new IllegalStateException("기록이 존재하지 않습니다.");
        return toRecordDetailDto(order.get());

    }

    @Transactional
    public Long deleteOrderById(Long recordId) {
        Optional<Order> order = recordReposiotry.findById(recordId);
        if (order.isEmpty())
            throw new IllegalStateException("기록이 존재하지 않습니다.");
        recordReposiotry.delete(order.get());
        return recordId;
    }

    @Transactional
    public Long updateRecord(RecordUpdateDto updateDto) {
        Order findRecord = recordReposiotry.findById(updateDto.getId())
                .orElseThrow(() -> new NoSuchElementException());
        if (findRecord.getOrderStatus() == OrderStatus.PICKUP && updateDto.getRegDate() != null) {
            throw new IllegalStateException("주문 상품은 등록 날짜를 수정할 수 없습니다.");
        }
        if (updateDto.getRegDate() != null) {
            LocalDateTime localDateTime = LocalDate.parse(updateDto.getRegDate()).atStartOfDay();
            findRecord.setRegDate(localDateTime);
        }
        if (updateDto.getMemo() != null)
            findRecord.setMemo(updateDto.getMemo());
        if (updateDto.getIsPublic() != null)
            findRecord.setPublic(updateDto.getIsPublic());
        if (updateDto.getPhoto() != null)
            findRecord.setPhoto(updateDto.getPhoto());
        return findRecord.getId();

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

    private RecordDetailDto toRecordDetailDto(Order order) {
        return RecordDetailDto.builder()
                .id(order.getId())
                .photo(order.getPhoto())
                .drinkName(order.getDrink().getDrinkName())
                .isPublic(order.isPublic())
                .regDate(order.getRegDate())
                .memo(order.getMemo())
                .size(order.getDrink().getSize())
                .shot(order.getShot())
                .whip(order.getWhip())
                .sugarContent(order.getSugarContent())
                .syrup(order.getSyrup())
                .vanilla(order.getVanilla())
                .caramel(order.getCaramel())
                .hazelnut(order.getHazelnut())
                .orderStatus(order.getOrderStatus())
                .build();
    }


}
