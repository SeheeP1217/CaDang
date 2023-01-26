package com.ssafy.cadang.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "user")
public class User {

    @JsonIgnore
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String password;

    private String email;

    private String nickname;

    private String img;

    private Long caffeGoal;

    private Long sugarGoal;

    private Timestamp lastUpdated;

    private Long authId;

    private String refreshToken;

    @ManyToOne
    @JoinColumn(name = "auth_id")
    private Authority authority;


}