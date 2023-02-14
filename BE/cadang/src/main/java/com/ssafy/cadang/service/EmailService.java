package com.ssafy.cadang.service;

public interface EmailService {
    void sendSignupMessage(String to) throws Exception;

    void sendChangePassMessage(String to) throws Exception;
}
