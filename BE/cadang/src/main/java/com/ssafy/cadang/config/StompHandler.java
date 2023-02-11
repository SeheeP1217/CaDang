package com.ssafy.cadang.config;

import com.ssafy.cadang.jwt.JwtAuthorizationFilter;
import com.ssafy.cadang.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if(accessor.getCommand() == StompCommand.CONNECT) {
            System.out.println("최초 SOCKET 연결 시 StompHandler 도착");
            System.out.println(accessor.getFirstNativeHeader("Authorization").substring(7));
            
            // 토큰 검증
            if(!jwtTokenProvider.validateToken(accessor.getFirstNativeHeader("Authorization").substring(7)))
                throw new AccessDeniedException("토큰이 유효하지 않습니다");
        }
        return message;
    }

}
