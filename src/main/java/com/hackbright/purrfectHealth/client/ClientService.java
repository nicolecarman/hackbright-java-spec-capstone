package com.hackbright.purrfectHealth.client;

import javax.transaction.Transactional;
import java.util.List;

public interface ClientService {
    @Transactional
    void addClient(ClientDto clientDto);


    ClientDto findClientById(Long id);


    List<ClientDto> findAllClients(ClientDto clientDto);


    @Transactional
    void deleteClientById(Long clientId);
}
