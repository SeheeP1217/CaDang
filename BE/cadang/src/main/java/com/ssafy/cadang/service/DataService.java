package com.ssafy.cadang.service;

import com.ssafy.cadang.domain.Data;
import com.ssafy.cadang.domain.User;
import com.ssafy.cadang.dto.data.DayDataDto;
import com.ssafy.cadang.dto.data.WeekDataDto;
import com.ssafy.cadang.repository.DataRepository;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
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

//    @Transactional
//    public Long createDataByRegDate(Long userId, LocalDate date) {
//        Optional<User> userOptional = userRepository.findById(userId);
//        User user = userOptional.orElse(null);
//        if (user != null) {
//            Data saveData = dataRepository.save(new Data(user));
//            saveData.setRegDate(date);
//            return saveData.getId();
//        }
//        return null; // 에러 처리 하기
//    }

//    public List<WeekDataDto> getDataByWeek(LocalDate startDate) {
//        PageRequest pageRequest = PageRequest.of(0, 7); // 일주일치 데이터 반환
//        Page<Data> byUserAndDate = dataRepository.findByUserAndDate(startDate, pageRequest);
//        for (Data data : byUserAndDate) {
//            System.out.println(data.getRegDate());
//        }
//
//    }

    public DayDataDto selectOneByDate(LocalDate date, Long userId) {

        Data data = dataRepository.findByUserAndDate(date, userId);
        return new DayDataDto(data);
    }

}
