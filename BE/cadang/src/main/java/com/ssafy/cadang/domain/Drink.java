package com.ssafy.cadang.domain;


import javax.persistence.*;

@Entity
public class Drink {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "FRANCHISE_ID")
    private Franchise franchise;

    private String drinkName;
    private String size;
    private int vol;
    private String image;

    private int caffeine;
    private int sugar;
    private int cal;
    private int price;

    private int shot;
    private boolean whip;


}
