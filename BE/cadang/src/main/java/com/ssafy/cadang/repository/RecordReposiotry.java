package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecordReposiotry extends JpaRepository<Order, Long> {

    Optional<Order> findByUserId(Long userId);
}
