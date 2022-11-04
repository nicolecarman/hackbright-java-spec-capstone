package com.hackbright.purrfectHealth.appointment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;



    // GET all appointments
    @GetMapping
    public List<AppointmentDto> findAllAppointments(AppointmentDto appointmentDto) {
        return appointmentService.findAllAppointments(appointmentDto);
    }



    // Add appointment
    @PostMapping("/add-appointment")
    public AppointmentDto addAppointment(@RequestBody AppointmentDto appointmentDto) {
        return appointmentService.addAppointment(appointmentDto);
    }



    // delete an appointment
    @DeleteMapping("/{appointmentId}")
    public void deleteAppointmentById(@PathVariable Long appointmentId) {
        appointmentService.deleteAppointmentById(appointmentId);
    }



    // update an appointment
    @PutMapping("/update-appointment")
    public AppointmentDto updateAppointment(@RequestBody AppointmentDto appointmentDto) {
        return appointmentService.updateAppointmentById(appointmentDto);
    }
}
