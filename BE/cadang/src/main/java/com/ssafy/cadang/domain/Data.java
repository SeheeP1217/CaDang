package com.ssafy.cadang.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Data {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    private Timestamp regDate;
    private int caffeGoal;
    private int sugarGoal;
    private int caffeDaily;
    private int sugarDaily;

    private boolean caffeSuccess;
    private boolean sugarSuccess;

    private int calDaily;
    private int moneyDaily;

    public Data(User user) {
        this.user = user;
        this.caffeGoal = Math.toIntExact(user.getCaffeGoal());
        this.sugarGoal = Math.toIntExact(user.getSugarGoal());
        this.caffeDaily = 0;
        this.sugarDaily = 0;
        this.caffeSuccess = caffeGoal - caffeDaily >= 0;
        this.sugarSuccess = sugarGoal - sugarDaily >= 0;
        this.regDate = Timestamp.valueOf(LocalDateTime.now());


    }
}
