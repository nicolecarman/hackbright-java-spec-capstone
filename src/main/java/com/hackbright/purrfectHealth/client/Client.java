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



    // constructor that accepts the associated DTO as an argument
    // contains conditional logic to help prevent null pointer exceptions
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




    // @OneToMany is the other half of the relationship to Cats within Hibernate
    // @JsonManagedReference to handle other half of mitigating infinite recursion when we
    // deliver the resource up as JSON through our RESTful API endpoint
    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    @ToString.Exclude
    // We are going to make use of a Java Data Structure called a Set to act as the container for our Cats.
    // The reason we chose a Set is because each item within a Set is unique. This will prevent two copies of
    // an Cat from being added in and taking up excess space in your application.
    // NOTE: HAD TO ADD THE LINE OF CODE BELOW OR IT WOULDN'T ACCEPT THE ANNOTATIONS ABOVE.
    // DOES IT MAKE SENSE TO HAVE A SET FOR A CLIENT'S CATS?
    private Set<Cat> catSet = new HashSet<>();



    // @OneToMany is the other half of the relationship to Appointments within Hibernate
    // @JsonManagedReference to handle other half of mitigating infinite recursion when we
    // deliver the resource up as JSON through our RESTful API endpoint
    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    @ToString.Exclude
    // We are going to make use of a Java Data Structure called a Set to act as the container for our Cats.
    // The reason we chose a Set is because each item within a Set is unique. This will prevent two copies of
    // an Cat from being added in and taking up excess space in your application.
    // NOTE: HAD TO ADD THE LINE OF CODE BELOW OR IT WOULDN'T ACCEPT THE ANNOTATIONS ABOVE.
    // DOES IT MAKE SENSE TO HAVE A SET FOR A CLIENT'S CATS?
    private Set<Appointment> appointmentSet = new HashSet<>();



    // client dropdown on add appointment form in add-appointment.html
    // This is the format for our key value pairs from client table in database
    // Using this in client controller to loop through data
    public Map getOptionFormat() {
        Map optionFormat = new LinkedHashMap();

        optionFormat.put("text",this.firstName + " " + this.lastName);
        optionFormat.put("value",this.id);

        return optionFormat;
    }
}