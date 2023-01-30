package com.ssafy.cadang.controller;

import com.ssafy.cadang.dto.data.DayDataDto;
import com.ssafy.cadang.dto.data.WeekDataDto;
import com.ssafy.cadang.service.DataService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@Tag(name = "데이터", description = "날짜별 데이터 관련 api 입니다.")
@RestController
@RequestMapping("/data")
@RequiredArgsConstructor
public class DataController {

    private final DataService dataService;

    @GetMapping("/day")
    public DayDataDto dayDataByUserIdAndDate(@RequestParam Long userId, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        return dataService.selectOneByDate(date, userId);
    }

    @GetMapping("/week")
    public WeekDataDto weekDataByUserIdAndDate(@RequestParam Long userId, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        return dataService.getDataByWeek(date, userId);
    }


}
