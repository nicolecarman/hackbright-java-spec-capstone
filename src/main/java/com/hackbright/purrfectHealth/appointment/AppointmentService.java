package com.hackbright.purrfectHealth.appointment;

import javax.transaction.Transactional;
import java.util.List;

public interface AppointmentService {
    // add appointment
    @Transactional
    AppointmentDto addAppointment(AppointmentDto appointmentDto);


    // find all appointments
    List<AppointmentDto> findAllAppointments(AppointmentDto appointmentDto);


    // delete a note
    @Transactional
    void deleteAppointmentById(Long appointmentId);
}
