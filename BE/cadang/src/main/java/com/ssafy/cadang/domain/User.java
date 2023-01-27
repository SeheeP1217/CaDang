package com.ssafy.cadang.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "user")
public class User {

    @JsonIgnore
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

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