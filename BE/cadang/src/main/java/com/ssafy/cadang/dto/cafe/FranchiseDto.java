package com.ssafy.cadang.dto.cafe;

import com.ssafy.cadang.domain.Franchise;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FranchiseDto {

    Long id;
    String franchiseName;

    public FranchiseDto(Franchise franchise) {

        id = franchise.getId();
        franchiseName = franchise.getFranchiseName();

    }
}
