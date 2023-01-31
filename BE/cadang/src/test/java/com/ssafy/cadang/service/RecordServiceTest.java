package com.ssafy.cadang.service;

import com.ssafy.cadang.domain.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
//@Rollback(false)
class RecordServiceTest {

    @Autowired RecordService recordService;

    @Test
    public void getByUserId() {
        Order orderByUserId = recordService.getOrderByUserId(2L);
        System.out.println(orderByUserId.getUser().getUserName());
        System.out.println(orderByUserId.getSugarContent());
    }


}