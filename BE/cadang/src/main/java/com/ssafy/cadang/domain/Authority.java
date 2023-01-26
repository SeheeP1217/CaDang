package com.ssafy.cadang.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Authority {

    @Id
    private Long id;


    @Column(name = "authority_name")
    private String authorityName;

}
