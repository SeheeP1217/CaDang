package com.ssafy.cadang.dto.cafe;

import lombok.Data;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Data
public class DrinkRequestDto {

    List<String> storeNames;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate date;
    Long userId;
}
