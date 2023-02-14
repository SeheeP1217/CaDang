package com.ssafy.cadang.service;

import com.ssafy.cadang.domain.*;
import com.ssafy.cadang.dto.order.CustomerOrderDto;
import com.ssafy.cadang.dto.order.OrderSaveDto;
import com.ssafy.cadang.dto.order.OrderUpdateDto;
import com.ssafy.cadang.dto.order.StoreOrderDto;
import com.ssafy.cadang.error.CustomException;
import com.ssafy.cadang.error.ExceptionEnum;
import com.ssafy.cadang.repository.DrinkRepository;
import com.ssafy.cadang.repository.OrderRepository;
import com.ssafy.cadang.repository.StoreRepository;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    private final DrinkRepository drinkRepository;
    private final DataService dataService;

    private static OrderStatus[] orderStatusList = {OrderStatus.REQUEST, OrderStatus.RECORD, OrderStatus.PICKUP, OrderStatus.CANCEL};

    public Long saveOrder(OrderSaveDto orderSaveDto, Long customerId) {

        User user = userRepository.findById(customerId)
                .orElseThrow(() -> new CustomException(ExceptionEnum.USER_NOT_FOUND));

        Drink drink = drinkRepository.findById(orderSaveDto.getDrinkId())
                .orElseThrow(() -> new CustomException(ExceptionEnum.DRINK_NOT_FOUND));

        Store store = storeRepository.findById(orderSaveDto.getStoreId())
                .orElseThrow(() -> new CustomException(ExceptionEnum.STORE_NOT_FOUND));

        Order order = Order.builder().user(user).
                drink(drink).
                store(store).
                caffeine(orderSaveDto.getCaffeine()).
                sugar(orderSaveDto.getSugar()).
                cal(orderSaveDto.getCal()).
                price(orderSaveDto.getPrice()).
                shot(orderSaveDto.getShot()).
                whip(orderSaveDto.getWhip()).
                sugarContent(orderSaveDto.getSugarContent()).
                syrup(orderSaveDto.getSyrup()).
                vanilla(orderSaveDto.getVanilla()).
                hazelnut(orderSaveDto.getHazelnut()).
                caramel(orderSaveDto.getCaramel()).
                photo(orderSaveDto.getPhoto()).
                storeName(orderSaveDto.getStoreName()).
                orderStatus(OrderStatus.REQUEST).
                regDate(LocalDateTime.now()).
                isPublic((true)).build();

        orderRepository.save(order);
        Long storeId = store.getId();
        return storeId;
    }


    public List<CustomerOrderDto> getCustomerOrderById(Long userId) {

        List<Order> orders = orderRepository.findAllByUserid(userId);

        List<CustomerOrderDto> customerOrderDtoList = orders.stream()
                .map(o -> new CustomerOrderDto(o))
                .collect(Collectors.toList());

        return customerOrderDtoList;
    }

    public List<StoreOrderDto> getStoreOrderById(Long storeId) {

        List<Order> orders = orderRepository.findAllByStoreid(storeId, Arrays.asList(orderStatusList));

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

    public Map<String, Long> updateOrderByOrderIdAndOrderStatus(OrderUpdateDto orderUpdateDto, Long storeId) {

        Order findOrder = orderRepository.findById(orderUpdateDto.getOrderId())
                .orElseThrow(() -> new CustomException(ExceptionEnum.ORDER_NOT_FOUND));

        if(findOrder.getStore().getId() != storeId) {
            throw new CustomException(ExceptionEnum.ORDER_NOT_SAME);
        }

        Long orderId = findOrder.getId();
        Long customerId = findOrder.getUser().getId();
        Map<String, Long> orderAndCustomerId = new HashMap<>();
        orderAndCustomerId.put("orderId", orderId);
        orderAndCustomerId.put("customerId", customerId);

        findOrder.setOrderStatus(orderUpdateDto.getOrderStatus());
        if (orderUpdateDto.getOrderStatus() == OrderStatus.PICKUP) {
            dataService.updateData(findOrder);
        }

        return orderAndCustomerId;
    }

}
