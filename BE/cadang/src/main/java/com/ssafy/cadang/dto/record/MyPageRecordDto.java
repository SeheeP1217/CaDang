package com.ssafy.cadang.dto.record;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@Builder
public class MyPageRecordDto {
    private Long id;
    private String storeName;
    private String drinkName;
    private Timestamp regDate;
    private int caffeine;
    private int sugar;
    private int cal;
    private int price;
    private boolean isPublic;
    private String memo;
    private String photo;

}
