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
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
//            Data saveData = dataRepository.save(new Data(user, date));
//            saveData.setCaffeDaily(date.getDayOfMonth());
//            return saveData.getId();
//        }
//        return null; // 에러 처리 하기
//    }

    public void getDataByWeek(LocalDate endDate, Long userId) {

        int dayOfWeek = endDate.getDayOfWeek().getValue();

        PageRequest pageRequest = PageRequest.of(0, dayOfWeek); // 일주일치 데이터 반환

        Page<Data> thisWeekDatas = dataRepository.findWeekDataByUserAndDate(endDate, userId, pageRequest);
        for (Data thisWeekData : thisWeekDatas) {
            System.out.println("thisWeekData = " + thisWeekData.getRegDate()+" "+thisWeekData.getCaffeDaily());
        }
        // 이번주 카페인 리스트
        List<Integer> thisWeekCaffeList = thisWeekDatas.stream()
                .map(Data::getCaffeDaily)
                .collect(Collectors.toList());
        Collections.reverse(thisWeekCaffeList);

        // 이번주 당 리스트
        List<Integer> thisWeekSugarList = thisWeekDatas.stream()
                .map(Data::getSugarDaily)
                .collect(Collectors.toList());
        Collections.reverse(thisWeekSugarList);

        Optional<Data> lastWeekDayData = dataRepository.findByUserAndDate(endDate.minusWeeks(1), userId);
        System.out.println(lastWeekDayData.orElse(null).getRegDate());

        int thisWeekCaffeSum = thisWeekCaffeList.stream().reduce(0, Integer::sum);
        int thisWeekSugarSum = thisWeekSugarList.stream().reduce(0, Integer::sum);

        System.out.println("thisWeekCaffeSum = " + thisWeekCaffeSum);


//
//        WeekDataDto.builder()
//                .thisWeekCaffeList(thisWeekCaffeList)
//                .thisWeekSugarList(thisWeekSugarList)
//                .todayCaffe(todayData.getCaffeDaily())
//                .todaySugar(todayData.getSugarDaily())
//                .dayCaffeGap(todayData.getCaffeDaily() - lastWeekDayData.getCaffeDaily())
//                .daySugarGap(todayData.getSugarDaily() - lastWeekDayData.getSugarDaily())
//
//                .build();


    }

    public DayDataDto selectOneByDate(LocalDate date, Long userId) {

        Optional<Data> data = dataRepository.findByUserAndDate(date, userId);
        return new DayDataDto(data.orElse(null));
    }

}
