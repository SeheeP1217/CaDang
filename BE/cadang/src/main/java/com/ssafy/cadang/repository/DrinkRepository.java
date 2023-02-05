package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.Drink;
import com.ssafy.cadang.domain.OrderStatus;
import com.ssafy.cadang.dto.cafe.query.DrinkInterface;
import com.ssafy.cadang.dto.cafe.query.DrinkNumCheckDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface DrinkRepository extends JpaRepository<Drink, Long> {


    @Query("select d from Drink d where d.franchise.id=:franchiseId and d.drinkName=:drinkName order by d.vol")
    public List<Drink> getDrinkByFranchiseIdAndDrinkName(@Param("franchiseId") Long franchiseId,
                                                    @Param("drinkName") String drinkName);

    @Query("SELECT new com.ssafy.cadang.dto.cafe.query.DrinkNumCheckDto(d.drinkName, MAX(d.franchise.id), count(d.drinkName), MAX(o.store.id)) " +
            "FROM Order o " +
            "JOIN o.drink d " +
            "WHERE o.user.id = :userId " +
            "AND o.store.storeName = :storeName " +
            "AND o.orderStatus != :orderStatus " +
            "GROUP BY d.drinkName")
    List<DrinkNumCheckDto> findByUserIdAndStoreNameAndOrderStatus(@Param("userId") Long userId, @Param("storeName") String storeName, @Param("orderStatus") OrderStatus orderStatus);

    @Query(value = "select drink.id, drink.image, drink.drink_name, drink.caffeine, drink.cal, drink.price, drink.shot, drink.size, drink.vol, drink.sugar, drink.whip, drink.franchise_id " +
            "from drink, store, " +
            "(select min(vol) as vol, drink_name " +
            "from drink d " +
            "where d.caffeine <=:caffeRest " +
            "and d.sugar <=:sugarRest " +
            "group by drink_name) t " +
            "where store.franchise_id = drink.franchise_id " +
            "and store.store_name =:storeName " +
            "and drink.drink_name = t.drink_name " +
            "and drink.vol = t.vol", nativeQuery = true)
    List<DrinkInterface> getDrinksByRestVolumeAndStoreName(@Param("caffeRest") long caffeRest, @Param("sugarRest") long sugarRest, @Param("storeName") String storeName);



    @Query(value = "select drink.id, drink.image, drink.drink_name, drink.caffeine, drink.cal, drink.price, drink.shot, drink.size, drink.vol, drink.sugar, drink.whip, drink.franchise_id, store.store_name " +
            "from drink, store " +
            "where drink.franchise_id in :franchiseIds " +
            "and drink.caffeine <= :caffeRest " +
            "and drink.sugar <= :sugarRest " +
            "and drink.franchise_id = store.franchise_id", nativeQuery = true)
    List<Drink> getRecommendDrinksByRestVolumeAndFranchiseIds(@Param("caffeRest") long caffeRest, @Param("sugarRest") long sugarRest, @Param("franchiseIds") List<Long> franchiseIds);


}