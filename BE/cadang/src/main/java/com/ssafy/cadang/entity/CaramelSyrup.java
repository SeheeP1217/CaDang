package com.ssafy.cadang.entity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("caramel")
public class CaramelSyrup extends Option{
    private int sugar;

}
