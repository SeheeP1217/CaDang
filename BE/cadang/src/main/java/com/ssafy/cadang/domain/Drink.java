package com.ssafy.cadang.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@BatchSize(size = 100) // N+1문제 해결
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

    private Integer caffeine;
    private Integer sugar;
    private Integer cal;
    private Integer price;

    private int shot;
    private Boolean whip;

}
