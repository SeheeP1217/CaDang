package com.ssafy.cadang.dto.data;

import com.ssafy.cadang.domain.Data;
import lombok.AllArgsConstructor;


import java.time.LocalDate;

@lombok.Data
public class DayDataDto {
    private Long id;
    private Long userId;
    private LocalDate date;
    private long caffeGoal;
    private long sugarGoal;
    private int caffeDaily;
    private int sugarDaily;
    private int calDaily;
    private int moneyDaily;

    private boolean caffeSuccess;
    private boolean sugarSuccess;


    public DayDataDto(Data data) {
        id = data.getId();
        userId = data.getUser().getId();
        date = data.getRegDate();
        caffeGoal = data.getCaffeGoal();
        sugarGoal = data.getSugarGoal();
        caffeDaily = data.getCaffeDaily();
        sugarDaily = data.getSugarDaily();
        caffeSuccess = data.isCaffeSuccess();
        sugarSuccess = data.isSugarSuccess();
        moneyDaily = data.getMoneyDaily();
        calDaily = data.getCalDaily();
    }
}
