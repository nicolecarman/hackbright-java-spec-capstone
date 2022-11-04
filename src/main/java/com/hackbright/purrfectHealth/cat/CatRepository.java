package com.hackbright.purrfectHealth.cat;

import com.hackbright.purrfectHealth.note.Note;
import com.hackbright.purrfectHealth.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CatRepository extends JpaRepository<Cat, Long> {
    List<Cat> findAllByClient_id(Long clientId);
}