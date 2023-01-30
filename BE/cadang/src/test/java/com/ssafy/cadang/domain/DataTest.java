package com.ssafy.cadang.domain;

import com.ssafy.cadang.dto.data.WeekDataDto;
import com.ssafy.cadang.repository.DataRepository;
import com.ssafy.cadang.service.DataService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.as;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
//@Rollback(false)
class DataTest {

    @Autowired
    private DataService dataService;
    @Autowired
    private DataRepository dataRepository;
    @PersistenceContext
    private EntityManager em;


    @Test
    public void dataCreateTest() {

        Long save = dataService.createData(1L);
        em.flush();
        em.clear();
        Optional<Data> byId = dataRepository.findById(save);

        assertThat(byId.orElse(null).getId()).isEqualTo(save);
        assertThat(byId.orElse(null).getRegDate()).isEqualTo(LocalDate.of(2023, 1, 29));

    }

//    @Test
//    public void dateDummyCreate() {
//        for (int i = 1; i <= 30; i++) {
//            dataService.createDataByRegDate(1L, LocalDate.of(2023, 1, i));
//        }
//    }


    @Test
    public void weekDataService() {
        WeekDataDto dataByWeek = dataService.getDataByWeek(LocalDate.of(2023, 1, 12), 1L);
        assertThat(dataByWeek.getThisWeekGraphDto().getWeekDataList().size()).isEqualTo(7);
        assertThat(dataByWeek.getThisWeekCaffe()).isEqualTo(42);
    }

    @Test
    public void selectOneByDate() {
        LocalDate date = LocalDate.of(2023, 1, 3);
        Optional<Data> data = dataRepository.findByUserAndDate(date, 1L);
        assertThat(data.orElse(null).getRegDate()).isEqualTo(date);
    }

}