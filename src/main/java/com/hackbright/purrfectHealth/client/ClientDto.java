package com.hackbright.purrfectHealth.client;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDto implements Serializable {
    private Long id;
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private String state;
    private String zipcode;
    private String phone;
    private String email;



    public ClientDto(Client client) {
        // if the values received are NOT null (excluding client_id),
        // they will be saved to the appropriate variable
        if (client.getId() != null) {
            this.id = client.getId();
        }
        if (client.getFirstName() != null) {
            this.firstName = client.getFirstName();
        }
        if (client.getLastName() != null) {
            this.lastName = client.getLastName();
        }
        if (client.getAddress() != null) {
            this.address = client.getAddress();
        }
        if (client.getCity() != null) {
            this.city = client.getCity();
        }
        if (client.getState() != null) {
            this.state = client.getState();
        }
        if (client.getZipcode() != null) {
            this.zipcode = client.getZipcode();
        }
        if (client.getPhone() != null) {
            this.phone = client.getPhone();
        }
        if (client.getEmail() != null) {
            this.email = client.getEmail();
        }
    }
}