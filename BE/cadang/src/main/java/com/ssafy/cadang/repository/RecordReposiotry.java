package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.Order;
import com.ssafy.cadang.domain.OrderStatus;
import com.ssafy.cadang.dto.record.query.MostRankingDto;
import com.ssafy.cadang.dto.record.query.RecordRankingDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RecordReposiotry extends JpaRepository<Order, Long> {


    @Query("select o from Order o join o.drink d where o.user.id=:userId and o.orderStatus in :orderStatuses order by o.regDate desc")
    Page<Order> findAllByPage(@Param(("userId")) Long userId, @Param("orderStatuses") OrderStatus[] orderStatuses, Pageable pageable);

    @EntityGraph(attributePaths = "drink")
    Optional<Order> findById(Long id);

    @Query("select o from Order o join o.drink d where o.user.id=:userId and o.orderStatus in :orderStatuses and (o.storeName LIKE :keyword or d.drinkName LIKE :keyword)  order by o.regDate desc")
    Page<Order> findBySearchKeyword(@Param(("userId")) Long userId, @Param(("keyword")) String keyword, @Param("orderStatuses") OrderStatus[] orderStatuses, Pageable pageable);

    // ----- 랭킹 -------
    @Query("SELECT new com.ssafy.cadang.dto.record.query.RecordRankingDto(d.drinkName, MAX(f.franchiseName), MAX(o.caffeine) as caffeine) " +
            "FROM Order o " +
            "JOIN o.drink d " +
            "JOIN d.franchise f " +
            "WHERE o.user.id = :userId " +
            "and o.orderStatus in :orderStatuses " +
            "AND year(o.regDate) = :year " +
            "AND month(o.regDate) = :month " +
            "GROUP BY d.franchise.id, d.drinkName " +
            "ORDER BY caffeine DESC")
    List<RecordRankingDto> findTop3ByCaffeine(@Param("userId") Long userId, @Param("month") int month, @Param("year") int year, @Param("orderStatuses") OrderStatus[] orderStatuses, Pageable pageable);

    @Query("SELECT new com.ssafy.cadang.dto.record.query.RecordRankingDto(d.drinkName, MAX(f.franchiseName), MAX(o.sugar) as sugar) " +
            "FROM Order o " +
            "JOIN o.drink d " +
            "JOIN d.franchise f " +
            "WHERE o.user.id = :userId " +
            "and o.orderStatus in :orderStatuses " +
            "AND year(o.regDate) = :year " +
            "AND month(o.regDate) = :month " +
            "GROUP BY d.franchise.id, d.drinkName " +
            "ORDER BY sugar DESC")
    List<RecordRankingDto> findTop3BySugar(@Param("userId") Long userId, @Param("month") int month, @Param("year") int year, @Param("orderStatuses") OrderStatus[] orderStatuses, Pageable pageable);

    @Query("SELECT new com.ssafy.cadang.dto.record.query.MostRankingDto(d.drinkName, MAX(f.franchiseName), count(d.drinkName) as cnt) " +
            "FROM Order o " +
            "JOIN o.drink d " +
            "JOIN d.franchise f " +
            "WHERE o.user.id = :userId " +
            "and o.orderStatus in :orderStatuses " +
            "AND year(o.regDate) = :year " +
            "AND month(o.regDate) = :month " +
            "GROUP BY d.franchise.id, d.drinkName " +
            "ORDER BY cnt DESC")
    List<MostRankingDto> findTop3ByMostDrink(@Param("userId") Long userId, @Param("month") int month, @Param("year") int year, @Param("orderStatuses") OrderStatus[] orderStatuses, Pageable pageable);

    @Query("SELECT coalesce(sum(o.price),0) " +
            "FROM Order o " +
            "WHERE o.user.id = :userId " +
            "and o.orderStatus in :orderStatuses " +
            "AND year(o.regDate) = :year " +
            "AND month(o.regDate) = :month")
    int findSumByUserAndMonth(@Param("userId") Long userId, @Param("month") int month, @Param("year") int year, @Param("orderStatuses") OrderStatus[] orderStatuses);

}
