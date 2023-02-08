package com.ssafy.cadang.controller;

import com.ssafy.cadang.dto.data.DayDataDto;
import com.ssafy.cadang.dto.data.MonthDataDto;
import com.ssafy.cadang.dto.data.WeekDataDto;
import com.ssafy.cadang.dto.data.WeekGraphDto;
import com.ssafy.cadang.service.DataService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDate;

@Tag(name = "데이터", description = "날짜별 데이터 관련 api 입니다.")
@RestController
@RequestMapping("/data")
@RequiredArgsConstructor
public class DataController {

    private final DataService dataService;

    @GetMapping("/day")
    public DayDataDto dayDataByUserIdAndDate(HttpServletRequest request, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        Long userId = Long.valueOf(request.getAttribute("userId").toString());
        return dataService.getOneByDate(date, userId);
    }

    @GetMapping("/week")
    public WeekDataDto weekDataByUserIdAndDate(HttpServletRequest request,
                                               @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        Long userId = Long.valueOf(request.getAttribute("userId").toString());
        return dataService.getDataByWeek(date, userId);
    }

    @GetMapping("/week/graph")
    public WeekGraphDto weekGraph(HttpServletRequest request,@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        Long userId = Long.valueOf(request.getAttribute("userId").toString());
        return dataService.getWeekGraphDto(date, userId);
    }

    @GetMapping("/month")
    public MonthDataDto datagraph(HttpServletRequest request,  @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        Long userId = Long.valueOf(request.getAttribute("userId").toString());
        return dataService.getMonthData(date, userId);
    }


}
