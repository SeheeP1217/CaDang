package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {



    List<Order> findAllByUserIdAndOrderStatus(Long userId, String orderStatus);
}
