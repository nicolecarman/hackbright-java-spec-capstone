package com.hackbright.purrfectHealth.client;

import com.hackbright.purrfectHealth.cat.CatDto;
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



    // Add client
    @PostMapping("/add-client")
    public void addClient(@RequestBody ClientDto clientDto) {
        clientService.addClient(clientDto);
    }



    // GET all clients
    @GetMapping
    public List<ClientDto> findAllClients(ClientDto clientDto) {
        return clientService.findAllClients(clientDto);
    }



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
    public ClientDto findClientById(@PathVariable Long clientId) {
        return clientService.findClientById(clientId);
    }



    // delete a client
    @DeleteMapping("/{clientId}")
    public void deleteClientById(@PathVariable Long clientId) {
        clientService.deleteClientById(clientId);
    }
}
