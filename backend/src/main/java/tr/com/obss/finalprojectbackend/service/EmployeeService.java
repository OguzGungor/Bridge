package tr.com.obss.finalprojectbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tr.com.obss.finalprojectbackend.model.Job;
import tr.com.obss.finalprojectbackend.model.User;
import tr.com.obss.finalprojectbackend.repository.JobRepository;
import tr.com.obss.finalprojectbackend.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class EmployeeService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;


    public List<Job> getJobsByStatus(String status){

        List<Job> result = jobRepository.findAllByStatus(status);
        User temp = userRepository.findById(getUserInfo().getId()).orElseThrow();
        Set<Job> applieds = temp.getApplied_jobs();
        Set<Job> hireds = temp.getHired_jobs();
        for (Job j:applieds
             ) {
            if(result.contains(j)){
                result.remove(j);
            }
        }
        for (Job j:hireds
        ) {
            if(result.contains(j)){
                result.remove(j);
            }
        }
        return result;
    }

    public List<Job> getJobs(){

        return jobRepository.findAll();
    }

    public User getUserInfo(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //return principal;


        long userId = ((User)principal).getId();
        User user = userRepository.findById(userId).orElseThrow();


        return user;
    }

    public Job applyJob(long jobId){
        Job toBeApplied = jobRepository.findById(jobId).orElseThrow();
        Set<User> candidates = toBeApplied.getApplied_users();

        User applying = getUserInfo();
        Set<Job> appliedJobs = applying.getApplied_jobs();
        appliedJobs.add(toBeApplied);
        applying.setApplied_jobs(appliedJobs);
        candidates.add(applying);
        toBeApplied.setApplied_users(candidates);
        jobRepository.save(toBeApplied);
        userRepository.save(applying);
        return jobRepository.findById(jobId).orElseThrow();
    }

    public List<Job> searchJob(String name){

        List<Job> result = jobRepository.findAllByTitleContainsAndStatus(name,"open");
        User temp = userRepository.findById(getUserInfo().getId()).orElseThrow();
        Set<Job> applieds = temp.getApplied_jobs();
        Set<Job> hireds = temp.getHired_jobs();
        for (Job j:applieds
        ) {
            if(result.contains(j)){
                result.remove(j);
            }
        }
        for (Job j:hireds
        ) {
            if(result.contains(j)){
                result.remove(j);
            }
        }
        return result;
    }

    public List<Job> getAppliedJobs(){
        User temp = userRepository.findById(getUserInfo().getId()).orElseThrow();
        Set<Job> tempList = temp.getApplied_jobs();
        List<Job> result = new ArrayList<>();
        for (Job j: tempList) {
            result.add(j);

        };
        return result;
    }

    public List<Job> getHiredJobs(){
        User temp = userRepository.findById(getUserInfo().getId()).orElseThrow();
        Set<Job> tempList = temp.getHired_jobs();
        List<Job> result = new ArrayList<>();
        for (Job j: tempList) {
            result.add(j);

        };
        return result;
    }
    /*public Set<Book> addFavBook(long id){

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //return principal;

        Book toBeAdded = bookRepository.findById(id);
        Set<User> users = toBeAdded.getFaved_users();

        long userId = ((User)principal).getId();
        User user = userRepository.findById(userId).orElseThrow();
        Set<Book> favorites= user.getFavorites();
        favorites.add(toBeAdded);
        user.setFavorites(favorites);
        users.add(user);
        toBeAdded.setFaved_users(users);
        bookRepository.save(toBeAdded);
        userRepository.save(user);

        return userRepository.findById(userId).get().getFavorites();
    }

    public Set<Book> removeFavBook(long id){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Book toBeRemoved = bookRepository.findById(id);
        Set<User> users = toBeRemoved.getFaved_users();

        long userId = ((User)principal).getId();
        User user = userRepository.findById(userId).orElseThrow();
        Set<Book> favorites= user.getFavorites();
        favorites.remove(toBeRemoved);
        user.setFavorites(favorites);
        users.remove(user);
        toBeRemoved.setFaved_users(users);
        bookRepository.save(toBeRemoved);
        userRepository.save(user);

        return userRepository.findById(userId).get().getFavorites();
    }

    public Set<Book> getFavBooks(){

        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if(principal==null){
                return null;
            }
            //role = ((Role) ((UserDetails) principal).getAuthorities().stream().toArray()[0]).getRole();
            //role = ((Role)((List)((UserDetails)principal).getAuthorities()).get(0)).getRole();

            long userId = ((User) principal).getId();
            return userRepository.findById(userId).get().getFavorites();

        }catch(Exception ex){
            return null;
        }

    }

    public Set<Book> addReadBook(long id){

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //return principal;

        Book toBeAdded = bookRepository.findById(id);
        Set<User> users = toBeAdded.getRead_list_users();

        long userId = ((User)principal).getId();
        User user = userRepository.findById(userId).orElseThrow();
        Set<Book> readList= user.getReadList();
        readList.add(toBeAdded);
        user.setReadList(readList);
        users.add(user);
        toBeAdded.setRead_list_users(users);
        bookRepository.save(toBeAdded);
        userRepository.save(user);

        return userRepository.findById(userId).get().getReadList();
    }

    public Set<Book> removeReadBook(long id){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Book toBeRemoved = bookRepository.findById(id);
        Set<User> users = toBeRemoved.getRead_list_users();

        long userId = ((User)principal).getId();
        User user = userRepository.findById(userId).orElseThrow();
        Set<Book> readList= user.getReadList();
        readList.remove(toBeRemoved);
        user.setReadList(readList);
        users.remove(user);
        toBeRemoved.setRead_list_users(users);
        bookRepository.save(toBeRemoved);
        userRepository.save(user);

        return userRepository.findById(userId).get().getReadList();
    }

    public Set<Book> getReadBooks(){

        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if(principal==null){
                return null;
            }
            //role = ((Role) ((UserDetails) principal).getAuthorities().stream().toArray()[0]).getRole();
            //role = ((Role)((List)((UserDetails)principal).getAuthorities()).get(0)).getRole();

            long userId = ((User) principal).getId();
            return userRepository.findById(userId).get().getReadList();

        }catch(Exception ex){
            return null;
        }

    }*/
}
