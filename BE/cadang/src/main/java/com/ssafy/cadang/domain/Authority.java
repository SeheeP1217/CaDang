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
    @Column(name = "authority_name",length = 50)
    private String authorityName;

    @OneToOne
    @JoinColumn(name="id")
    private User user;

}
