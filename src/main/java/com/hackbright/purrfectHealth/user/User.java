package com.hackbright.purrfectHealth.user;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hackbright.purrfectHealth.appointment.Appointment;
import com.hackbright.purrfectHealth.note.Note;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

// @Entity: tells Spring that this class is being mapped to a data source
// @Table: set what table you want these objects to be mapped to
// @Data, @AllArgsConstructor, and @NoArgsConstructor creates our getters, setters, and constructors (Lombok)
// NOTE: @Data can have memory overhead issues in large applications, but for this it's fine
@Entity
@Table(name = "Users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    // give our class an Id, as well as define what kind of strategy we want to use to generate those Id’s.
    // Add the @Id annotation as well as the @GeneratedValue annotation with the strategy option defined as
    // the GenerationType.IDENTITY to a private member variable called “user_id” and is of type “Long”
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String username;

    @Column
    private String password;

    @Column
    private String firstName;

    @Column
    private String lastName;



    // constructor that accepts the associated DTO as an argument
    // contains conditional logic to help prevent null pointer exceptions
    public User(UserDto userDto) {
        if (userDto.getUsername() != null) {
            this.username = userDto.getUsername();
        }
        if (userDto.getPassword() != null) {
            this.password = userDto.getPassword();
        }
        if (userDto.getFirstName() != null) {
            this.firstName = userDto.getFirstName();
        }
        if (userDto.getLastName() != null) {
            this.lastName = userDto.getLastName();
        }
    }



    // @OneToMany is the other half of the relationship to Notes within Hibernate
    // @JsonManagedReference to handle other half of mitigating infinite recursion when we
    // deliver the resource up as JSON through our RESTful API endpoint
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    // We are going to make use of a Java Data Structure called a Set to act as the container for our Notes.
    // The reason we chose a Set is because each item within a Set is unique. This does not mean that the “body”
    // Strings can’t be duplicated, you could have two Notes that say the same thing.
    // What the Set does is prevent two copies of the Note Object from being added in and taking up excess space
    // in your application.
    private Set<Note> noteSet = new HashSet<>();
}