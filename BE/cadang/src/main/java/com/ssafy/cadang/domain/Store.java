package com.ssafy.cadang.domain;

import javax.persistence.*;
import java.util.List;

@Entity
public class Store {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "franchise_id")
    private Franchise franchise;

    private String name;

    @OneToMany(mappedBy = "store")
    List<Order> orders = new java.util.ArrayList<>();



}
