package com.ssafy.cadang.service;


import com.ssafy.cadang.util.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@Service
public class EmailServiceImpl implements EmailService{


    @Autowired
    private final JavaMailSender javaMailSender;

    private final RedisUtil redisUtil;

    public EmailServiceImpl(JavaMailSender javaMailSender, RedisUtil redisUtil) {
        this.javaMailSender = javaMailSender;
        this.redisUtil = redisUtil;
    }

//    public static final String ePw = createKey();

    private void sendCodeMessage(String email, String authKey) throws Exception{

        // 이전에 전송을 눌러서 키가 남아있는 경우
        // 이전 키를 삭제해준다.
        if (redisUtil.getData(email) != null) {
            redisUtil.deleteData(email);
        }

        String title = "카당 회원가입 인증번호가 발송되었습니다.";
        String text = "회원가입을 위한 인증번호는 " + authKey + " 입니다. <br/>";
        System.out.println(email + " " + authKey);
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");
            helper.setTo(email); // 보내는 대상
            helper.setSubject(title); // 제목
            helper.setText(text, true); // 내용
            helper.setFrom(new InternetAddress("drinkornot808@gmail.com","admin")); // 보내는 사람
            // 유효시간(5분) 동안 {email,authKey} 저장
            // key: 이메일, value: 인증번호
            // 5L: 만료시간 5분
            redisUtil.setDataExpire(email, authKey, 60 * 5L);
            javaMailSender.send(mimeMessage);

        } catch (MessagingException e) {
            e.printStackTrace();
        }



    }


    public static String createKey(){
        Random random = new Random();
        String authKey = String.valueOf(random.nextInt(888888) + 111111);

        return authKey;
    }

    @Override
    public void sendMessage(String to) throws Exception {
        // 수신자이메일과 키를 같이 보낸다.
        // 동시에 redis에 키,데이터가 저장이된다
        sendCodeMessage(to,createKey());

    }

    public Boolean verifyEmail(String email, String input) throws ChangeSetPersister.NotFoundException{
        String authKey = redisUtil.getData(email);

        // Todo: 인증번호가 틀리거나 인증 기간이 만료되었을시 예외처리
        if (authKey == null) {
            return false;
        }
        if (!authKey.equals(input)) {
            return false;
        }
        // 인증이 성공하면 key value를 삭제한다.
        redisUtil.deleteData(email);
        return true;
    }


}
