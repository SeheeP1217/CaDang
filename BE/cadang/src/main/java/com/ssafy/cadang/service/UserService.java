package com.ssafy.cadang.service;


import com.ssafy.cadang.domain.User;


import com.ssafy.cadang.dto.user.UserDto;
import com.ssafy.cadang.error.CustomException;
import com.ssafy.cadang.error.ExceptionEnum;
import com.ssafy.cadang.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import java.io.File;
import java.io.IOException;

import java.util.UUID;


@Service
@Transactional(readOnly = true)
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${EC2_PROFILE_PATH}")
    private String UserProfileImgPath;
    @Value("${DEFAULT_PROFILE_PATH}")
    private String DefaultProfileImgPath;

    private String getFullPath(String imgPath, String filename) {
        return imgPath + filename;
    }

    // 카페인, 당 목표량 디폴트 값 설정
    private final Long defaultCaffeineGoal = 400L;
    private final Long defaultSugarGoal = 25L;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;

    }

    //회원가입
    //Todo: IOException 대신 사용할 만한 Exception?
    @Transactional(readOnly = false)
    public void join(UserDto userDto) throws IOException {
        MultipartFile multipartFile;

        User user;


        //TODO: builder() 할 때 activated 필드를 만들어야 되나?


        // 프로필 이미지를 설정한 경우
        if (userDto.getImg() != null) {

            multipartFile = userDto.getImg();

            String originalFilename = multipartFile.getOriginalFilename();
            String storeFilename = createStoreFileName(originalFilename);
            String storedPath = getFullPath(UserProfileImgPath, storeFilename);
            multipartFile.transferTo(new File(storedPath));

            user = User.builder()
                    .userName(userDto.getUsername())
                    .memberId(userDto.getMemberId())
                    .password(passwordEncoder.encode(userDto.getPassword()))
                    .email(userDto.getEmail())
                    .nickname(userDto.getNickname())
                    .caffeGoal(defaultCaffeineGoal)
                    .sugarGoal(defaultSugarGoal)
                    .imgUrl(storeFilename)
                    .authorities("ROLE_USER")
                    .build();
            // 프로필 이미지를 설정하지 않은 경우
        } else {

            user = User.builder()
                    .userName(userDto.getUsername())
                    .memberId(userDto.getMemberId())
                    .password(passwordEncoder.encode(userDto.getPassword()))
                    .email(userDto.getEmail())
                    .nickname(userDto.getNickname())
                    .caffeGoal(defaultCaffeineGoal)
                    .sugarGoal(defaultSugarGoal)
                    .imgUrl(DefaultProfileImgPath)
                    .authorities("ROLE_USER")
                    .build();

        }

        userRepository.save(user);

    }


    // 서버에 저장할 파일명을 만든다.
    private String createStoreFileName(String originalFilename) {
        String ext = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    // 원본 파일의 확장자를 반환한다.

    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }


    public boolean verifyId(String memberId) {

        if (memberId.isEmpty()) {
            // 아이디를 입력해주세요
            throw new CustomException(ExceptionEnum.USER_ID_EMPTY);
        }

        if (userRepository.existsByMemberId(memberId)) {
            // 아이디가 사용중입니다.
            throw new CustomException(ExceptionEnum.USER_ID_DUPLICATED);
        }

        return true;

    }

    // 아이디 찾기
    public String findId(String username, String email) {
        if (!userRepository.existsByUserNameAndEmail(username, email)) {
            throw new CustomException(ExceptionEnum.USER_NOT_FOUND);
        }
        User user = userRepository.findByUserNameAndEmail(username, email)
                .orElseThrow(() -> new CustomException(ExceptionEnum.USER_NOT_FOUND));


        return user.getMemberId();

    }

    public boolean verifyEmail(String email) {
        if (email.isEmpty()) {

            throw new CustomException(ExceptionEnum.MAIL_VERIFY_EMPTY);
        }
        if (userRepository.existsByEmail(email)) {
            throw new CustomException(ExceptionEnum.MAIL_ALREADY_EXISTS);
        }

        return true;
    }

    public Long findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ExceptionEnum.USER_NOT_FOUND)).getId();

    }

    public boolean verifyId(String email, String memberId) {
        if (!userRepository.existsByMemberIdAndEmail(memberId, email)) {
            throw new CustomException(ExceptionEnum.USER_NOT_FOUND);
        }

        return true;
    }

    @Transactional
    public boolean updatePasswordByMemberId(Long memberId, String password) {

        //유효성 체크
        Pattern pattern = Pattern.compile("^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$");
        Matcher matcher = pattern.matcher(password);

        System.out.println(password);
        if (!matcher.matches()) throw new CustomException(ExceptionEnum.PASSWORD_NOT_VALID);


        //암호화
        String encodedPassword = passwordEncoder.encode(password);

        User user = userRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ExceptionEnum.USER_NOT_FOUND));

        user.setPassword(encodedPassword);

        return true;
    }



}
