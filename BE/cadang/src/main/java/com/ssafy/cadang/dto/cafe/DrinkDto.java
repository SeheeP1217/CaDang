package com.ssafy.cadang.dto.cafe;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class DrinkDto {

    private String storeName;
    private Long userId;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate today;

}
