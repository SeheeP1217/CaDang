package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.Order;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {


//    @EntityGraph(attributePaths = {"drink"})
    @Query("select o from Order o join fetch o.drink d where o.user.id=:userId")
    List<Order> findAllByUserid(@Param("userId") Long userId);   //고객 주문 내역 조회

}