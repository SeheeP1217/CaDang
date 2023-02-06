package com.ssafy.cadang.scheduler;

import com.ssafy.cadang.repository.UserRepository;
import com.ssafy.cadang.service.DataService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.File;
import java.text.SimpleDateFormat;
import java.time.LocalDate;

@Component
@EnableScheduling
@RequiredArgsConstructor
public class Scheduler {
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    private final DataService dataService;
    @Value("${EC2_FILE_PATH}")
    private String DirectoryName;

    @Scheduled(cron = "0 0 0 * * *")
    public void runTask() {
        dataService.createDataByScheduler();
        String currentDate = LocalDate.now().toString();
        String directoryName = DirectoryName + currentDate;
        System.out.println(directoryName);
        File directory = new File(directoryName);
        if (!directory.exists()) {
            directory.mkdir();
        }
    }
}
