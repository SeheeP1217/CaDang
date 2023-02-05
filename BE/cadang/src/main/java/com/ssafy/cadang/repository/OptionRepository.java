package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.custom.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OptionRepository extends JpaRepository<Option, Long> {

    @Query("select o from Option o where o.franchise.id = :franchiseId")
    List<Option> FindOptionsByFranchiseId(@Param("franchiseId") Long franchiseId);
}
