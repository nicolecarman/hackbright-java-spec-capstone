package com.hackbright.purrfectHealth.cat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cats")
public class CatController {

    @Autowired
    private CatRepository catRepository;

    @Autowired
    private CatService catService;



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



    // finds cat by id
    @GetMapping("/{catId}")
    public CatDto findById(@PathVariable Long catId) {
        return catService.findCat(catId);
    }
}
