package com.hackbright.purrfectHealth.note;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.hackbright.purrfectHealth.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "Notes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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