package com.ssafy.cadang.dto.record;

import com.ssafy.cadang.domain.OrderStatus;
import com.ssafy.cadang.domain.custom.SugarContent;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@Builder
public class RecordDetailDto {
    private Long id;
    private String photo;
    private String drinkName;
    private int caffeine;
    private int sugar;
    private int cal;
    private int price;
    private LocalDateTime regDate;
    private String memo;
    private String size;
    private Integer shot;
    private Boolean whip;
    private SugarContent sugarContent;
    private Integer syrup;
    private Integer vanilla;
    private Integer caramel;
    private Integer hazelnut;
    private OrderStatus orderStatus;
    private String defaultUrl;

}
