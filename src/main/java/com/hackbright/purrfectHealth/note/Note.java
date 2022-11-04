package com.hackbright.purrfectHealth.note;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.hackbright.purrfectHealth.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

// @Entity: tells Spring that this class is being mapped to a data source
// @Table: set what table you want these objects to be mapped to
// @Data, @AllArgsConstructor, and @NoArgsConstructor creates our getters, setters, and constructors (Lombok)
// NOTE: @Data can have memory overhead issues in large applications, but for this it's fine
@Entity
@Table(name = "Notes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Note {
    // give our class an Id, as well as define what kind of strategy we want to use to generate those Id’s.
    // Add the @Id annotation as well as the @GeneratedValue annotation with the strategy option defined as
    // the GenerationType.IDENTITY to a private member variable called “user_id” and is of type “Long”
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "text")
    private String body;




    // constructor that accepts the associated DTO as an argument
    // contains conditional logic to help prevent null pointer exceptions
    public Note(NoteDto noteDto) {
        if (noteDto.getBody() != null) {
            this.body = noteDto.getBody();
        }
    }




    // @ManyToOne handles the table relationship to Users by creating the association within Hibernate
    // @JsonBackReference prevents infinite recursion when we deliver the resource up as JSON through
    // our RESTful API endpoint
    @ManyToOne
    @JsonBackReference
    private User user;
}