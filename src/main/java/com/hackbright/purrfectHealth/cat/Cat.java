package com.hackbright.purrfectHealth.cat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hackbright.purrfectHealth.appointment.Appointment;
import com.hackbright.purrfectHealth.client.Client;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
@Table(name = "Cats")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cat {
    // give our class an Id, as well as define what kind of strategy we want to use to generate those Id’s.
    // Add the @Id annotation as well as the @GeneratedValue annotation with the strategy option defined as
    // the GenerationType.IDENTITY to a private member variable called “user_id” and is of type “Long”
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private Long age;

    @Column
    private String gender;

    @Column
    private String breed;

    @Column
    private String pattern;

    @Column
    private String color;

    @Column
    private Boolean altered;

    @Column
    private String vaccine;
    @Column
    private String photo;



    // This is the format for our key value pairs from client table in database
    // Using this in client controller to loop through data
    public Map getOptionFormat() {
        Map optionFormat = new LinkedHashMap();

        optionFormat.put("text",this.name);
        optionFormat.put("value",this.id);

        return optionFormat;
    }



    // @OneToMany is the other half of the relationship to Appointments within Hibernate
    // @JsonManagedReference to handle other half of mitigating infinite recursion when we
    // deliver the resource up as JSON through our RESTful API endpoint
    @OneToMany(mappedBy = "cat", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    // We are going to make use of a Java Data Structure called a Set to act as the container for our Appointments.
    // The reason we chose a Set is because each item within a Set is unique. This will prevent two copies of
    // an Appointment from being added in and taking up excess space in your application.
    // NOTE: HAD TO ADD THE LINE OF CODE BELOW OR IT WOULDN'T ACCEPT THE ANNOTATIONS ABOVE.
    // DO I NEED THIS LINE OF CODE IN BOTH USERS AND CATS (CLASSES IN ENTITIES)?
    private Set<Appointment> appointmentSet = new HashSet<>();



    // @ManyToOne handles the table relationship to Clients by creating the association within Hibernate
    // @JsonBackReference prevents infinite recursion when we deliver the resource up as JSON through
    // our RESTful API endpoint
    @ManyToOne
    @JsonBackReference
    private Client client;
}