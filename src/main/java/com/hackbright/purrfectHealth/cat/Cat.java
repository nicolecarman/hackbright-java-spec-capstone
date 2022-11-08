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


@Entity
@Table(name = "Cats")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String name;

    @Column
    private String age;

    @Column
    private String gender;

    @Column
    private String breed;

    @Column
    private String pattern;

    @Column
    private String color;

    @Column
    private String altered;

    @Column
    private String vaccine;
    @Column(columnDefinition = "varchar(500)")
    private String notes;



    // constructor that accepts the associated DTO as an argument
    // contains conditional logic to help prevent null pointer exceptions
    public Cat(CatDto catDto) {
        if (catDto.getName() != null) {
            this.name = catDto.getName();
        }
        if (catDto.getAge() != null) {
            this.age = catDto.getAge();
        }
        if (catDto.getGender() != null) {
            this.gender = catDto.getGender();
        }
        if (catDto.getBreed() != null) {
            this.breed = catDto.getBreed();
        }
        if (catDto.getPattern() != null) {
            this.pattern = catDto.getPattern();
        }
        if (catDto.getColor() != null) {
            this.color = catDto.getColor();
        }
        if (catDto.getAltered() != null) {
            this.altered = catDto.getAltered();
        }
        if (catDto.getVaccine() != null) {
            this.vaccine = catDto.getVaccine();
        }
        if (catDto.getNotes() != null) {
            this.notes = catDto.getNotes();
        }
    }



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