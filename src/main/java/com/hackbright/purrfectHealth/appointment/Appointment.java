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



    @ManyToOne
    @JsonBackReference
    private Cat cat;



    @ManyToOne
    @JsonBackReference
    private Client client;




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
}