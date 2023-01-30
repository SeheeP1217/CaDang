package com.ssafy.cadang.service;

import com.ssafy.cadang.domain.Data;
import com.ssafy.cadang.domain.User;
import com.ssafy.cadang.dto.data.DayDataDto;
import com.ssafy.cadang.dto.data.DayGraphDto;
import com.ssafy.cadang.dto.data.WeekDataDto;
import com.ssafy.cadang.dto.data.WeekGraphDto;
import com.ssafy.cadang.repository.DataRepository;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
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

    public WeekDataDto getDataByWeek(LocalDate date, Long userId) {

        WeekGraphDto weekGraphDto = getWeekGraphDto(date, userId);
        int dayOfWeek = date.getDayOfWeek().getValue();
        LocalDate startDate = date.minusDays(dayOfWeek - 1); // 월요일
        LocalDate endDate = date.plusDays(7 - dayOfWeek); // 일요일
        List<Data> thisWeekList = dataRepository.findWeekDataByUserAndStartDate(startDate, date, userId);

        // 오늘의 데이터
        Optional<Data> optionalData = dataRepository.findByUserAndDate(date, userId);
        Optional<Data> optionalLast = dataRepository.findByUserAndDate(date.minusWeeks(1), userId);

        if (optionalData.isEmpty()) {
            throw new IllegalStateException("오늘의 데이터가 없습니다.");
            // null 에러처리 고민
        }
        Data todayData = optionalData.get();

        // userId 유효성 검사 추가하기
        Data lastWeekDayData = optionalLast.orElse(new Data(userRepository.findById(userId).get()));


        LocalDate lastWeekDay = date.minusWeeks(1);
        LocalDate lastStartDay = lastWeekDay.minusDays(lastWeekDay.getDayOfWeek().getValue() - 1);
        // 지난주 데이터 합
        List<Data> lastWeekData = dataRepository.findWeekDataByUserAndStartDate(lastStartDay, lastWeekDay, userId);
        int lastCaffeSum = getCaffeSum(lastWeekData);
        int lastSugarSum = getSugarSum(lastWeekData);

//         이번주 데이터 합
        int thisCaffeSum = getCaffeSum(thisWeekList);
        int thisSugarSum = getSugarSum(thisWeekList);

        return WeekDataDto.builder().
                thisWeekGraphDto(weekGraphDto).
                todayCaffe(todayData.getCaffeDaily()).
                todaySugar(todayData.getSugarDaily()).
                dayCaffeGap(todayData.getCaffeDaily() - lastWeekDayData.getCaffeDaily()).
                daySugarGap(todayData.getSugarDaily() - lastWeekDayData.getSugarDaily()).
                thisWeekCaffe(thisWeekList.stream().
                        mapToInt(Data::getCaffeDaily).
                        sum()).
                thisWeekSugar(thisWeekList.stream().
                        mapToInt(Data::getSugarDaily).
                        sum()).
                weekCaffeGap(thisCaffeSum - lastCaffeSum).
                weekSugarGap(thisSugarSum - lastSugarSum).
                build();

    }

    public DayDataDto getOneByDate(LocalDate date, Long userId) {
        Optional<Data> data = dataRepository.findByUserAndDate(date, userId);
        return new DayDataDto(data.orElse(null));
    }


    public WeekGraphDto getWeekGraphDto(LocalDate date, Long userId) {
        int dayOfWeek = date.getDayOfWeek().getValue();
        LocalDate startDate = date.minusDays(dayOfWeek - 1); // 월요일
        LocalDate endDate = date.plusDays(7 - dayOfWeek); // 일요일

        // 이번주 데이터
        List<Data> content = dataRepository.findWeekDataByUserAndStartDate(startDate, endDate, userId);

        // dto로 변경
        List<DayGraphDto> dayGraphDtos = content.stream()
                .map(d -> DayGraphDto.builder()
                        .date(d.getRegDate())
                        .caffeine(d.getCaffeDaily())
                        .sugar(d.getSugarDaily())
                        .build())
                .collect(Collectors.toList());

        // 실제 반환 데이터의 시작 요일

        LocalDate firstData = content.get(0).getRegDate();
        int firstDay = firstData.getDayOfWeek().getValue();
        // 실제 반환 데이터의 끝 요일
        LocalDate lastData = content.get(content.size() - 1).getRegDate();
        int lastDay = lastData.getDayOfWeek().getValue();

        // 시작 요일 이전의 데이터가 없을 경우
        for (int d = 1; d < firstDay; d++) {
            dayGraphDtos.add(DayGraphDto.builder()
                    .date(startDate.plusDays(d - 1))
                    .caffeine(0)
                    .sugar(0)
                    .build());
        }
        // 현재 요일 이후의 데이터가 없을 경우
        for (int d = lastDay + 1; d <= 7; d++) {
            dayGraphDtos.add(DayGraphDto.builder()
                    .date(startDate.plusDays(d - 1))
                    .caffeine(0)
                    .sugar(0)
                    .build());
        }

        // 날짜 순 정렬
        dayGraphDtos.sort(Comparator.comparing(DayGraphDto::getDate));


        return WeekGraphDto.builder()
                .weekDataList(dayGraphDtos)
                .hasNext(hasNext(endDate, lastData))
                .hasPrevious(hasPrevious(startDate, firstData))
                .build();
    }

    private boolean hasNext(LocalDate endDate, LocalDate lastData) {
        return endDate.isEqual(lastData);
    }

    private boolean hasPrevious(LocalDate startDate, LocalDate firstData) {
        return startDate.isEqual(firstData);
    }

    private int getCaffeSum(List<Data> datas) {
        return datas.stream()
                .mapToInt(Data::getCaffeDaily)
                .sum();
    }

    private int getSugarSum(List<Data> datas) {
        return datas.stream()
                .mapToInt(Data::getSugarDaily)
                .sum();
    }


}
