package com.ssafy.cadang.scheduler;

import com.ssafy.cadang.domain.User;
import com.ssafy.cadang.dto.data.DayDataDto;
import com.ssafy.cadang.dto.data.MonthDataDto;
import com.ssafy.cadang.repository.UserRepository;
import com.ssafy.cadang.service.DataService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.List;

@Component
@EnableScheduling
@RequiredArgsConstructor
public class Scheduler {
    private final DataService dataService;
    private final UserRepository userRepository;


    @Scheduled(cron = "0 0 0 * * *")
    public void runTask() {
        dataService.createDataByScheduler();
    }
}
