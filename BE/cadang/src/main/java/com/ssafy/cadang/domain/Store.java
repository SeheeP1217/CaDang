package com.ssafy.cadang.domain;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Store {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "franchise_id")
    private Franchise franchise;

    private String storeName;

    @OneToMany(mappedBy = "store")
    List<Order> orders = new java.util.ArrayList<>();



}
