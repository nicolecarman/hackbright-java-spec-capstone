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



    // method for user registration
    // any time you are saving something to the database, you should include the @Transactional annotation,
    // which ensures that the transaction that gets opened with your datasource gets resolved
    @Override
    @Transactional
    public List<String> addUser(UserDto userDto){
        List<String> response = new ArrayList<>();
        User user = new User(userDto);
        userRepository.saveAndFlush(user);
        response.add("http://localhost:8080/login.html");
        return response;
    }



    // method for user authentication
    @Override
    public List<String> userLogin(UserDto userDto) {
        List<String> response = new ArrayList<>();

        // Optionals are a way to avoid null pointer exceptions, which will break code and crash the app.
        // We can think of Optionals as a box, and the box can be either empty or have something in it.
        // The compiler doesn't care if it's empty or full -- it just needs to know it's a box.
        Optional<User> userOptional = userRepository.findByUsername(userDto.getUsername());

        // We can perform conditional logic and check to see if â€œuserOptionalâ€ is present by using the â€œisPresentâ€ method
        // available with Optionals. After we know itâ€™s present, we can check if the password matches the hash.
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



    // finds user by id
    @Override
    public UserDto findUser(Long id) {
        User user = userRepository.findById(id).get();

        // constructor
        UserDto userDto = new UserDto(user);
        return userDto;
    }
}