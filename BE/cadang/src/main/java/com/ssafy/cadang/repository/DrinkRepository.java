package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.Drink;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrinkRepository extends JpaRepository<Drink, Long> {
}