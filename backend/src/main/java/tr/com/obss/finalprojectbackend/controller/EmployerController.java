package tr.com.obss.finalprojectbackend.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.finalprojectbackend.model.Job;
import tr.com.obss.finalprojectbackend.model.User;
import tr.com.obss.finalprojectbackend.service.EmployerService;

import java.util.List;

@RestController
@RequestMapping("/api/employer")
@AllArgsConstructor
public class EmployerController {

    private EmployerService service;


    @GetMapping
    public String testUser(){
        return "hello employer";
    }


   /* @PostMapping("/addBook")
    public Book addBook( @RequestBody Book book){
        return service.addBook(book);
    }*/
    @PostMapping("/addJob")
    public Job addJob(@RequestBody Job job){

        return service.addJob(job);

    }


    @PostMapping("/openJob")
    public Job openJob(@RequestBody long id){
        return service.openJob(id);
    }

    @PostMapping("/closeJob")
    public Job closeJob(@RequestBody long id){
        return service.closeJob(id);
    }

    @GetMapping("/getCompanyJobs")
    public List<Job> getJobs(){
        return service.getJobs();
    }

    @PostMapping("/searchCompanyJobs")
    public List<Job> searchCompanyJob(@RequestBody String name){
        return service.searchCompanyJobs(name);
    }


    @PostMapping("/showCandidate")
    public User getCandidate(@RequestBody long id){
        return service.getCandidate(id);
    }

    @PostMapping("/showCandidates")
    public List<User> getCandidates(@RequestBody long jobId){
        return service.getCandidates(jobId);
    }

    @GetMapping("/getUserInfo")
    public User getUserInfo(){
        return service.getUserInfo();
    }

    @PostMapping("/hireCandidate")
    public User hireCandidate(@RequestParam long applicantId, @RequestParam long jobId){
        System.out.println(applicantId + " : " + jobId);
        //return null;
        return service.hireCandidate(applicantId,jobId);
    }

    @GetMapping("/ongoingJobs")
    public List<Job> getOnGoingJobs(){
        return service.getOnGoingJobs();
    }

    @PostMapping("/searchOngoingJobs")
    public List<Job> searchOngoingJobs(@RequestBody String name){
        return service.searchOngoingJobs(name);
    }


    @PostMapping("/showEmployees")
    public List<User> getEmployees(@RequestBody long jobId){
        return service.getEmployees(jobId);
    }

    @PostMapping("/unhireEmployee")
    public User unhireEmployee(@RequestParam long employeeId, @RequestParam long jobId){
        return service.unHire(employeeId,jobId);
    }

    @PostMapping("/removeJob")
    public List<Job> removeJob(@RequestBody long jobId){
        return service.removeJob(jobId);
    }

    @PostMapping("/getJobInfo")
    public Job getJobInfo(@RequestBody long jobId){
        return service.getJobInfo(jobId);
    }




}
