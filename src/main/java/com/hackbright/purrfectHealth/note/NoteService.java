package com.hackbright.purrfectHealth.note;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface NoteService {
    // add a note
    // @Transactional should be used any time you're saving something to the database to ensure the transaction
    // that gets opened with our datasource gets resolved
    // QUESTION: what's our datasource in this case?
    @Transactional
    void addNote(NoteDto noteDto, Long userId);




    // delete a note
    @Transactional
    void deleteNoteById(Long noteId);




    // update a note
    @Transactional
    void updateNoteById(NoteDto noteDto);




    // find all notes by user id
    // The method for finding all notes by User is a bit more complicated, and it requires you to stream
    // the List<Note> that gets returned from the repository into their NoteDto counterparts to be sent out.
    List<NoteDto> getAllNotesByUserId(Long userId);




    // getting a note by note id
    Optional<NoteDto> getNoteById(Long noteId);
}