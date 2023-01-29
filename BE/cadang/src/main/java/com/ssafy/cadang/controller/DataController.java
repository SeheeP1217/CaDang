package com.ssafy.cadang.controller;

import com.ssafy.cadang.service.DataService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "데이터", description = "날짜별 데이터 관련 api 입니다.")
@RestController
@RequestMapping("/data")
@RequiredArgsConstructor
public class DataController {

    private final DataService dataService;




}
