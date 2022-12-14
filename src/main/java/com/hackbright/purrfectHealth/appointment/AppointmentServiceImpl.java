package com.hackbright.purrfectHealth.appointment;

import com.hackbright.purrfectHealth.cat.Cat;
import com.hackbright.purrfectHealth.cat.CatRepository;
import com.hackbright.purrfectHealth.client.Client;
import com.hackbright.purrfectHealth.client.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private CatRepository catRepository;
    @Autowired
    private ClientRepository clientRepository;



    @Override
    @Transactional
    public AppointmentDto addAppointment(AppointmentDto appointmentDto) {
        Appointment appointment = new Appointment(appointmentDto);

        Optional<Client> clientOptional = clientRepository.findById(appointmentDto.getClientId());
        Optional<Cat> catOptional = catRepository.findById(appointmentDto.getCatId());

        appointment.setClient(clientOptional.get());
        appointment.setCat(catOptional.get());

        return new AppointmentDto(appointmentRepository.saveAndFlush(appointment));
    }



    public List<AppointmentDto> findAllAppointments(AppointmentDto appointmentDto) {
        List<Appointment> appointmentList = appointmentRepository.findAll();
        return appointmentList.stream().map(appointment -> new AppointmentDto(appointment)).collect(Collectors.toList());
    }



    @Override
    @Transactional
    public void deleteAppointmentById(Long appointmentId) {
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(appointmentId);
        appointmentOptional.ifPresent(appointment -> appointmentRepository.delete(appointment));
    }
}
