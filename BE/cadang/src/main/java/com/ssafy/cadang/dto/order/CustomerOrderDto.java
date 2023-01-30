package com.ssafy.cadang.dto.order;

import com.ssafy.cadang.domain.OrderStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Builder
@Getter @Setter
public class CustomerOrderDto {

    private String drinkName;
    private String drinkPrice;
    private LocalDateTime regDate;
    private OrderStatus orderStatus;
    private String storeName;
}
