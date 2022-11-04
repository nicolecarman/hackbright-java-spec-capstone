package com.hackbright.purrfectHealth.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto implements Serializable {
    private Long id;
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private String state;
    private String zipcode;
    private String phone;
    private String email;
    private String username;
    private String password;



    public UserDto(User user) {
        // if the values received are NOT null (excluding user_id),
        // they will be saved to the appropriate variable
        if (user.getId() != null) {
            this.id = user.getId();
        }
        if (user.getFirstName() != null) {
            this.firstName = user.getFirstName();
        }
        if (user.getLastName() != null) {
            this.lastName = user.getLastName();
        }
        if (user.getAddress() != null) {
            this.address = user.getAddress();
        }
        if (user.getCity() != null) {
            this.city = user.getCity();
        }
        if (user.getState() != null) {
            this.state = user.getState();
        }
        if (user.getZipcode() != null) {
            this.zipcode = user.getZipcode();
        }
        if (user.getPhone() != null) {
            this.phone = user.getPhone();
        }
        if (user.getEmail() != null) {
            this.email = user.getEmail();
        }
        if (user.getUsername() != null) {
            this.username = user.getUsername();
        }
        if (user.getPassword() != null) {
            this.password = user.getPassword();
        }
    }
}
