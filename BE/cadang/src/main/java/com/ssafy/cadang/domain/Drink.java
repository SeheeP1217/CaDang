package com.ssafy.cadang.domain;


import javax.persistence.*;

@Entity
public class Drink {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FRANCHISE_ID")
    private Franchise franchise;

    private String name;
    private String size;
    private int vol;
    private String image;

    private Integer caffeine;
    private Integer sugar;
    private Integer cal;
    private Integer price;

    private int shot;
    private boolean whip;


}
