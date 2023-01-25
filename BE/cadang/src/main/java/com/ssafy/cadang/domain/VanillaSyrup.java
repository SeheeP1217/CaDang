package com.ssafy.cadang.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("vanilla")
public class VanillaSyrup extends Option{
    private int sugar;

}
