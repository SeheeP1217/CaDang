package com.ssafy.cadang.service;

import com.ssafy.cadang.domain.Drink;
import com.ssafy.cadang.domain.Order;
import com.ssafy.cadang.domain.Store;
import com.ssafy.cadang.domain.User;
import com.ssafy.cadang.dto.order.CustomerOrderDto;
import com.ssafy.cadang.dto.order.OrderDto;
import com.ssafy.cadang.repository.DrinkRepository;
import com.ssafy.cadang.repository.OrderRepository;
import com.ssafy.cadang.repository.StoreRepository;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        Order order = new Order();

        /**
         *  예외처리 사용자 정의로 만들어야 할까요?
         *  Dto to Entity 빠르게 하는 방법 없나요?
         */
        User user = userRepository.findById(orderDto.getUserId())
                .orElseThrow(() -> new NoSuchElementException());
        order.setUser(user);

        Drink drink = drinkRepository.findById(orderDto.getDrinkId())
                .orElseThrow(() -> new NoSuchElementException());
        order.setDrink(drink);

        Store store = storeRepository.findById(orderDto.getStoreId())
                .orElseThrow(() -> new NoSuchElementException());
        order.setStore(store);

        order.setCaffeine(orderDto.getCaffeine());
        order.setSugar(orderDto.getSugar());
        order.setCal(orderDto.getCal());
        order.setPrice(orderDto.getPrice());

        order.setShot(orderDto.getShot());
        order.setWhip(orderDto.getWhip());
        order.setSugarContent(orderDto.getSugarContent());

        order.setSyrup(orderDto.getSyrup());
        order.setVanilla(orderDto.getVanilla());
        order.setHazelnut(orderDto.getHazelnut());
        order.setCaramel(orderDto.getHazelnut());
        order.setCaramel(orderDto.getCaramel());
        order.setPhoto(orderDto.getPhoto());
        order.setStoreName(orderDto.getStoreName());
        order.setOrderStatus(orderDto.getOrderStatus());
        order.setRegDate(LocalDateTime.now());

//        order.builder()

        Long orderId = orderRepository.save(order).getId();

        return orderId;
    }

    public List<CustomerOrderDto> getCustomerOrderById(Long userId) {

        List<Order> orders = orderRepository.findAllByUserid(userId);
        List<CustomerOrderDto> result = orders.stream()
                .map(o -> new CustomerOrderDto(o))
                .collect(Collectors.toList());
        return result;
    }

}
