package com.ssafy.cadang.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("caramel")
public class CaramelSyrup extends Option{
    private int sugar;

}
