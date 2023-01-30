package com.ssafy.cadang.service;

import com.ssafy.cadang.domain.Data;
import com.ssafy.cadang.domain.User;
import com.ssafy.cadang.dto.data.DayDataDto;
import com.ssafy.cadang.dto.data.DayGraphDto;
import com.ssafy.cadang.dto.data.WeekDataDto;
import com.ssafy.cadang.repository.DataRepository;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.reducing;

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

    public WeekDataDto getDataByWeek(LocalDate endDate, Long userId) {

        // userId 유효성 검사?

        int dayOfWeek = endDate.getDayOfWeek().getValue();

        PageRequest pageRequest = PageRequest.of(0, dayOfWeek); // 일주일치 데이터 반환

        // 이번주 데이터
        Page<Data> thisWeekDatas = dataRepository.findWeekDataByUserAndDate(endDate, userId, pageRequest);

        // 이번주 카페인 리스트
        List<DayGraphDto> thisWeekGraph = thisWeekDatas.stream()
                .map(d -> DayGraphDto.builder()
                        .date(d.getRegDate())
                        .caffeine(d.getCaffeDaily())
                        .sugar(d.getSugarDaily())
                        .build()
                )
                .collect(Collectors.toList());


        // 현재 요일 이후의 데이터는 0으로 채우기
        for (int d = dayOfWeek + 1; d <= 7; d++) {
            thisWeekGraph.add(DayGraphDto.builder()
                    .date(endDate.plusDays(d - dayOfWeek))
                    .caffeine(0)
                    .sugar(0)
                    .build());
        }
        thisWeekGraph.sort(Comparator.comparing(DayGraphDto::getDate));

        for (DayGraphDto dayGraphDto : thisWeekGraph) {
            System.out.println("dayGraphDto = " + dayGraphDto);
        }

        // 오늘의 데이터
        Optional<Data> optionalData = dataRepository.findByUserAndDate(endDate, userId);
        Optional<Data> optionalLast = dataRepository.findByUserAndDate(endDate.minusWeeks(1), userId);

        if (optionalData.isEmpty()) {
            throw new IllegalStateException("오늘의 데이터가 0");
            // null 에러처리 고민
        }
        Data todayData = optionalData.get();

        // userId 유효성 검사 추가하기
        Data lastWeekDayData = optionalLast.orElse(new Data(userRepository.findById(userId).get()));

        // 지난주 데이터 합
        Page<Data> lastWeekData = dataRepository.findWeekDataByUserAndDate(endDate.minusWeeks(1), userId, pageRequest);
        int lastCaffeSum = lastWeekData.getContent().stream()
                .mapToInt(Data::getCaffeDaily)
                .sum();
        int lasSugarSum = lastWeekData.getContent().stream()
                .mapToInt(Data::getSugarDaily)
                .sum();

        // 이번주 데이터 합
        int thisCaffeSum = thisWeekDatas.getContent().stream()
                .mapToInt(Data::getCaffeDaily)
                .sum();
        int thisSugarSum = thisWeekDatas.getContent().stream()
                .mapToInt(Data::getSugarDaily)
                .sum();

        return WeekDataDto.builder()
                .thisWeekGraphList(thisWeekGraph)
                .todayCaffe(todayData.getCaffeDaily())
                .todaySugar(todayData.getSugarDaily())
                .dayCaffeGap(todayData.getCaffeDaily() - lastWeekDayData.getCaffeDaily())
                .daySugarGap(todayData.getSugarDaily() - lastWeekDayData.getSugarDaily())
                .thisWeekCaffe(thisWeekGraph.stream()
                        .mapToInt(DayGraphDto::getCaffeine)
                        .sum())
                .thisWeekSugar(thisWeekGraph.stream()
                        .mapToInt(DayGraphDto::getSugar)
                        .sum())
                .weekCaffeGap(thisCaffeSum - lastCaffeSum)
                .weekSugarGap(thisSugarSum - lasSugarSum)
                .build();

    }

    public DayDataDto selectOneByDate(LocalDate date, Long userId) {

        Optional<Data> data = dataRepository.findByUserAndDate(date, userId);
        return new DayDataDto(data.orElse(null));
    }

}
