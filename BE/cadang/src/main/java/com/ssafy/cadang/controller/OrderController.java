package com.ssafy.cadang.controller;


import com.ssafy.cadang.dto.OrderDto;
import com.ssafy.cadang.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "주문", description = "주문 관련 api 입니다.")
@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping    
    @Operation(summary = "주문 등록", description = "신규 주문을 등록합니다.")
    public ResponseEntity<String> saveOrder(@RequestBody OrderDto orderDto){


        Long orderId = orderService.saveOrder(orderDto);
        // OrderDto to Entity  -> how?(builder? modelmapper?)  where?(Service or Controller)
        // Save Entity -> use built-in method of JpaRepository
        // return OrderId or ErrorMessage?
        // git
        return new ResponseEntity<String>("SUCCESS", HttpStatus.ACCEPTED);
    }
}