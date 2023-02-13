package com.ssafy.cadang.scheduler;

import com.ssafy.cadang.repository.UserRepository;
import com.ssafy.cadang.service.DataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.File;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
@EnableScheduling
@RequiredArgsConstructor
@Slf4j
public class Scheduler {
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    private final DataService dataService;
    @Value("${EC2_FILE_PATH}")
    private String DirectoryName;

    @Scheduled(cron = "0 54 9 * * *")
    public void runTask() {
        log.info("스케줄러 실행 {}", LocalDateTime.now());
        dataService.createDataByScheduler();
        log.info("데이터 생성");
        String currentDate = LocalDate.now().toString();

        String directoryName = DirectoryName + currentDate;
        log.info("폴더 명 {}", directoryName);
        File directory = new File(directoryName);
        if (!directory.exists()) {
            directory.mkdir();
        }
    }
}
