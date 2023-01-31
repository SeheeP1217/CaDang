package com.ssafy.cadang.service;

import com.ssafy.cadang.domain.*;
import com.ssafy.cadang.dto.order.CustomerOrderDto;
import com.ssafy.cadang.dto.order.OrderDto;
import com.ssafy.cadang.repository.DrinkRepository;
import com.ssafy.cadang.repository.OrderRepository;
import com.ssafy.cadang.repository.StoreRepository;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    private final DrinkRepository drinkRepository;
    public Long saveOrder(OrderDto orderDto) {

        /**
         *  예외처리 사용자 정의로 만들어야 할까요?
         *  Dto to Entity 빠르게 하는 방법 없나요?
         */
        User user = userRepository.findById(orderDto.getUserId())
                .orElseThrow(() -> new NoSuchElementException());

        Drink drink = drinkRepository.findById(orderDto.getDrinkId())
                .orElseThrow(() -> new NoSuchElementException());

        Store store = storeRepository.findById(orderDto.getStoreId())
                .orElseThrow(() -> new NoSuchElementException());

        /**
         *  카당칼가
         */
         Order order = Order.builder().user(user).
                          drink(drink).
                          store(store).
                          caffeine(orderDto.getCaffeine()).
                          sugar(orderDto.getSugar()).
                          cal(orderDto.getCal()).
                          price(orderDto.getPrice()).
                          shot(orderDto.getShot()).
                          whip(orderDto.getWhip()).
                          sugarContent(orderDto.getSugarContent()).
                          syrup(orderDto.getSyrup()).
                          vanilla(orderDto.getVanilla()).
                          hazelnut(orderDto.getHazelnut()).
                          caramel(orderDto.getCaramel()).
                          photo(orderDto.getPhoto()).
                          storeName(orderDto.getStoreName()).
                          orderStatus(OrderStatus.REQUEST).
                          regDate(LocalDateTime.now()).build();

        Long orderId = orderRepository.save(order).getId();

        return orderId;
    }

    public List<CustomerOrderDto> getCustomerOrderById(Long userId) {

        List<Order> orders = orderRepository.findAllByUserid(userId);
        for(Order o: orders){
            System.out.println(o);
        }

        List<CustomerOrderDto> CustomerOrderDtoList = orders.stream()
                .map(o -> new CustomerOrderDto(o))
                .collect(Collectors.toList());
        return CustomerOrderDtoList;
    }

}
