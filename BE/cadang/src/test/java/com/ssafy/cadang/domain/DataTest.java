package com.ssafy.cadang.domain;

import com.ssafy.cadang.repository.DataRepository;
import com.ssafy.cadang.service.DataService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.Optional;

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
    public void selectByWeekDate() {
        PageRequest pageRequest = PageRequest.of(0, 7);
        Page<Data> byUserAndDate = dataRepository.findWeekDataByUserAndDate(LocalDate.of(2023, 1, 28), 1L, pageRequest);
        for (Data data : byUserAndDate) {
            System.out.println(data.getRegDate());
        }

    }

    @Test
    public void selectOneByDate() {
        LocalDate date = LocalDate.of(2023, 1, 28);
        Data data = dataRepository.findByUserAndDate(date, 1L);
        assertThat(data.getRegDate()).isEqualTo(date);
    }

}