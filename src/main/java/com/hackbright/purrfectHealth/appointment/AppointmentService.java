package com.hackbright.purrfectHealth.appointment;

import javax.transaction.Transactional;
import java.util.List;

public interface AppointmentService {
    @Transactional
    AppointmentDto addAppointment(AppointmentDto appointmentDto);


    List<AppointmentDto> findAllAppointments(AppointmentDto appointmentDto);


    @Transactional
    void deleteAppointmentById(Long appointmentId);
}
