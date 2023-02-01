package com.ssafy.cadang.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    private final Logger logger = LoggerFactory.getLogger(OrderController.class);

    //고객이 가게에게 신규 주문 요청을 위해 보내는 메시지
    @MessageMapping("/order-request/{storeId}")
    @SendTo("/topic/request-complete/{storeId}")
    public String customerRequestMessage(@DestinationVariable long storeId, String message){

        logger.info("가게번호 도착, {} ", storeId);
        logger.info("메시지 도착, {} ", message);

        return message;
    }

    //가게가 고객에게 주문 수락 여부 알리기 위해 보내는 메시지
    @MessageMapping("/order-response/{customerId}")
    @SendTo("/topic/request-complete/{customerId}")
    public String storeResponseMessage(@DestinationVariable long customerId, String message){

        logger.info("고객 ID 도착, {} ", customerId);
        logger.info("메시지 도착, {} ", message);

        return message;
    }
}
