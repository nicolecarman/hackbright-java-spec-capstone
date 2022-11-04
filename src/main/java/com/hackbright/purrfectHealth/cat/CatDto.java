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
    private Long age;
    private String gender;
    private String breed;
    private String pattern;
    private String color;
    private Boolean altered;
    private String vaccine;
    private String photo;



    public CatDto(Cat cat) {
        // if the values received are NOT null (excluding cat_id),
        // they will be saved to the appropriate variable
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
        if (cat.getPhoto() != null) {
            this.photo = cat.getPhoto();
        }
    }
}