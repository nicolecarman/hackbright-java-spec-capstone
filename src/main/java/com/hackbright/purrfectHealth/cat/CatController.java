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



    @PostMapping("/add-cat")
    public void addCat(@RequestBody CatDto catDto) {
        catService.addCat(catDto);
    }



    @GetMapping
    public List<CatDto> findAllCats(CatDto catDto) {
        return catService.findAllCats(catDto);
    }



    @GetMapping(path="/options")
    public List<Map> htmlOptions(@RequestParam Long clientId) {
        List<Map> response = new LinkedList<>();

        for (Cat cat: catRepository.findAllByClient_id(clientId)) {
            response.add(cat.getOptionFormat());
        }
        return response;
    }



    @GetMapping("/{catId}")
    public CatDto findById(@PathVariable Long catId) {
        return catService.findCat(catId);
    }



    @DeleteMapping("/{catId}")
    public void deleteCatById(@PathVariable Long catId) {
        catService.deleteCatById(catId);
    }
}
