package com.hackbright.purrfectHealth.user;

import javax.transaction.Transactional;
import java.util.List;

public interface UserService {
    @Transactional
    List<String> addUser(UserDto userDto);

    // user authentication
    List<String> userLogin(UserDto userDto);

    // finds user by id
    UserDto findUser(Long id);
}
