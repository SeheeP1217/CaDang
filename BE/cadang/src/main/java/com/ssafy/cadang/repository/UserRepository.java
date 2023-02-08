package com.ssafy.cadang.repository;


import com.ssafy.cadang.domain.User;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // @EntityGraph은 쿼리가 수행이 될때 Lazy 조회가 아니고 Eager
    // 조회로 authorities 정보를 같이 가져오게 된다.
    @EntityGraph(attributePaths = "authorities")
    // 이 메소드는 memberId을 기준으로 User 정보를 가져올때 권한 정보도 같이
    // 가져오게 된다.
    Optional<User> findOneWithAuthoritiesByMemberId(String memberId);

    boolean existsByMemberId(String memberId);

    boolean existsByEmail(String email);

    boolean existsByUserNameAndEmail(String username, String email);

    boolean existsByMemberIdAndEmail(String memberId, String email);

    User findByMemberId(String memberId);

    Optional<User> findById(Long id);

    Optional<User> findByUserNameAndEmail(String username, String email);
    Optional<User> findByEmail(String Email);




}

