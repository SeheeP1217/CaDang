package com.ssafy.cadang.service;


import com.ssafy.cadang.domain.User;

import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    //회원가입
    public void join(User user){


        userRepository.save(user);

    }

    @Transactional(readOnly = true)
    public void validateDuplicateUserId(User user){
        boolean userIdDuplicate = userRepository.existsByMemberId(user.getMemberId());
        if(userIdDuplicate){
            throw new IllegalStateException("이미 존재하는 아이디입니다");
        }
    }

    @Transactional(readOnly = true)
    public void validateDuplicateEmail(User user){
        boolean userEmailDuplicate = userRepository.existsByEmail(user.getEmail());
        if(userEmailDuplicate){
            throw new IllegalStateException("이미 존재하는 이메일입니다");
        }
    }

    @Transactional(readOnly = true)
    public void validateDuplicateNickname(User user){
        boolean userNicknameDuplicate = userRepository.existsByNickname(user.getNickname());
        if(userNicknameDuplicate){
            throw new IllegalStateException("이미 존재하는 닉네임입니다");
        }
    }


}
