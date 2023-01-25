package com.ssafy.cadang.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("hazelnut")
public class HazelnutSyrup extends Option{
    private int sugar;

}
