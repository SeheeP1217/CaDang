package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface DataRepository extends JpaRepository<Data, Long> {

    @EntityGraph(attributePaths = "user")
    @Query("select d from Data d  where d.user.id = :userId and d.regDate >=:date")
    Page<Data> findWeekDataByUserAndDate(@Param("date") LocalDate date, @Param("userId") Long userId, Pageable pageable);

    @EntityGraph(attributePaths = "user")
    @Query("select d from Data d  where d.user.id = :userId and d.regDate = :date")
    Data findByUserAndDate(@Param("date") LocalDate date, @Param("userId") Long userId);


}
