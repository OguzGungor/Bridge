package tr.com.obss.finalprojectbackend.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.finalprojectbackend.model.User;
import tr.com.obss.finalprojectbackend.service.GuestService;

import java.util.List;

@RestController
@RequestMapping("/guest")
@AllArgsConstructor
public class GuestController {

    private GuestService service;

    @GetMapping()
    public String getRole(){
        return "hi";
    }
/*
    @GetMapping("/getBooks")
    public List<Book> getBooks(@RequestParam(value = "name",required = false,defaultValue = "non") String name){

        return service.getBooks(name);
    }


    @GetMapping("/getAuthors")
    public List<Author> getAuthors(@RequestParam(value = "name",required = false , defaultValue = "non") String name){

        return service.getAuthors(name);
    }

    @GetMapping("/getBook")
    public Book getBook(@RequestParam(value = "id",required = true) long id){
        return service.getBook(id);
    }
*/
    //
    @PostMapping("/register")
    public User addUser( @RequestBody User user){
        /*System.out.println("Name : " + user.getUsername());
        System.out.println("Password : " + user.getEncryptedPassword());
        */
        //return user;
        //return "hi register";
        return service.addUser(user);
    }
}
