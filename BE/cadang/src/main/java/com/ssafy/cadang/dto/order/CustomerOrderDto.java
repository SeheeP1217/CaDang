package com.ssafy.cadang.dto.order;

import com.ssafy.cadang.domain.Order;
import com.ssafy.cadang.domain.OrderStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;



@Getter @Setter
public class CustomerOrderDto {

    private String drinkName;
    private int drinkPrice;
    private LocalDateTime regDate;
    private OrderStatus orderStatus;
    private String storeName;

    public CustomerOrderDto(Order o){

        drinkName = o.getDrink().getDrinkName();
        drinkPrice = o.getPrice();
        regDate = o.getRegDate();
        orderStatus = o.getOrderStatus();
        storeName = o.getStoreName();

    }
}
