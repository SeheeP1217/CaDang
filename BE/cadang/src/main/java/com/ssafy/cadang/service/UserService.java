package com.ssafy.cadang.service;



import com.ssafy.cadang.domain.User;

import com.ssafy.cadang.dto.UserDto;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional(readOnly = false)
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //회원가입
    public void join(UserDto userDto){

        userRepository.existsByMemberId(userDto.getMemberId());
        userRepository.existsByEmail(userDto.getEmail());
        userRepository.existsByNickname(userDto.getNickname());

        //TODO: activated 필드를 만들어야 되나?

        User user = User.builder()
                        .userName(userDto.getUsername())
                        .memberId(userDto.getMemberId())
                        .password(passwordEncoder.encode(userDto.getPassword()))
                        .nickname(userDto.getNickname())
                        .authorityName("ROLE_USER")
                        .build();
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
