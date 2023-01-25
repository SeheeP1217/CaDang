package com.ssafy.cadang.entity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("hazelnut")
public class HazelnutSyrup extends Option{
    private int sugar;

}
