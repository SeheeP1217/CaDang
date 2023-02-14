package com.ssafy.cadang.service;

import com.ssafy.cadang.domain.User;
import com.ssafy.cadang.dto.data.DayDataDto;
import com.ssafy.cadang.error.CustomException;
import com.ssafy.cadang.error.ExceptionEnum;
import com.ssafy.cadang.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
@Transactional
@Rollback(value = false)
class DataServiceTest {

    @Autowired
    DataService dataService;
    @Autowired
    UserRepository userRepository;

    @Test
    public void dataCrate() {

        for (int i = 10; i <= 11; i++)
            dataService.createDataByRegDate(2L, LocalDate.of(2023, 2, i));

    }

    @Test
    public void updateGoalTest() {
        User user = userRepository.findById(2L)
                .orElseThrow(() -> new CustomException(ExceptionEnum.USER_NOT_FOUND));
        user.setCaffeGoal(10L);
        user.setSugarGoal(10L);
        dataService.updateGoal(user.getId());

        DayDataDto dayData = dataService.getOneByDate(LocalDate.now(), user.getId());
        assertThat(dayData.getCaffeGoal()).isEqualTo(user.getCaffeGoal());

    }

}