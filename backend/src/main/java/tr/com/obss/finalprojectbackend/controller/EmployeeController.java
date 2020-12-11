package tr.com.obss.finalprojectbackend.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.finalprojectbackend.model.Job;
import tr.com.obss.finalprojectbackend.service.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
@AllArgsConstructor
public class EmployeeController {

    private EmployeeService service;


    @GetMapping
    public String testUser(){
        return "hello employee";
    }

   /* @GetMapping("/getJobs")
    public List<Job> getJobs(@RequestBody String status){
        System.out.println("HERE :  " + status );
        return service.getJobsByStatus(status);
    }*/


    @PostMapping("/getJobs")
    public List<Job> getJobs(@RequestBody String status){
        System.out.println("HERE :  " + status );
        return service.getJobsByStatus(status);
    }
    @GetMapping("/getJobs2")
    public List<Job> getJobs2(){

        return service.getJobsByStatus("open");
    }

    @PostMapping("/applyJob")
    public Job applyJob(@RequestBody long jobId){
        return service.applyJob(jobId);
    }

    @PostMapping("/searchJob")
    public List<Job> searchJob(@RequestBody String name){
        return service.searchJob(name);
    }

    @GetMapping("/getAppliedJobs")
    public List<Job> getappliedJobs(){
        return service.getAppliedJobs();
    }

    @GetMapping("/getHiredJobs")
    public List<Job> getHiredJobs(){
        return service.getHiredJobs();
    }
    /*
    @GetMapping("/searchJob")
    public List<Job> searchJob(@RequestBody String name){
        return service.searchJob(name);
    }
*/
}
