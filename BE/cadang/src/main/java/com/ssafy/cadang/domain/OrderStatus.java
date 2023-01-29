package com.ssafy.cadang.domain;

public enum OrderStatus {
    REQUEST, ACCEPT, COMPLETE, PICKUP, CANCEL

    /*
        REQUEST: 주문 후 결제 완료된 상태
        ACCEPT: 가게에서 주문 수락한 상태
        COMPLETE: 제조완료 상태
        PICKUP: 고객이 픽업 후 가게에서 픽업처리 -> 주문 현황판에서 삭제
        CANCEL: 가게에서 주문 거절
     */
}
