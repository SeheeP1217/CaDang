package com.ssafy.cadang.controller;

import com.ssafy.cadang.dto.record.MyPageRecordListDto;
import com.ssafy.cadang.dto.record.RecordDetailDto;
import com.ssafy.cadang.dto.record.RecordSaveRequestDto;
import com.ssafy.cadang.dto.record.RecordUpdateDto;
import com.ssafy.cadang.service.RecordService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public MyPageRecordListDto recordByUserId(@RequestParam Long userId, @RequestParam Long lastUpdatedId, int size) {
        return recordService.getOrderBySlice(lastUpdatedId, userId, size);
    }

    @GetMapping("/{recordId}")
    public RecordDetailDto recordByRecordId(@PathVariable Long recordId) {
        return recordService.getOrderByRecordId(recordId);
    }

    @PutMapping
    public Long updateRecord(@RequestBody RecordUpdateDto updateDto) {
        return recordService.updateRecord(updateDto);
    }

    @DeleteMapping("/{recordId}")
    public Long deleteByRecordId(@PathVariable Long recordId) {
        return recordService.deleteOrderById(recordId);
    }
}
