package com.ssafy.cadang.entity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@DiscriminatorValue("vanilla")
public class VanillaSyrup extends Option{
    private int sugar;

}
