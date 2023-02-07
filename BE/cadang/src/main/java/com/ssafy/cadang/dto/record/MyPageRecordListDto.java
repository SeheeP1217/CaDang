package com.ssafy.cadang.dto.record;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MyPageRecordListDto {
    private List<MyPageRecordDto> recordList;
    private boolean hasNext;
    private boolean hasPrevious;
    private int totalPage;
}
