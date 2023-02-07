package com.ssafy.cadang.domain;

import com.ssafy.cadang.domain.custom.Option;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Franchise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String franchiseName;
    private String image;

    @OneToMany(mappedBy = "franchise")
    List<Drink> drinks;

    @OneToMany(mappedBy = "franchise")
    List<Option> options = new java.util.ArrayList<>();
}
