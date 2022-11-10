package com.hackbright.purrfectHealth.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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



    @PostMapping("/add-client")
    public void addClient(@RequestBody ClientDto clientDto) {
        clientService.addClient(clientDto);
    }



    @GetMapping
    public List<ClientDto> findAllClients(ClientDto clientDto) {
        return clientService.findAllClients(clientDto);
    }



    @GetMapping(path="/options")
    public List<Map> htmlOptions() {
        List<Map> response = new LinkedList<>();

        for (Client client: clientRepository.findAll()) {
            response.add(client.getOptionFormat());
        }
        return response;
    }



    @GetMapping("/{clientId}")
    public ClientDto findClientById(@PathVariable Long clientId) {
        return clientService.findClientById(clientId);
    }



    @DeleteMapping("/{clientId}")
    public void deleteClientById(@PathVariable Long clientId) {
        clientService.deleteClientById(clientId);
    }
}
