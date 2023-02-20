package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.Franchise;
import com.ssafy.cadang.domain.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FranchiseRepository extends JpaRepository<Franchise, Long> {

    @Query("select f from Franchise f order by f.franchiseName")
    List<Franchise> findAllByFranchiseNameAsc();

    Optional<Franchise> findFranchiseByfranchiseName(String franchiseName);
}
