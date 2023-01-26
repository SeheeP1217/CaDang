package com.ssafy.cadang.domain;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Data {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    private LocalDateTime date;
    private int caffeGoal;
    private int sugarGoal;
    private int caffeDaily;
    private int sugarDaily;

    private boolean caffeSuccess;
    private boolean sugarSuccess;

    private int calDaily;
    private int moneyDaily;

}
