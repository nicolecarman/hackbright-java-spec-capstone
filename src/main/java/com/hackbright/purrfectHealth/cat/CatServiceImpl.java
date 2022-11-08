package com.hackbright.purrfectHealth.cat;

import com.hackbright.purrfectHealth.client.Client;
import com.hackbright.purrfectHealth.client.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CatServiceImpl implements CatService {
    @Autowired
    private CatRepository catRepository;

    @Autowired
    private ClientRepository clientRepository;



    // add cat
    @Override
    @Transactional
    public CatDto addCat(CatDto catDto) {
        Cat cat = new Cat(catDto);

        Optional<Client> clientOptional = clientRepository.findById(catDto.getClientId());
        cat.setClient(clientOptional.get());

        return new CatDto(catRepository.saveAndFlush(cat));
    }



    // finds cat by id
    @Override
    public CatDto findCat(Long id) {
        Cat cat = catRepository.findById(id).get();

        // constructor
        CatDto catDto = new CatDto(cat);
        return catDto;
    }



    @Override
    // GET all cats
    public List<CatDto> findAllCats(CatDto catDto) {
        List<Cat> catList = catRepository.findAll();
        return catList.stream().map(cat -> new CatDto(cat)).collect(Collectors.toList());
    }



    // delete a cat
    @Override
    @Transactional
    public void deleteCatById(Long catId) {
        Optional<Cat> catOptional = catRepository.findById(catId);
        catOptional.ifPresent(cat -> catRepository.delete(cat));
    }
}