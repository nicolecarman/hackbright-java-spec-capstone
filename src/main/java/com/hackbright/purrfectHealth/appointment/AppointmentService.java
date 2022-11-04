package com.hackbright.purrfectHealth.appointment;

import com.hackbright.purrfectHealth.note.NoteDto;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface AppointmentService {
    /*
    // attempt at getting all appointments
    List<AppointmentDto> getAllAppointments(AppointmentDto appointmentDto);



    //Optional<AppointmentDto> getAllAppointments(Appointment appointment);
*/



    @Transactional
    AppointmentDto addAppointment(AppointmentDto appointmentDto);




    // delete a note
    @Transactional
    void deleteAppointmentById(Long appointmentId);

    // update a note
    @Transactional
    AppointmentDto updateAppointmentById(AppointmentDto appointmentDto);

    List<AppointmentDto> findAllAppointments(AppointmentDto appointmentDto);
}
