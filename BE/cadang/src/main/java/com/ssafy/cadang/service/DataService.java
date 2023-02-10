package com.ssafy.cadang.service;

import com.ssafy.cadang.domain.Data;
import com.ssafy.cadang.domain.Order;
import com.ssafy.cadang.domain.User;
import com.ssafy.cadang.dto.data.*;
import com.ssafy.cadang.dto.record.query.MostRankingDto;
import com.ssafy.cadang.dto.record.query.RecordRankingDto;
import com.ssafy.cadang.error.CustomException;
import com.ssafy.cadang.error.ExceptionEnum;
import com.ssafy.cadang.repository.DataRepository;
import com.ssafy.cadang.repository.RecordReposiotry;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class DataService {
    private final DataRepository dataRepository;
    private final UserRepository userRepository;
    private final RecordReposiotry recordReposiotry;


    /**
     * 회원가입시 자동으로 오늘 data 만들기 + 스케줄러
     */
    @Transactional
    public Long createData(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ExceptionEnum.USER_NOT_FOUND));
//        log.info("user {}", user.getId());
        Data saveData = dataRepository.save(new Data(user));
        return saveData.getId();

    }

    @Transactional
    public void createDataByScheduler() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            createData(user.getId());
        }
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
        List<Data> thisWeekList = dataRepository.findWeekDataByUserAndStartDate(startDate, date, userId);

        // 사용자를 찾을 수 없을 때 에러
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ExceptionEnum.USER_NOT_FOUND));


        // 오늘의 데이터
        Data todayData = dataRepository.findByUserAndDate(date, userId)
                .orElseThrow(() -> new CustomException(ExceptionEnum.DATA_NOT_FOUND));


        // 지난주 데이터가 없으면 0으로 처리
        Data lastWeekDayData = dataRepository.findByUserAndDate(date.minusWeeks(1), userId).orElse(new Data(user));


        LocalDate lastWeekDay = date.minusWeeks(1);
        LocalDate lastStartDay = lastWeekDay.minusDays(lastWeekDay.getDayOfWeek().getValue() - 1);

        // 지난주 데이터 합
        List<Data> lastWeekData = dataRepository.findWeekDataByUserAndStartDate(lastStartDay, lastWeekDay, userId);
        int lastCaffeSum = getCaffeSum(lastWeekData);
        int lastSugarSum = getSugarSum(lastWeekData);

//    이번주 데이터 합
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
        Data data = dataRepository.findByUserAndDate(date, userId)
                .orElseThrow(() -> new CustomException(ExceptionEnum.DATA_NOT_FOUND));

        return new DayDataDto(data);
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
                        .build()).sorted(Comparator.comparing(DayGraphDto::getDate)).collect(Collectors.toList());


        boolean hasNext = dataRepository.existsByRegDateGreaterThan(endDate, userId);
        boolean hasPrevious = dataRepository.existsByRegDateLessThan(startDate, userId);

        if (dayGraphDtos.size() > 0) {
            // 실제 반환 데이터의 시작 요일
            LocalDate firstData = dayGraphDtos.get(0).getDate();
            int firstDay = firstData.getDayOfWeek().getValue();

            // 실제 반환 데이터의 끝 요일
            LocalDate lastData = dayGraphDtos.get(dayGraphDtos.size() - 1).getDate();
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
        }

        // 날짜 순 정렬
        dayGraphDtos.sort(Comparator.comparing(DayGraphDto::getDate));

        return WeekGraphDto.builder()
                .weekDataList(dayGraphDtos)
                .hasNext(hasNext)
                .hasPrevious(hasPrevious)
                .build();
    }

    public MonthDataDto getMonthData(LocalDate date, Long userId) {
        List<Data> monthData = dataRepository.findMonthData(date, userId);
        monthData.sort(Comparator.comparing(Data::getRegDate));
        LocalDate startDate = monthData.get(0).getRegDate();
        LocalDate endDate = monthData.get(monthData.size() - 1).getRegDate();

        boolean hasNext = dataRepository.existsByRegDateGreaterThan(endDate, userId);
        boolean hasPrevious = dataRepository.existsByRegDateLessThan(startDate, userId);

        List<DayDataDtoByMonth> daydatas = toMonThDto(monthData);

        int month = date.getMonthValue();

        return MonthDataDto.builder()
                .monthDataList(daydatas)
                .hasPrevious(hasPrevious)
                .hasNext(hasNext)
                .totalPrice(recordReposiotry.findSumByUserAndMonth(userId, month))
                .favRanking(rankingMost(userId, month))
                .caffeRanking(rankingCaffeine(userId, month))
                .sugarRanking(rankingSugar(userId, month))
                .build();

    }

    @Transactional
    public void updateGoal(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ExceptionEnum.USER_NOT_FOUND));
        Data todayData = dataRepository.findByUserAndDate(LocalDate.now(), userId)
                .orElseThrow(() -> new CustomException(ExceptionEnum.DATA_NOT_FOUND));
        todayData.setCaffeGoal(user.getCaffeGoal());
        todayData.setSugarGoal(user.getSugarGoal());
        todayData.setSugarSuccess(todayData.getSugarGoal()-todayData.getSugarDaily()>=0);
        todayData.setCaffeSuccess(todayData.getCaffeGoal()-todayData.getCaffeDaily()>=0);

    }

    @Transactional
    public void updateData(Order findOrder) {
        Data updateData = dataRepository.findByUserAndDate(findOrder.getRegDate().toLocalDate(), findOrder.getUser().getId())
                .orElseThrow(() -> new CustomException(ExceptionEnum.DATA_NOT_FOUND));
        updateData.setCaffeDaily(updateData.getCaffeDaily() + findOrder.getCaffeine());
        updateData.setSugarDaily(updateData.getSugarDaily() + findOrder.getSugar());
        updateData.setCalDaily(updateData.getCalDaily() + findOrder.getCal());
        updateData.setMoneyDaily(updateData.getMoneyDaily() + findOrder.getPrice());
        updateData.setSugarSuccess(updateData.getSugarGoal()-updateData.getSugarDaily()>=0);
        updateData.setCaffeSuccess(updateData.getCaffeGoal()-updateData.getCaffeDaily()>=0);

    }

    @Transactional
    public void updateDataByDelete(Order findOrder) {
        Data updateData = dataRepository.findByUserAndDate(findOrder.getRegDate().toLocalDate(), findOrder.getUser().getId())
                .orElseThrow(() -> new CustomException(ExceptionEnum.DATA_NOT_FOUND));
        updateData.setCaffeDaily(updateData.getCaffeDaily() - findOrder.getCaffeine());
        updateData.setSugarDaily(updateData.getSugarDaily() - findOrder.getSugar());
        updateData.setCalDaily(updateData.getCalDaily() - findOrder.getCal());
        updateData.setMoneyDaily(updateData.getMoneyDaily() - findOrder.getPrice());
        updateData.setSugarSuccess(updateData.getSugarGoal()-updateData.getSugarDaily()>=0);
        updateData.setCaffeSuccess(updateData.getCaffeGoal()-updateData.getCaffeDaily()>=0);

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

    private List<DayDataDtoByMonth> toMonThDto(List<Data> monthData) {
        return monthData.stream()
                .map(m -> DayDataDtoByMonth.builder()
                        .date(m.getRegDate())
                        .caffeDaily(m.getCaffeDaily())
                        .sugarDaily(m.getSugarDaily())
                        .caffeSuccess(m.isCaffeSuccess())
                        .sugarSuccess(m.isSugarSuccess())
                        .build()
                ).collect(Collectors.toList());

    }

    private List<String> rankingCaffeine(Long userId, int month) {
        PageRequest pageRequest = PageRequest.of(0, 3);
        List<RecordRankingDto> topList = recordReposiotry.findTop3ByCaffeine(userId, month, pageRequest);
        return topList.stream()
                .map(o -> o.getFranchiseName() + " " + o.getDrinkName())
                .collect(Collectors.toList());
    }

    private List<String> rankingSugar(Long userId, int month) {
        PageRequest pageRequest = PageRequest.of(0, 3);
        List<RecordRankingDto> topList = recordReposiotry.findTop3BySugar(userId, month, pageRequest);
        return topList.stream()
                .map(o -> o.getFranchiseName() + " " + o.getDrinkName())
                .collect(Collectors.toList());
    }

    private List<String> rankingMost(Long userId, int month) {
        PageRequest pageRequest = PageRequest.of(0, 3);
        List<MostRankingDto> topList = recordReposiotry.findTop3ByMostDrink(userId, month, pageRequest);
        return topList.stream()
                .map(o -> o.getFranchiseName() + " " + o.getDrinkName())
                .collect(Collectors.toList());
    }


}
