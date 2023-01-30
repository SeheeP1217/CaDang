package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DataRepository extends JpaRepository<Data, Long> {

    @EntityGraph(attributePaths = "user")
    @Query("select d from Data d  where d.user.id = :userId and d.regDate >=:startdate and d.regDate<=:enddate order by d.regDate desc")
    List<Data> findWeekDataByUserAndStartDate(@Param("startdate") LocalDate startdate, @Param("enddate") LocalDate enddate, @Param("userId") Long userId);

    @EntityGraph(attributePaths = "user")
    @Query("select d from Data d  where d.user.id = :userId and d.regDate = :date")
    Optional<Data> findByUserAndDate(@Param("date") LocalDate date, @Param("userId") Long userId);

}
