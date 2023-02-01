package com.ssafy.cadang.domain.custom;

import com.ssafy.cadang.domain.custom.Option;

import javax.persistence.Entity;

@Entity
public class Shot extends Option {
    private int caffeine;
}
