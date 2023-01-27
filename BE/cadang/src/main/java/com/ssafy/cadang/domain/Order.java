package com.ssafy.cadang.domain;

import com.ssafy.cadang.domain.custom.SugarContent;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
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
    private boolean isPaid;

    // ---------- 기록 주문 공통
    private boolean isPublic;
    private String memo;
    private String photo;

    private String storeName;

    //----   기록

    @ManyToOne(optional = true)
    @JoinColumn(name = "store_id")
    private Store store;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    // ------- 주문








}