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

// @Entity: tells Spring that this class is being mapped to a data source
// @Table: set what table you want these objects to be mapped to
// @Data, @AllArgsConstructor, and @NoArgsConstructor creates our getters, setters, and constructors (Lombok)
// NOTE: @Data can have memory overhead issues in large applications, but for this it's fine
@Entity
@Table(name = "Clients")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Client {
    // give our class an Id, as well as define what kind of strategy we want to use to generate those Id’s.
    // Add the @Id annotation as well as the @GeneratedValue annotation with the strategy option defined as
    // the GenerationType.IDENTITY to a private member variable called “user_id” and is of type “Long”
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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