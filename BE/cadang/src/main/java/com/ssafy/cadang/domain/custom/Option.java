package com.ssafy.cadang.domain.custom;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ssafy.cadang.domain.Franchise;
import com.ssafy.cadang.domain.OrderStatus;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "options")
public class Option {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "franchise_id")
    private Franchise franchise;

    @Enumerated(EnumType.STRING)
    private Type type;

    private int cal;
    private int price;

    Integer sugar;
    Integer caffeine;


}