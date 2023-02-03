package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.Franchise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FranchiseRepository extends JpaRepository<Franchise, Long> {

    @Query("select f from Franchise f order by f.franchiseName")
    List<Franchise> findAllByFranchiseNameAsc();
}
