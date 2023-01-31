package com.ssafy.cadang.service;

import com.ssafy.cadang.domain.Order;
import com.ssafy.cadang.repository.RecordReposiotry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecordService {
    private final RecordReposiotry recordReposiotry;

    public Order getOrderByUserId(Long userId) {
        Optional<Order> byUserId = recordReposiotry.findByUserId(userId);
        if (byUserId.isEmpty())
            throw new IllegalStateException("사용자가 존재하지 않습니다.");
        return byUserId.get();
    }
}
