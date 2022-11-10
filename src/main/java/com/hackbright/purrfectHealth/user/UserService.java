package com.hackbright.purrfectHealth.user;

import javax.transaction.Transactional;
import java.util.List;

public interface UserService {
    @Transactional
    List<String> addUser(UserDto userDto);


    List<String> userLogin(UserDto userDto);


    UserDto findUser(Long id);
}
