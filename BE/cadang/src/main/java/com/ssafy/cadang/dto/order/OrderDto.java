package com.ssafy.cadang.dto.order;


import com.ssafy.cadang.domain.*;
import com.ssafy.cadang.domain.custom.SugarContent;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter @Setter
@RequiredArgsConstructor
public class OrderDto {

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
    private String photo;
    private String storeName;

    // ---------- 기록 주문 공통

    private Long storeId;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    // ------- 주문


    @Override
    public String toString() {
        return "OrderDto{" +
                "userId=" + userId +
                ", drinkId=" + drinkId +
                ", regDate=" + regDate +
                ", caffeine=" + caffeine +
                ", sugar=" + sugar +
                ", cal=" + cal +
                ", price=" + price +
                ", shot=" + shot +
                ", whip=" + whip +
                ", sugarContent=" + sugarContent +
                ", syrup=" + syrup +
                ", vanilla=" + vanilla +
                ", hazelnut=" + hazelnut +
                ", caramel=" + caramel +
                ", isPaid=" + isPaid +
                ", photo='" + photo + '\'' +
                ", storeName='" + storeName + '\'' +
                ", storeId=" + storeId +
                ", orderStatus=" + orderStatus +
                '}';
    }
}
