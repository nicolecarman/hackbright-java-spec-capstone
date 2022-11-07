package com.hackbright.purrfectHealth.cat;


import javax.transaction.Transactional;
import java.util.List;

public interface CatService {
    // add appointment
    @Transactional
    CatDto addCat(CatDto catDto);


    // finds cat by id
    CatDto findCat(Long id);


    // gets all cats
    List<CatDto> findAllCats(CatDto catDto);


    // delete a cat
    @Transactional
    void deleteCatById(Long catId);
}
