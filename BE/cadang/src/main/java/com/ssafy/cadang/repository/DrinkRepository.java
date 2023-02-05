package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.Drink;
import com.ssafy.cadang.domain.OrderStatus;
import com.ssafy.cadang.dto.cafe.DrinkResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DrinkRepository extends JpaRepository<Drink, Long> {


//    @Query("select d from Drink d where d.franchise.id=:franchiseId and d.drinkName=:drinkName order by d.vol")
//    public List<Drink> getDrinkByFranchiseIdAndDrinkName(@Param("franchiseId") Long franchiseId,
//                                                    @Param("drinkName") String drinkName);

//    @Query(select count(*), d.drinkName, ANY_VALUE(d.franchise.id), o.store.storeName
//    from Order o join Drink d
//    on o.drink.id = d.id
//    where o.user.id=:userId
//    and o.store.storeName=:storeName
//    and o.orderStatus !=:orderStatus
//    group by d.drinkName)
//    public List<DrinkResponseDto> getNumberOfDrink(Long userId, String storeName, OrderStatus orderStatus);
}