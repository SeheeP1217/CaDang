package com.ssafy.cadang.dto;


import com.ssafy.cadang.domain.*;
import com.ssafy.cadang.domain.custom.SugarContent;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter @Setter
public class OrderDto {

    //git
    private Long id;
    private Long userId;
    private Long drinkId;

    private LocalDateTime regDate;

    private int caffeine;
    private int sugar;
    private int cal;
    private int price;

    private Integer shot; // null 허용
    private Boolean whip; // null 허용
    @Enumerated(EnumType.STRING)
    private SugarContent sugarContent;

    private Integer syrup;
    private Integer vanilla;
    private Integer hazelnut;
    private Integer caramel;
    private boolean isPaid;

    // ---------- 기록 주문 공통

    private Long storeId;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    // ------- 주문

    public OrderDto(Order order){
        id = order.getId();
        userId = order.getUser().getId();
        drinkId = order.getDrink().getId();
        regDate = order.getRegDate();
        caffeine = order.getCaffeine();
        sugar = order.getSugar();
        cal = order.getCal();
        price = order.getPrice();

        if(order.getShot() != null){
            shot = order.getShot();
        }
        if(order.getWhip() != null){
            whip = order.getWhip();
        }
        sugarContent = order.getSugarContent();

        syrup = order.getSyrup();
        vanilla = order.getVanilla();
        hazelnut = order.getHazelnut();
        caramel = order.getCaramel();
        isPaid = order.isPaid();

        storeId = order.getStore().getId();
        orderStatus = order.getOrderStatus();


    }

}
