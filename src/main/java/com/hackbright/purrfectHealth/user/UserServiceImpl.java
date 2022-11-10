package com.hackbright.purrfectHealth.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;



    @Override
    @Transactional
    public List<String> addUser(UserDto userDto){
        List<String> response = new ArrayList<>();

        User user = new User(userDto);

        userRepository.saveAndFlush(user);
        response.add("http://localhost:8080/login.html");

        return response;
    }




    @Override
    public List<String> userLogin(UserDto userDto) {
        List<String> response = new ArrayList<>();

        Optional<User> userOptional = userRepository.findByUsername(userDto.getUsername());


        if (userOptional.isPresent()){
            if (passwordEncoder.matches(userDto.getPassword(), userOptional.get().getPassword())){
                response.add("http://localhost:8080/dashboard.html");
                response.add(String.valueOf(userOptional.get().getId()));
            } else {
                response.add("Username or password incorrect");
            }
        } else {
            response.add("Username or password incorrect");
        }
        return response;
    }



    @Override
    public UserDto findUser(Long id) {
        User user = userRepository.findById(id).get();

        UserDto userDto = new UserDto(user);

        return userDto;
    }
}