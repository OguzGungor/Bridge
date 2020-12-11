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
import java.util.Optional;
import java.util.Set;

@Service
public class EmployerService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    public List<Job> getJobs(){

        //return jobRepository.findAllByHiringCompany_Id(getUserInfo().getId());
        return jobRepository.findAllByHiringCompany_IdAndStatus(getUserInfo().getId(),"open");
    }

    public Job addJob(Job job){

        if(!jobRepository.findById((job.getId())).equals(Optional.empty())){
            Job tempJob = jobRepository.findById(job.getId()).orElseThrow();
            tempJob.setTitle(job.getTitle());
            tempJob.setDescription(job.getDescription());
            tempJob.setQuota(job.getQuota());
            job = tempJob;
            /*job.setHiringCompany(tempJob.getHiring_company());
            job.setHired_users(tempJob.getHired_users());
            job.setApplied_users(tempJob.getApplied_users());*/
        }else{
            job.setHiringCompany(getUserInfo());
            job.setEmployeeCount(0);
            job.setStatus("open");
        }
        return jobRepository.save(job);
    }

    public List<Job> getOnGoingJobs(){
        List<Job> jobList = jobRepository.findAllByHiringCompany_Id(getUserInfo().getId());
        List<Job> result = new ArrayList<>();
        for (Job j:jobList) {
            if(j.getEmployeeCount() > 0){
                result.add(j);
            }else if(j.getStatus().equals("closed")){
                result.add(j);
            }
        }
        return result;
    }

    public List<User> getEmployees(long id ){
        Set<User> temp = jobRepository.findById(id).orElseThrow().getHired_users();
        List<User> result = new ArrayList<>();
        for (User u:temp
             ) {
            result.add(u);

        }
        return result;
    }

    public List<User> getCandidates(long jobId){
        Job tempJob = jobRepository.findById(jobId).orElseThrow();
        List<User> result = new ArrayList<>();
        for (User user:tempJob.getApplied_users()) {
            result.add(user);
        }
        return result;
    }

    public Job closeJob(long id){
        if(!jobRepository.findById(id).equals(Optional.empty())){
            Job job = jobRepository.findById(id).orElseThrow();
            job.setHiringCompany(job.getHiring_company());
            job.setStatus("closed");
            return jobRepository.save(job);
        }else{
            return null;
        }
    }

    public Job openJob(long id){
        if(!jobRepository.findById(id).equals(Optional.empty())){
            Job job = jobRepository.findById(id).orElseThrow();
            job.setHiringCompany(job.getHiring_company());
            job.setStatus("open");
            return jobRepository.save(job);
        }else{
            return null;
        }
    }

    public List<Job> searchCompanyJobs(String name){
        /*List<Job> temp = jobRepository.findAllByTitleContainsAndStatus(name,"open");
        List<Job> result = new ArrayList<>();
        for (Job j:temp) {
            if(j.getHiring_company().getId() == getUserInfo().getId()){
                result.add(j);
            }
        }
        return result;*/
        return jobRepository.findAllByTitleContainsAndHiringCompany_IdAndStatus(name,getUserInfo().getId(),"open");
    }

    public List<Job> searchOngoingJobs(String name){
        List<Job> temp = jobRepository.findAllByTitleContainsAndHiringCompany_Id(name,getUserInfo().getId());
        List<Job> result = new ArrayList<>();

        for (Job j: temp) {
            if(j.getEmployeeCount() > 0){
                result.add(j);
            }else if(j.getStatus().equals("closed")){
                result.add(j);
            }
        }

        return result;
    }

    public User getCandidate(long id){
        return userRepository.findById(id).orElseThrow();
    }

    public User hireCandidate(long applicantId, long jobId){


        Job toBeHired = jobRepository.findById(jobId).orElseThrow();
        //condition check whether position is open
        if(toBeHired.getHired_users().contains(userRepository.findById(applicantId).orElseThrow())){
            return null;
        }else {
            if (toBeHired.getStatus().equals("open")) {

                Set<User> hireds = toBeHired.getHired_users();

                User hiredCandidate = userRepository.findById(applicantId).orElseThrow();
                Set<Job> hiredJobs = hiredCandidate.getHired_jobs();
                Set<Job> appliedJobs = hiredCandidate.getApplied_jobs();

                hiredJobs.add(toBeHired);
                appliedJobs.remove(toBeHired);
                hiredCandidate.setHired_jobs(hiredJobs);
                hiredCandidate.setApplied_jobs(appliedJobs);

                hireds.add(hiredCandidate);
                toBeHired.setHired_users(hireds);

                toBeHired.setEmployeeCount(toBeHired.getEmployeeCount() + 1);

                Set<User> applieds = toBeHired.getApplied_users();


                System.out.println("here!here");
                applieds.remove(hiredCandidate);
                toBeHired.setApplied_users(applieds);

                //if position is full
                if (toBeHired.getEmployeeCount() == toBeHired.getQuota()) {
                    toBeHired.setStatus("closed");
                }
                jobRepository.save(toBeHired);
                userRepository.save(hiredCandidate);

                return userRepository.findById(applicantId).orElseThrow();
            }
            return null;
        }
    }

    public User unHire(long userId, long jobId){
        Job toBeUnhired = jobRepository.findById(jobId).orElseThrow();
        User unhired = userRepository.findById(userId).orElseThrow();

        Set<User> employees = toBeUnhired.getHired_users();
        Set<Job> userJobs = unhired.getHired_jobs();

        userJobs.remove(toBeUnhired);
        unhired.setHired_jobs(userJobs);

        employees.remove(unhired);
        toBeUnhired.setHired_users(employees);
        if(toBeUnhired.getEmployeeCount()>0) {
            toBeUnhired.setEmployeeCount(toBeUnhired.getEmployeeCount() - 1);
        }
        toBeUnhired.setStatus("open");


        jobRepository.save(toBeUnhired);
        userRepository.save(unhired);

        return userRepository.findById(userId).orElseThrow();

    }



    public User getUserInfo(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //return principal;


        long userId = ((User)principal).getId();
        User user = userRepository.findById(userId).orElseThrow();


        return user;
    }

    public List<Job> removeJob(long jobId){
        Job toBeRemoved = jobRepository.findById(jobId).orElseThrow();
        for (User u:toBeRemoved.getApplied_users()
             ) {
            Set<Job> appliedJobs = u.getApplied_jobs();
            appliedJobs.remove(toBeRemoved);
            u.setApplied_jobs(appliedJobs);
            userRepository.save(u);
        }
        for (User u:toBeRemoved.getHired_users()
        ) {
            Set<Job> hiredJobs = u.getHired_jobs();
            hiredJobs.remove(toBeRemoved);
            u.setHired_jobs(hiredJobs);
            userRepository.save(u);
        }
        jobRepository.deleteById(jobId);
        return getJobs();
    }

    public Job getJobInfo(long jobId){
        return jobRepository.findById(jobId).orElseThrow();
    }

}
