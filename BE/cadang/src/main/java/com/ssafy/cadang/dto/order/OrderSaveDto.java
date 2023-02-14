package com.ssafy.cadang.dto.order;


import com.ssafy.cadang.domain.*;
import com.ssafy.cadang.domain.custom.SugarContent;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class OrderSaveDto {

    private Long drinkId;

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
    private String photo;
    private String storeName;

    // ---------- 기록 주문 공통

    private Long storeId;


    // ------- 주문


}
