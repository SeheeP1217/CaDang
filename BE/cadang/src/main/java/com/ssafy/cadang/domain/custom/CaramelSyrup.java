package com.ssafy.cadang.domain.custom;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("caramel")
public class CaramelSyrup extends Option{
    private int sugar;

}
