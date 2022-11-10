package com.hackbright.purrfectHealth.appointment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;



    @GetMapping
    public List<AppointmentDto> findAllAppointments(AppointmentDto appointmentDto) {
        return appointmentService.findAllAppointments(appointmentDto);
    }



    @PostMapping("/add-appointment")
    public AppointmentDto addAppointment(@RequestBody AppointmentDto appointmentDto) {
        return appointmentService.addAppointment(appointmentDto);
    }



    @DeleteMapping("/{appointmentId}")
    public void deleteAppointmentById(@PathVariable Long appointmentId) {
        appointmentService.deleteAppointmentById(appointmentId);
    }
}
