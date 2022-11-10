package com.hackbright.purrfectHealth.cat;

import javax.transaction.Transactional;
import java.util.List;

public interface CatService {
    @Transactional
    CatDto addCat(CatDto catDto);


    CatDto findCat(Long id);


    List<CatDto> findAllCats(CatDto catDto);


    @Transactional
    void deleteCatById(Long catId);
}
