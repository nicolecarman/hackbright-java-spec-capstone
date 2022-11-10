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



    @OneToMany(mappedBy = "cat", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    private Set<Appointment> appointmentSet = new HashSet<>();



    @ManyToOne
    @JsonBackReference
    private Client client;




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



    public Map getOptionFormat() {
        Map optionFormat = new LinkedHashMap();

        optionFormat.put("text",this.name);
        optionFormat.put("value",this.id);

        return optionFormat;
    }
}