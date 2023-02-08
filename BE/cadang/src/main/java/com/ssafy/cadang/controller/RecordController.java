package com.ssafy.cadang.controller;

import com.ssafy.cadang.dto.record.*;
import com.ssafy.cadang.service.RecordService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
    public Long saveRecord(HttpServletRequest request, @RequestBody RecordSaveRequestDto recordDto) throws IOException {
        Long userId = Long.valueOf(request.getAttribute("userId").toString());
        recordDto.setUserId(userId);
        Long id = recordService.saveRecordDirectly(recordDto);
        return id;
    }


    @GetMapping
    public MyPageRecordListDto searchByKeyword(HttpServletRequest request,
                                               @RequestParam int page,
                                               @RequestParam int size,
                                               @RequestParam(required = false) String keyword) {
        Long userId = Long.valueOf(request.getAttribute("userId").toString());
        return recordService.searchByKeyword(userId, keyword, page-1, size);
    }

    @GetMapping("/{recordId}")
    public RecordDetailDto recordByRecordId(HttpServletRequest request, @PathVariable Long recordId) {
        Long userId = Long.valueOf(request.getAttribute("userId").toString());
        return recordService.getOrderByRecordId(userId, recordId);
    }

    @PutMapping
    public Long updateRecord(HttpServletRequest request, @RequestBody RecordUpdateDto updateDto) throws IOException {
        Long userId = Long.valueOf(request.getAttribute("userId").toString());
        return recordService.updateRecord(userId, updateDto);
    }

    @DeleteMapping("/{recordId}")
    public Long deleteByRecordId(HttpServletRequest request, @PathVariable Long recordId) {
        Long userId = Long.valueOf(request.getAttribute("userId").toString());
        return recordService.deleteOrderById(userId, recordId);
    }


}
