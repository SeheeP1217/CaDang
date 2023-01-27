package com.ssafy.cadang.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Data {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    private LocalDateTime regDate;
    private int caffeGoal;
    private int sugarGoal;
    private int caffeDaily;
    private int sugarDaily;

    private boolean caffeSuccess;
    private boolean sugarSuccess;

    private int calDaily;
    private int moneyDaily;

    public Data(User user, LocalDateTime regDate, int caffeGoal, int sugarGoal) {
        this.user = user;
        this.regDate = regDate;
        this.caffeGoal = caffeGoal;
        this.sugarGoal = sugarGoal;
    }
}
