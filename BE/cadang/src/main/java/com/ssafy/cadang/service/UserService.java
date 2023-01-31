package com.ssafy.cadang.service;



import com.ssafy.cadang.domain.User;

import com.ssafy.cadang.dto.UserDto;
import com.ssafy.cadang.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
@Transactional(readOnly = false)
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final Long defaultCaffeineGoal = 400L;
    private final Long defaultSugarGoal = 25L;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //회원가입
    public void join(UserDto userDto){

        validateDuplicateUserId(userDto);
        validateDuplicateEmail(userDto);
        validateDuplicateNickname(userDto);

        //TODO: activated 필드를 만들어야 되나?
        User user = User.builder()
                        .userName(userDto.getUsername())
                        .memberId(userDto.getMemberId())
                        .password(passwordEncoder.encode(userDto.getPassword()))
                        .email(userDto.getEmail())
                        .nickname(userDto.getNickname())
                        .authorityName("ROLE_USER")
                        .caffeGoal(defaultCaffeineGoal)
                        .sugarGoal(defaultSugarGoal)
                        .build();
        userRepository.save(user);

    }

    @Transactional(readOnly = true)
    public void validateDuplicateUserId(UserDto userDto){
        boolean userIdDuplicate = userRepository.existsByMemberId(userDto.getMemberId());
        if(userIdDuplicate){
            throw new IllegalStateException("이미 존재하는 아이디입니다");
        }
    }

    @Transactional(readOnly = true)
    public void validateDuplicateEmail(UserDto userDto){
        boolean userEmailDuplicate = userRepository.existsByEmail(userDto.getEmail());
        if(userEmailDuplicate){
            throw new IllegalStateException("이미 존재하는 이메일입니다");
        }
    }

    @Transactional(readOnly = true)
    public void validateDuplicateNickname(UserDto userDto){
        boolean userNicknameDuplicate = userRepository.existsByNickname(userDto.getNickname());
        if(userNicknameDuplicate){
            throw new IllegalStateException("이미 존재하는 닉네임입니다");
        }
    }


}
