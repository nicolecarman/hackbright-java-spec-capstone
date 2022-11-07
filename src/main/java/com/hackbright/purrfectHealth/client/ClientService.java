package com.hackbright.purrfectHealth.client;

import javax.transaction.Transactional;
import java.util.List;

public interface ClientService {
    // finds client by id
    ClientDto findClient(Long id);


    // gets all clients
    List<ClientDto> findAllClients(ClientDto clientDto);


    // delete a client
    @Transactional
    void deleteClientById(Long clientId);
}
