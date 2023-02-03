package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.Drink;
import com.ssafy.cadang.dto.cafe.DrinkResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DrinkRepository extends JpaRepository<Drink, Long> {


    @Query("select d from Drink d where d.franchise.id=:franchiseId and d.drinkName=:drinkName order by d.vol")
    public List<Drink> getDrinkByFranchiseIdAndDrinkName(@Param("franchiseId") Long franchiseId,
                                                    @Param("drinkName") String drinkName);
}