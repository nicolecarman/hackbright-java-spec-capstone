package com.hackbright.purrfectHealth.appointment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDto implements Serializable {
    private Long id;
    private String date;
    private String time;
    private String type;
    private String notes;
    private Long clientId;
    private Long catId;



    public AppointmentDto(Appointment appointment) {
        // if the values received are NOT null (excluding appointment_id),
        // they will be saved to the appropriate variable
        if (appointment.getId() != null) {
            this.id = appointment.getId();
        }
        if (appointment.getDate() != null) {
            this.date = appointment.getDate();
        }
        if (appointment.getTime() != null) {
            this.time = appointment.getTime();
        }
        if (appointment.getType() != null) {
            this.type = appointment.getType();
        }
        if (appointment.getNotes() != null) {
            this.notes = appointment.getNotes();
        }
        if (appointment.getClient().getId() != null) {
            this.clientId = appointment.getClient().getId();
        }
        if (appointment.getCat().getId() != null) {
            this.catId = appointment.getCat().getId();
        }
    }
}
