package com.hackbright.purrfectHealth.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClientServiceImpl implements ClientService {
    @Autowired
    private ClientRepository clientRepository;




    // add client
    // @Transactional should be used any time you're saving something to the database to ensure the transaction
    // that gets opened with our datasource gets resolved
    @Override
    @Transactional
    public void addClient(ClientDto clientDto) {
        Client client = new Client(clientDto);
        clientRepository.saveAndFlush(client);
    }





    // GET all clients
    @Override
    public List<ClientDto> findAllClients(ClientDto clientDto) {
        List<Client> clientList = clientRepository.findAll();
        return clientList.stream().map(client -> new ClientDto(client)).collect(Collectors.toList());
    }



    // finds client by id
    @Override
    public ClientDto findClientById(Long id) {
        Client client = clientRepository.findById(id).get();

        // constructor
        ClientDto clientDto = new ClientDto(client);
        return clientDto;
    }



    // delete an client
    @Override
    @Transactional
    public void deleteClientById(Long clientId) {
        Optional<Client> clientOptional = clientRepository.findById(clientId);
        clientOptional.ifPresent(client -> clientRepository.delete(client));
    }
}
