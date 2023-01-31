package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.Order;
import com.ssafy.cadang.domain.OrderStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RecordReposiotry extends JpaRepository<Order, Long> {

    @EntityGraph(attributePaths = "drink")
    @Query("select o from Order o where o.id < :id and o.user.id=:userId and o.orderStatus in :orderStatuses order by o.regDate desc")
    Slice<Order> findByIdLessThanAndUserIdAndOrderStatusIn(@Param("id") Long id, @Param(("userId")) Long userId, @Param("orderStatuses") List<OrderStatus> orderStatuses, Pageable pageable);

    @EntityGraph(attributePaths = "drink")
    Optional<Order> findById(Long id);


    @Query("select o from Order o join fetch o.drink d where o.id < :id and o.user.id=:userId and (o.storeName LIKE :keyword or d.drinkName LIKE :keyword)  order by o.regDate desc")
    Slice<Order> findBySearchKeyword(@Param("id") Long id, @Param(("userId")) Long userId, @Param(("keyword")) String keyword, Pageable pageable);

}
