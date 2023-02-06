package com.ssafy.cadang.auth;


import com.ssafy.cadang.domain.User;
import com.ssafy.cadang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


//http://localhost:8080/login => 여기서 동작을 안한다.(필터를 만들어줘야함)
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String memberId) throws UsernameNotFoundException {
        User userEntity = userRepository.findByMemberId(memberId);

        return new PrincipalDetails(userEntity);
    }
}
