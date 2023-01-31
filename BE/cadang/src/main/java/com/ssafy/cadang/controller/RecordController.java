package com.ssafy.cadang.controller;

import com.ssafy.cadang.dto.record.RecordSaveRequestDto;
import com.ssafy.cadang.service.RecordService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "기록", description = "기록 관련 api 입니다.")
@RestController
@RequestMapping("/record")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

    @PostMapping
    public Long saveRecord(@RequestBody RecordSaveRequestDto recordDto) {
        Long id = recordService.saveOrderDirectly(recordDto);
        return id;
    }
}
