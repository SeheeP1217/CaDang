package com.ssafy.cadang.scheduler;

import com.ssafy.cadang.repository.UserRepository;
import com.ssafy.cadang.service.DataService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

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
