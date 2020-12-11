package tr.com.obss.finalprojectbackend.service;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import tr.com.obss.finalprojectbackend.model.Role;
import tr.com.obss.finalprojectbackend.model.User;
import tr.com.obss.finalprojectbackend.repository.RoleRepository;
import tr.com.obss.finalprojectbackend.repository.UserRepository;

import java.util.*;

@AllArgsConstructor
@Service
public class GuestService  {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public User addUser(User user){
        //return user;
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        user.setEncryptedPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        Set<Role> temp = new HashSet<>();
        for (Role r : user.getRoles()) {
            temp.add(roleRepository.findByRole(r.getAuthority()).orElseThrow());
        }
        user.setRoles(temp);
        if(user.getId()!= null) {
            if (userRepository.findById(user.getId()).get() != null) {
                User tempUser = userRepository.findById(user.getId()).get();/*
                user.setReadList(tempUser.getReadList());
                user.setFavorites(tempUser.getFavorites());*/
                user.setImage(tempUser.getImage());
            }
        }

        return userRepository.save(user);
    }


}

