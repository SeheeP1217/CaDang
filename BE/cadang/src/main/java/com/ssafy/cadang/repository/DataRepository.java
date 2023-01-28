package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.Data;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DataRepository extends JpaRepository<Data, Long> {
}
