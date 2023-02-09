package com.ssafy.cadang.domain;

import com.ssafy.cadang.domain.custom.SugarContent;
import lombok.*;
import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drink_id")
    private Drink drink;

    private LocalDateTime regDate;

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

    // ---------- 기록 주문 공통

    private boolean isPublic;
    private String memo;
    private String storeName;

    //----   기록

    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    public Order(LocalDateTime regDate) {
        this.regDate = regDate;
    }

    // ------- 주문

    // store와 양방향 연관관계 편의 메소드 있어야 할까?
//    public void setStore(Store store){
//        this.store = store;
//        store.getOrders().add(this);
//    }


}