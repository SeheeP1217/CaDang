package com.ssafy.cadang.dto.cafe;

import lombok.Data;

@Data
public class DrinkDto {

    private Long drinkId;

    private String storeName;
    private String drinkName;
    private Long franchiseId;

    private String sortby;  // 정렬 기준
                            // 기본: “자주 먹는 순서“ 선택됨
                            // 자주 먹는 순서는 주문테이블에서 가져와야 하네?
                            // 카페인
                            // 당
                            // 가격
                            // 칼로리
    private String orderby;

    private boolean isFilter; // 필터 적용 여부

}
