package com.ssafy.cadang.service;

import com.ssafy.cadang.domain.*;
import com.ssafy.cadang.dto.order.CustomerOrderDto;
import com.ssafy.cadang.dto.order.OrderDto;
import com.ssafy.cadang.dto.order.StoreOrderDto;
import com.ssafy.cadang.repository.DrinkRepository;
import com.ssafy.cadang.repository.OrderRepository;
import com.ssafy.cadang.repository.StoreRepository;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Arrays;
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

    private static OrderStatus[] orderStatusList = {OrderStatus.RECORD, OrderStatus.PICKUP, OrderStatus.CANCEL};

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
         *  nullable 한 칼럼 중 값이 들어온다는 보장이 없는 것들 null일 때 처리 해야합니다.
         *
         *  nullable: hazelnut, vanilla, caramel, syrup, shot, whip
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

        List<CustomerOrderDto> customerOrderDtoList = orders.stream()
                .map(o -> new CustomerOrderDto(o))
                .collect(Collectors.toList());

        return customerOrderDtoList;
    }

    public List<StoreOrderDto> getStoreOrderById(Long storeId) {

        List<Order> orders = orderRepository.findAllByStoreid(storeId);

        List<StoreOrderDto> storeOrderDtoList = orders.stream()
                .map(o -> new StoreOrderDto(o))
                .collect(Collectors.toList());

        return storeOrderDtoList;
    }

    public List<StoreOrderDto> getStoreNewOrderById(Long storeId) {

        List<Order> orders = orderRepository.findAllByStoreidAndOrderStatus(storeId, OrderStatus.REQUEST);

        List<StoreOrderDto> storeNewOrderDtoList = orders.stream()
                .map(o -> new StoreOrderDto(o))
                .collect(Collectors.toList());

        return storeNewOrderDtoList;
    }

    public List<CustomerOrderDto> getCustomerNowOrderById(Long userId) {

        List<Order> orders = orderRepository.findAllByUserIdAndOrderStatus(userId, Arrays.asList(orderStatusList));

        List<CustomerOrderDto> customerNowOrderDtoList = orders.stream()
                .map(o -> new CustomerOrderDto(o))
                .collect(Collectors.toList());

        return customerNowOrderDtoList;
    }

    public Long updateOrderByOrderIdAndOrderStatus(OrderDto orderDto) {

        Order findOrder = orderRepository.findById(orderDto.getOrderId())
                .orElseThrow( () -> new NoSuchElementException("유효하지 않은 주문입니다"));

        findOrder.setOrderStatus(orderDto.getOrderStatus());


        return findOrder.getId();
    }







}
