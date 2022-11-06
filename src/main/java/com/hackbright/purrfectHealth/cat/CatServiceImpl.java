package com.hackbright.purrfectHealth.cat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CatServiceImpl implements CatService {
    @Autowired
    private CatRepository catRepository;



    // finds cat by id
    @Override
    public CatDto findCat(Long id) {
        Cat cat = catRepository.findById(id).get();

        // constructor
        CatDto catDto = new CatDto(cat);
        return catDto;
    }
}