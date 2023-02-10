package com.ssafy.cadang.controller;

import com.ssafy.cadang.dto.data.DayDataDto;
import com.ssafy.cadang.dto.data.MonthDataDto;
import com.ssafy.cadang.dto.data.WeekDataDto;
import com.ssafy.cadang.dto.data.WeekGraphDto;
import com.ssafy.cadang.service.DataService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;

@Tag(name = "데이터", description = "날짜별 데이터 관련 api 입니다.")
@RestController
@RequestMapping("/data")
@RequiredArgsConstructor
public class DataController {

    private final DataService dataService;

    @GetMapping("/day")
    @Operation(summary = "일간 데이터 (대시보드)")
    public DayDataDto dayDataByUserIdAndDate(HttpServletRequest request, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        Long userId = Long.valueOf(request.getAttribute("userId").toString());
        return dataService.getOneByDate(date, userId);
    }

    @GetMapping("/week")
    @Operation(summary = "주간 데이터 (페이지)")
    public WeekDataDto weekDataByUserIdAndDate(HttpServletRequest request, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        Long userId = Long.valueOf(request.getAttribute("userId").toString());
        return dataService.getDataByWeek(date, userId);
    }

    @GetMapping("/week/graph")
    @Operation(summary = "주간 그래프 (swipe)")
    public WeekGraphDto weekGraph(HttpServletRequest request,@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        Long userId = Long.valueOf(request.getAttribute("userId").toString());

        return dataService.getWeekGraphDto(date, userId);
    }

    @GetMapping("/month")
    @Operation(summary = "월간 데이터")
    public MonthDataDto datagraph(HttpServletRequest request,  @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        Long userId = Long.valueOf(request.getAttribute("userId").toString());

        return dataService.getMonthData(date, userId);
    }

}

