package com.ssafy.cadang.domain;

import com.ssafy.cadang.domain.custom.SugarContent;
import lombok.*;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Getter
@Setter
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

    @ManyToOne(optional = true, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "store_id")
    private Store store;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    // ------- 주문

    // store와 양방향 연관관계 편의 메소드 있어야 할까?
//    public void setStore(Store store){
//        this.store = store;
//        store.getOrders().add(this);
//    }

    @Builder
    public Order(User user, Drink drink, Store store, int caffeine,
                 int sugar, int cal, int price, Integer shot, Boolean whip,
                 SugarContent sugarContent, Integer syrup, Integer vanilla,
                 Integer hazelnut, Integer caramel, String photo, boolean isPublic,
                 String memo, String storeName, OrderStatus orderStatus) {

        this.user = user;
        this.store = store;
        this.caffeine = caffeine;
        this.sugar = sugar;
        this.cal = cal;
        this.price = price;
        this.shot = shot;
        this.whip = whip;
        this.sugarContent = sugarContent;
        this.syrup = syrup;
        this.vanilla = vanilla;
        this.hazelnut = hazelnut;
        this.caramel = caramel;
        this.photo = photo;
        this.isPublic = isPublic;
        this.memo = memo;
        this.storeName = storeName;
        this.orderStatus = orderStatus;
    }


}