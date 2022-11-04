package com.hackbright.purrfectHealth.cat;

import com.hackbright.purrfectHealth.client.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cats")
public class CatController {

    @Autowired
    private CatRepository catRepository;



    // This finds all clients from client repository, adds them to a list, and returns them
    // in the format created in client entities (getOptionFormat())
    @GetMapping(path="/options")
    public List<Map> htmlOptions(@RequestParam Long clientId) {
        List<Map> response = new LinkedList<>();

        for (Cat cat: catRepository.findAllByClient_id(clientId)) {
            response.add(cat.getOptionFormat());
        }
        return response;
    }
}
