package tr.com.obss.finalprojectbackend.service;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.obss.finalprojectbackend.repository.RoleRepository;
import tr.com.obss.finalprojectbackend.repository.UserRepository;

import java.util.*;

@AllArgsConstructor
@Service
public class CommonService  {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;
/*
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;


    public List<Book> getBooks(String name){
        if(name.equals("non")) {
            return bookRepository.findAll();
        }else{
            return bookRepository.findAllByNameContaining(name);
        }
    }

    public List<Author> getAuthors(String name){
        if(name.equals("non")) {
            return authorRepository.findAll();
        }else{
            return authorRepository.findAllByNameContaining(name);
        }
    }

    public Book getBook(long id){
        return bookRepository.findById(id);
    }

*/


}

