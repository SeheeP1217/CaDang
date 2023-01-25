package com.ssafy.cadang.domain;

import javax.persistence.*;
import java.util.List;

@Entity
public class Franchise {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String image;

    @OneToMany(mappedBy = "franchise")
    List<Drink> drinks;

    @OneToMany(mappedBy = "franchise")
    List<Option> options = new java.util.ArrayList<>();
}
