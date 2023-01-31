package com.ssafy.cadang.dto.order;

import com.ssafy.cadang.domain.Order;
import com.ssafy.cadang.domain.OrderStatus;
import com.ssafy.cadang.domain.custom.SugarContent;
import lombok.*;

import java.time.LocalDateTime;

@Data
public class StoreOrderDto {

    private Long id;
    private LocalDateTime regDate;
    private OrderStatus orderStatus;

    private Integer shot;
    private Boolean whip;
    private Integer syrup;
    private Integer vanilla;
    private Integer hazelnut;
    private Integer caramel;

    private SugarContent sugarContent;

    private String drinkName;

    public StoreOrderDto(Order order){

        id = order.getId();
        regDate = order.getRegDate();
        orderStatus = order.getOrderStatus();
        shot = order.getShot();
        whip = order.getWhip();
        syrup = order.getSyrup();
        vanilla = order.getHazelnut();
        caramel = order.getCaramel();
        sugarContent = order.getSugarContent();
        drinkName = order.getDrink().getDrinkName();
    }

}
