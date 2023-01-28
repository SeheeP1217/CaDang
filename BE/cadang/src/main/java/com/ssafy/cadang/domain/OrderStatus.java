package com.ssafy.cadang.domain;

public enum OrderStatus {

    /*
        REQUEST: 결제 완료 후 주문 등록 상태
        ACCEPT: 가게에서 주문 수락 상태 ( 제조중 )
        COMPLETE: 제조완료 상태
        PICKUP: 고객이 가져간 후 주문 진행 끝 ( 고객 주문 현황에서 사라짐)
        CANCEL: 가게에서 주문 취소
    */

    REQUEST, ACCEPT, COMPLETE, PICKUP, CANCEL

}
