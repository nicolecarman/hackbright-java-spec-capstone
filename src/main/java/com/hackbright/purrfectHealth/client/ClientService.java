package com.hackbright.purrfectHealth.client;

import com.hackbright.purrfectHealth.appointment.AppointmentDto;

import javax.transaction.Transactional;
import java.util.List;

public interface ClientService {
    // add client
    //@Transactional
    //ClientDto addClient(ClientDto clientDto);


    // finds client by id
    ClientDto findClient(Long id);


    // gets all clients
    List<ClientDto> findAllClients(ClientDto clientDto);


    // delete a client
    @Transactional
    void deleteClientById(Long clientId);
}
