package com.hackbright.purrfectHealth.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientServiceImpl implements ClientService {
    @Autowired
    private ClientRepository clientRepository;




    // finds client by id
    @Override
    public ClientDto findClient(Long id) {
        Client client = clientRepository.findById(id).get();

        // constructor
        ClientDto clientDto = new ClientDto(client);
        return clientDto;
    }
}
