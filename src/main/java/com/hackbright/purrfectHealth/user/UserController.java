package com.hackbright.purrfectHealth.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;



    // This adds a user to the Credential table
    // Let’s create a method that will handle POST requests to be able to register a User. Create a public method that
    // returns a List<String> called addUser that accepts an argument of type CredentialDto called “credentialDto”
    @PostMapping("/register")
    public List<String> addUser(@RequestBody UserDto userDto){
        String passHash = passwordEncoder.encode(userDto.getPassword());
        // hashes incoming password so that we don't unintentionally save a raw password to our DB
        userDto.setPassword(passHash);
        return userService.addUser(userDto);
    }



    // logs in a user
    @PostMapping("/login")
    public List<String> userLogin(@RequestBody UserDto userDto){
        return userService.userLogin(userDto);
    }



    // finds user by id
    @GetMapping("/{userId}")
    public UserDto findById(@PathVariable Long userId) {
        return userService.findUser(userId);
    }
}
