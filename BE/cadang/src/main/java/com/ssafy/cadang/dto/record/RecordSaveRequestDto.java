package com.ssafy.cadang.dto.record;


import com.ssafy.cadang.domain.custom.SugarContent;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.time.LocalDateTime;


@Data
public class RecordSaveRequestDto {
    private Long userId;
    private Long drinkId;
    private String regDate;
    private int caffeine;
    private int sugar;
    private int cal;
    private int price;

    private Integer shot; // null 허용
    private Boolean whip; // null 허용
    @Enumerated(EnumType.STRING)
    private SugarContent sugarContent;

    private Integer syrup;
    private Integer vanilla;
    private Integer hazelnut;
    private Integer caramel;
//    private String image_url;
    // ---------- 기록 주문 공통

    private String memo;
    private String storeName;

}
