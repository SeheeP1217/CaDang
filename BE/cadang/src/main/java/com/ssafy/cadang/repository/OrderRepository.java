package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.Order;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {


//    @EntityGraph(attributePaths = {"drink"})  --> 아래의 패치조인과 join fetch o.drink d를 빼고 이걸 넣어줘도 됨
    @Query("select o from Order o join fetch o.drink d where o.user.id=:userId")
    List<Order> findAllByUserid(@Param("userId") Long userId);   //고객 주문 내역 조회

    @Query("select o from Order o join fetch o.drink d where o.store.id=:storeId")
    List<Order> findAllByStoreid(@Param("storeId") Long storeId);   //가게 주문 내역 조회


}