package com.ssafy.cadang.domain.custom;

import com.ssafy.cadang.domain.Franchise;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")
@Table(name = "options")
public abstract class Option {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "franchise_id")
    private Franchise franchise;

    private int cal;
    private int price;


}