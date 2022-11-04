package com.hackbright.purrfectHealth.user;

import javax.transaction.Transactional;
import java.util.List;

public interface UserService {
    // method for user registration
    // any time you are saving something to the database, you should include the @Transactional annotation,
    // which ensures that the transaction that gets opened with your datasource gets resolved
    @Transactional
    List<String> addUser(UserDto userDto);

    // method for user authentication
    List<String> userLogin(UserDto userDto);

    // finds user by id
    UserDto findUser(Long id);
}
