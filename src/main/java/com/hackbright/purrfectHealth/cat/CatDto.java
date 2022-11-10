package com.hackbright.purrfectHealth.cat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CatDto implements Serializable {
    private Long id;
    private String name;
    private String age;
    private String gender;
    private String breed;
    private String pattern;
    private String color;
    private String altered;
    private String vaccine;
    private String notes;
    private Long clientId;



    public CatDto(Cat cat) {
        if (cat.getId() != null) {
            this.id = cat.getId();
        }
        if (cat.getName() != null) {
            this.name = cat.getName();
        }
        if (cat.getAge() != null) {
            this.age = cat.getAge();
        }
        if (cat.getGender() != null) {
            this.gender = cat.getGender();
        }
        if (cat.getBreed() != null) {
            this.breed = cat.getBreed();
        }
        if (cat.getPattern() != null) {
            this.pattern = cat.getPattern();
        }
        if (cat.getColor() != null) {
            this.color = cat.getColor();
        }
        if (cat.getAltered() != null) {
            this.altered = cat.getAltered();
        }
        if (cat.getVaccine() != null) {
            this.vaccine = cat.getVaccine();
        }
        if (cat.getNotes() != null) {
            this.notes = cat.getNotes();
        }
        if (cat.getClient().getId() != null) {
            this.clientId = cat.getClient().getId();
        }
    }
}