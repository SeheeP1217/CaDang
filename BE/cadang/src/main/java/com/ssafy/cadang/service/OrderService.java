package com.ssafy.cadang.service;

import com.ssafy.cadang.dto.OrderDto;
import com.ssafy.cadang.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    //git
    public Long saveOrder(OrderDto orderDto) {

        //연관관계 있는 필드는 find 후 할당해서 save해야 한다..

        //Dto to Entity 빠르게 하는 방법 없누

        return null;
    }

}
