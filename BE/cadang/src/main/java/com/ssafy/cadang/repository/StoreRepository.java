package com.ssafy.cadang.repository;

import com.ssafy.cadang.domain.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {

    Optional<Store> findStoreByStoreName(String storeName);

}
