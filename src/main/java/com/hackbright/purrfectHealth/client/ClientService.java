package com.hackbright.purrfectHealth.client;

import javax.transaction.Transactional;
import java.util.List;

public interface ClientService {
    // add client
    @Transactional
    void addClient(ClientDto clientDto);


    // finds client by id
    ClientDto findClientById(Long id);


    // gets all clients
    List<ClientDto> findAllClients(ClientDto clientDto);


    // delete a client
    @Transactional
    void deleteClientById(Long clientId);
}
