package com.hackbright.purrfectHealth.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clients")
public class ClientController {
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private ClientService clientService;



    // This finds all clients from client repository, adds them to a list, and returns them
    // in the format created in client entities (getOptionFormat())
    @GetMapping(path="/options")
    public List<Map> htmlOptions() {
        List<Map> response = new LinkedList<>();

        for (Client client: clientRepository.findAll()) {
            response.add(client.getOptionFormat());
        }
        return response;
    }



    // finds client by id
    @GetMapping("/{clientId}")
    public ClientDto findById(@PathVariable Long clientId) {
        return clientService.findClient(clientId);
    }
}
