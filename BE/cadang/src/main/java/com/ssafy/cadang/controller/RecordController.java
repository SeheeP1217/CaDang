package com.ssafy.cadang.controller;

import com.ssafy.cadang.dto.record.*;
import com.ssafy.cadang.service.RecordService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;

@Tag(name = "기록", description = "기록 관련 api 입니다.")
@RestController
@RequestMapping("/record")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

    @PostMapping
    public Long saveRecord(@RequestBody RecordSaveRequestDto recordDto) throws IOException {
        Long id = recordService.saveRecordDirectly(recordDto);
        return id;
    }


    @GetMapping
    public MyPageRecordListDto searchByKeyword(@RequestParam Long userId,
                                               @RequestParam int page,
                                               @RequestParam int size,
                                               @RequestParam(required = false) String keyword) {

        return recordService.searchByKeyword(userId, keyword, page-1, size);
    }

    @GetMapping("/{recordId}")
    public RecordDetailDto recordByRecordId(@PathVariable Long recordId) {
        return recordService.getOrderByRecordId(recordId);
    }

    @PutMapping
    public Long updateRecord(@RequestBody RecordUpdateDto updateDto) throws IOException {
        return recordService.updateRecord(updateDto);
    }

    @DeleteMapping("/{recordId}")
    public Long deleteByRecordId(@PathVariable Long recordId) {
        return recordService.deleteOrderById(recordId);
    }


}
