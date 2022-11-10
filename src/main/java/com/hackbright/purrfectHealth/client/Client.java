package com.hackbright.purrfectHealth.client;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hackbright.purrfectHealth.appointment.Appointment;
import com.hackbright.purrfectHealth.cat.Cat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

@Entity
@Table(name = "Clients")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column
    private String firstName;
    @Column
    private String lastName;

    @Column
    private String address;

    @Column
    private String city;

    @Column
    private String state;

    @Column
    private String zipcode;

    @Column
    private String phone;

    @Column
    private String email;



    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    @ToString.Exclude
    private Set<Cat> catSet = new HashSet<>();



    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    @ToString.Exclude
    private Set<Appointment> appointmentSet = new HashSet<>();




    public Client(ClientDto clientDto) {
        if (clientDto.getFirstName() != null) {
            this.firstName = clientDto.getFirstName();
        }
        if (clientDto.getLastName() != null) {
            this.lastName = clientDto.getLastName();
        }
        if (clientDto.getAddress() != null) {
            this.address = clientDto.getAddress();
        }
        if (clientDto.getCity() != null) {
            this.city = clientDto.getCity();
        }
        if (clientDto.getState() != null) {
            this.state = clientDto.getState();
        }
        if (clientDto.getZipcode() != null) {
            this.zipcode = clientDto.getZipcode();
        }
        if (clientDto.getPhone() != null) {
            this.phone = clientDto.getPhone();
        }
        if (clientDto.getEmail() != null) {
            this.email = clientDto.getEmail();
        }
    }



    public Map getOptionFormat() {
        Map optionFormat = new LinkedHashMap();

        optionFormat.put("text",this.firstName + " " + this.lastName);
        optionFormat.put("value",this.id);

        return optionFormat;
    }
}