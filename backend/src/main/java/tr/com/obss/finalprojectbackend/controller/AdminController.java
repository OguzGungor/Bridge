package tr.com.obss.finalprojectbackend.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.finalprojectbackend.model.User;
import tr.com.obss.finalprojectbackend.service.AdminService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
public class AdminController {

    private AdminService service;

    @PostMapping
    public String testRole(){
        /*Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = "null";
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        } else {
            username = principal.toString();
        }
        String roles = "";
        //Set temp = (UserDetails)principal).getAuthorities();*/


        return "hi ";
    }

    @GetMapping
    public String testAdmin(){
        return "hello admin";
    }

    @PostMapping("/addUser")
    public String addUser( @RequestBody User user){
        //System.out.println("test");
        //return user.getUsername();
        return service.addUser(user).getUsername();
    }
/*
    @PostMapping("/addBook")
    public Book addBook( @RequestBody Book book){
        return service.addBook(book);
    }

    @PostMapping("/addAuthor")
    public Author addAuthor( @RequestBody Author author){
        return service.addAuthor(author);
    }
*/
    @GetMapping("/getUsers")
    public List<User> getUsers(@RequestParam(value = "name", required = false, defaultValue = "non") String name){
        return service.getUsers(name);
    }
/*
    @PostMapping("/removeBook")
    public String removeBook(@RequestBody long id){
        return service.removeBook(id);
    }
*/
    @PostMapping("/removeUser")
    public String removeUser(@RequestBody long id){
        return service.removeUser(id);
    }

    @GetMapping("/getUser")
    public User getUser(@RequestParam(value = "id",required = true) long id){
        return service.getUser(id);
    }



}
