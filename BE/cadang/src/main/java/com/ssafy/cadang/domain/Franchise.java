package com.ssafy.cadang.domain;

import com.ssafy.cadang.domain.custom.Option;

import javax.persistence.*;
import java.util.List;

@Entity
public class Franchise {

    @Id
    @GeneratedValue
    private Long id;

    private String franchiseName;
    private String image;

    @OneToMany(mappedBy = "franchise")
    List<Drink> drinks;

    @OneToMany(mappedBy = "franchise")
    List<Option> options = new java.util.ArrayList<>();
}
