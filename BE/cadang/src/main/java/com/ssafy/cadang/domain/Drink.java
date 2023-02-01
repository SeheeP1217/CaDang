package com.ssafy.cadang.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Drink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    private Boolean whip;

}
