package com.ssafy.cadang.domain;

import com.ssafy.cadang.repository.DataRepository;
import com.ssafy.cadang.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@SpringBootTest
@Transactional
//@Rollback(false)
class DataTest {

    @Autowired
    private DataRepository dataRepository;
    @Autowired
    private UserRepository userRepository;


    @Test
    public void test() {

        List<User> all = userRepository.findAll();

        User user = all.get(0);
        System.out.println(user.getUserName());
        Data data = new Data(user);
        dataRepository.save(data);




    }

}