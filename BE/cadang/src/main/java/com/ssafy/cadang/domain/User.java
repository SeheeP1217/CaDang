package com.ssafy.cadang.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@Table(name = "user")
public class User {

    @JsonIgnore
    @Id
//    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;

    private String memberId;

    private String password;

    private String email;

    private String nickname;

    private String img;

    private Long caffeGoal;

    private Long sugarGoal;

    private Timestamp lastUpdated;

    private String refreshToken;

    @ManyToOne
    @JoinColumn(name = "auth_id")
    private Authority authority;


}