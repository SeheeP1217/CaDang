package com.ssafy.cadang.controller;

import com.ssafy.cadang.dto.record.*;
import com.ssafy.cadang.service.RecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.LocalDateTime;

@Tag(name = "기록", description = "기록 관련 api 입니다.")
@RestController
@RequestMapping("/record")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;
    private final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @PostMapping
    @Operation(summary = "기록 직접 추가")
    public Long saveRecord(HttpServletRequest request, @RequestBody RecordSaveRequestDto recordDto) throws IOException {

        logger.info("saveRecord - 호출 {} ");
        logger.info(" 요청 시간 - {}", LocalDateTime.now());

        Long userId = Long.valueOf(request.getAttribute("userId").toString());
        recordDto.setUserId(userId);
        Long id = recordService.saveRecordDirectly(recordDto);
        return id;
    }


    @GetMapping
    @Operation(summary = "기록 조회 및 검색")
    public MyPageRecordListDto searchByKeyword(HttpServletRequest request,
                                               @RequestParam int page,
                                               @RequestParam int size,
                                               @RequestParam(required = false) String keyword) {

        logger.info("searchByKeyword - 호출 {} ");
        logger.info(" 요청 시간 - {}", LocalDateTime.now());

        Long userId = Long.valueOf(request.getAttribute("userId").toString());
        return recordService.searchByKeyword(userId, keyword, page-1, size);
    }

    @GetMapping("/{recordId}")
    @Operation(summary = "기록 상세 조회 (수정 페이지에서 조회)")
    public RecordDetailDto recordByRecordId(HttpServletRequest request, @PathVariable Long recordId) {

        logger.info("recordByRecordId - 호출 {} ");
        logger.info(" 요청 시간 - {}", LocalDateTime.now());

        Long userId = Long.valueOf(request.getAttribute("userId").toString());
        return recordService.getOrderByRecordId(userId, recordId);

    }

    @PutMapping
    @Operation(summary = "기록 수정")
    public Long updateRecord(HttpServletRequest request, RecordUpdateDto updateDto) throws IOException {

        logger.info("updateRecord - 호출 {} ");
        logger.info(" 요청 시간 - {}", LocalDateTime.now());

        Long userId = Long.valueOf(request.getAttribute("userId").toString());
        return recordService.updateRecord(userId, updateDto);
    }

    @DeleteMapping("/{recordId}")
    @Operation(summary = "기록 삭제")
    public Long deleteByRecordId(HttpServletRequest request, @PathVariable Long recordId) {

        logger.info("deleteByRecordId - 호출 {} ");
        logger.info(" 요청 시간 - {}", LocalDateTime.now());

        Long userId = Long.valueOf(request.getAttribute("userId").toString());
        return recordService.deleteOrderById(userId, recordId);

    }


}
