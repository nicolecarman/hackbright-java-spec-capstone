package com.hackbright.purrfectHealth.appointment;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.hackbright.purrfectHealth.cat.Cat;
import com.hackbright.purrfectHealth.client.Client;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Table(name = "Appointments")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column
    private String date;
    @Column
    private String time;
    @Column
    private String type;
    @Column(columnDefinition = "varchar(1000)")
    private String notes;




    // constructor that accepts the associated DTO as an argument
    // contains conditional logic to help prevent null pointer exceptions
    public Appointment(AppointmentDto appointmentDto) {
        if (appointmentDto.getDate() != null) {
            this.date = appointmentDto.getDate();
        }
        if (appointmentDto.getTime() != null) {
            this.time = appointmentDto.getTime();
        }
        if (appointmentDto.getType() != null) {
            this.type = appointmentDto.getType();
        }
        if (appointmentDto.getNotes() != null) {
            this.notes = appointmentDto.getNotes();
        }
    }




    // @ManyToOne handles the table relationship to Cats by creating the association within Hibernate
    // @JsonBackReference prevents infinite recursion when we deliver the resource up as JSON through
    // our RESTful API endpoint
    @ManyToOne
    @JsonBackReference
    private Cat cat;



    // @ManyToOne handles the table relationship to Clients by creating the association within Hibernate
    // @JsonBackReference prevents infinite recursion when we deliver the resource up as JSON through
    // our RESTful API endpoint
    @ManyToOne
    @JsonBackReference
    private Client client;
}