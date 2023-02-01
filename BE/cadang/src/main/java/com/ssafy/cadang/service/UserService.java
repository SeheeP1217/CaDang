package com.ssafy.cadang.service;



import com.ssafy.cadang.domain.User;

import com.ssafy.cadang.dto.UserDto;
import com.ssafy.cadang.file.FileStore;
import com.ssafy.cadang.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;


@Service
@Transactional(readOnly = false)
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${USER_PROFILE_PATH}")
    private String UserProfileImgPath;
    @Value("${DEFAULT_PROFILE_PATH}")
    private String DefaultProfileImgPath;

    public String getFullPath(String imgPath,String filename){
        return imgPath + filename;
    }

    // 카페인, 당 목표량 디폴트 값 설정
    private final Long defaultCaffeineGoal = 400L;
    private final Long defaultSugarGoal = 25L;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //회원가입
    //Todo: @ModelAttribute을 UserDto 앞에 붙여야 되나?
    //Todo: IOException 대신 사용할 만한 Exception?
    public void join(UserDto userDto) throws IOException {
        MultipartFile multipartFile;

        validateDuplicateUserId(userDto);
        validateDuplicateEmail(userDto);
        validateDuplicateNickname(userDto);

        User user = new User();
        log.info("debugging: " + userDto.getImg());

        //TODO: builder() 할 때 activated 필드를 만들어야 되나?

        // 프로필 이미지를 설정한 경우
        if (!userDto.getImg().isEmpty()) {

            multipartFile = userDto.getImg();

            String originalFilename = multipartFile.getOriginalFilename();
            String storeFilename = createStoreFileName(originalFilename);
            String storedPath = getFullPath(UserProfileImgPath,storeFilename);
            multipartFile.transferTo(new File(storedPath));

            user = User.builder()
                    .userName(userDto.getUsername())
                    .memberId(userDto.getMemberId())
                    .password(passwordEncoder.encode(userDto.getPassword()))
                    .email(userDto.getEmail())
                    .nickname(userDto.getNickname())
                    .authorityName("ROLE_USER")
                    .caffeGoal(defaultCaffeineGoal)
                    .sugarGoal(defaultSugarGoal)
                    .imgUrl(storedPath)
                    .build();
        // 프로필 이미지를 설정하지 않은 경우
        }else{

            user = User.builder()
                    .userName(userDto.getUsername())
                    .memberId(userDto.getMemberId())
                    .password(passwordEncoder.encode(userDto.getPassword()))
                    .email(userDto.getEmail())
                    .nickname(userDto.getNickname())
                    .authorityName("ROLE_USER")
                    .caffeGoal(defaultCaffeineGoal)
                    .sugarGoal(defaultSugarGoal)
                    .imgUrl(DefaultProfileImgPath)
                    .build();

        }

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


    // 서버에 저장할 파일명을 만든다.
    private String createStoreFileName(String originalFilename) {
        String ext = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    // 원본 파일의 확장자를 반환한다.
    private String extractExt(String originalFilename){
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }


}
