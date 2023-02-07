package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.Order;
import com.ssafy.cadang.domain.OrderStatus;
import com.ssafy.cadang.dto.cafe.query.DrinkNumCheckDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {


//    @EntityGraph(attributePaths = {"drink"})  --> 아래의 패치조인과 join fetch o.drink d를 빼고 이걸 넣어줘도 됨
    @Query(" select o from Order o join fetch o.drink d where o.user.id=:userId order by o.regDate DESC")
    List<Order> findAllByUserid(@Param("userId") Long userId);   //고객 주문 내역 조회

    @Query(" select o from Order o join fetch o.drink d " +
            "where o.store.id=:storeId and o.orderStatus " +
            "not in :orderStatusList order by o.regDate DESC")
    List<Order> findAllByStoreid(@Param("storeId") Long storeId, @Param("orderStatusList") List<OrderStatus> orderStatusList);   //가게 주문 내역 조회

    @Query(" select o from Order o join fetch o.drink d where o.store.id=:storeId " +
            "and o.orderStatus =:orderStatus order by o.regDate DESC")
    List<Order> findAllByStoreidAndOrderStatus(@Param("storeId") Long storeId, @Param("orderStatus") OrderStatus orderStatus);

    @Query(" select o from Order o join fetch o.drink d where o.user.id=:userId " +
            "and o.orderStatus not in :orderStatusList order by o.regDate DESC")
    List<Order> findAllByUserIdAndOrderStatus(@Param("userId") Long userId,
                                              @Param("orderStatusList") List<OrderStatus> orderStatusList);

}