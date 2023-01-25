package com.ssafy.cadang.entity;

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

    public List<Option> getOptions() {
        return options;
    }

    public void setOptions(List<Option> options) {
        this.options = options;
    }
}
