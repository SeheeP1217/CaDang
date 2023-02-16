package com.ssafy.cadang.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
public class User {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;

    private String memberId;

    private String password;

    private String email;

    private String nickname;

    private String imgUrl;

    private Long caffeGoal;

    private Long sugarGoal;

    private Timestamp lastUpdated;

    private String refreshToken;

    private String authorities; // USER, ADMIN

    public List<String> getAuthorityList(){
        if (this.authorities.length() > 0) {
            return Arrays.asList(this.authorities.split(","));
        }
        return new ArrayList<>();
    }


}