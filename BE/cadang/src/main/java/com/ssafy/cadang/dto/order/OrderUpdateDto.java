package com.ssafy.cadang.dto.order;

import com.ssafy.cadang.domain.OrderStatus;
import lombok.Getter;

@Getter
public class OrderUpdateDto {

    Long orderId;
    Long customerId;
    OrderStatus orderStatus;

}
