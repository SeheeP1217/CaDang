package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.Drink;
import com.ssafy.cadang.domain.OrderStatus;
import com.ssafy.cadang.dto.cafe.DrinkResponseDto;
import com.ssafy.cadang.dto.cafe.query.DrinkInterface;
import com.ssafy.cadang.dto.cafe.query.DrinkNumCheckDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DrinkRepository extends JpaRepository<Drink, Long> {

    @Query("select d from Drink d where d.franchise.id=:franchiseId and d.drinkName=:drinkName order by d.vol")
    public List<Drink> getDrinkByFranchiseIdAndDrinkName(@Param("franchiseId") Long franchiseId,
                                                         @Param("drinkName") String drinkName);

    @Query("SELECT new com.ssafy.cadang.dto.cafe.query.DrinkNumCheckDto(d.drinkName, count(d.drinkName)) " +
            "FROM Order o " +
            "JOIN o.drink d " +
            "WHERE o.user.id = :userId " +
            "AND o.store.storeName = :storeName " +
            "AND o.orderStatus != :orderStatus " +
            "GROUP BY d.drinkName")
    List<DrinkNumCheckDto> findByUserIdAndStoreNameAndOrderStatus(@Param("userId") Long userId, @Param("storeName") String storeName, @Param("orderStatus") OrderStatus orderStatus);

    @Query(value = "select drink.id, drink.image, drink.drink_name as drinkName, " +
                    "drink.caffeine, drink.cal, drink.price, drink.sugar, " +
                    "drink.franchise_id as franchiseId " +
                    "from drink, store, " +
                    "(select min(vol) as vol, drink_name " +
                    "from drink d " +
                    "group by drink_name) t " +
                    "where store.franchise_id = drink.franchise_id " +
                    "and store.store_name =:storeName " +
                    "and drink.drink_name = t.drink_name " +
                    "and drink.vol = t.vol", nativeQuery = true)
    List<DrinkInterface> getDrinksByStoreName(@Param("storeName") String storeName);

    @Query(value = "select drink.id, drink.image, drink.drink_name as drinkName, " +
                    "drink.caffeine, drink.cal, drink.price, " +
                    "drink.sugar, drink.franchise_id as franchiseId, " +
                    "store.store_name as storeName " +
                    "from drink, store " +
                    "where drink.franchise_id in :franchiseIds " +
                    "and drink.caffeine <= :caffeRest " +
                    "and drink.sugar <= :sugarRest " +
                    "and drink.franchise_id = store.franchise_id " +
                    "order by rand() " +
                    "limit 20", nativeQuery = true)
    List<DrinkInterface> getRecommendDrinksByRestVolumeAndFranchiseIds(@Param("caffeRest") long caffeRest, @Param("sugarRest") long sugarRest, @Param("franchiseIds") List<Long> franchiseIds);



    @Query("select new com.ssafy.cadang.dto.cafe.DrinkResponseDto(d.drinkName, min(d.caffeine), min(d.sugar), min(d.cal), min(d.price), min(d.image)) " +
            "from Drink d " +
            "where d.franchise.id = :franchiseId " +
            "and d.drinkName " +
            "like :keyword " +
            "group by d.drinkName")
    List<DrinkResponseDto> getDrinksByFranchiseIdAndKeyword(@Param("franchiseId") Long franchiseId, @Param("keyword") String keyword);

    @Query("select new com.ssafy.cadang.dto.cafe.DrinkResponseDto(d.drinkName, min(d.caffeine), min(d.sugar), min(d.cal), min(d.price), min(d.image)) " +
            "from Drink d " +
            "where d.franchise.id = :franchiseId " +
            "group by d.drinkName")
    List<DrinkResponseDto> getDrinksByFranchiseId(@Param("franchiseId") Long franchiseId);


}