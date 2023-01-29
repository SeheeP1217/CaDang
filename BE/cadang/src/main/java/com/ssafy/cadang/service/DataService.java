package com.ssafy.cadang.service;

import com.ssafy.cadang.domain.Data;
import com.ssafy.cadang.domain.User;
import com.ssafy.cadang.repository.DataRepository;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DataService {
    private final DataRepository dataRepository;
    private final UserRepository userRepository;


    /**
     * 회원가입시 자동으로 오늘 data 만들기`
     */
    @Transactional
    public Long createData(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        User user = userOptional.orElse(null);
        if (user != null) {
            Data saveData = dataRepository.save(new Data(user));
            return saveData.getId();
        }
        return null; // 에러 처리 하기
    }

}
