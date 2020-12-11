package tr.com.obss.finalprojectbackend.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Set;



@Entity
@Table(name="jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String image;

    private String title;

    private String description;

    private String status;

    private int quota;

    private int employeeCount;


    @ManyToMany(mappedBy = "applied_jobs")
    @JsonIgnoreProperties({"applied_jobs","hired_jobs","open_jobs"})
    private Set<User> applied_users;

    @ManyToMany(mappedBy = "hired_jobs")
    @JsonIgnoreProperties({"applied_jobs","hired_jobs","open_jobs"})
    private Set<User> hired_users;
/*
    @ManyToMany(mappedBy = "open_jobs")
    @JsonIgnoreProperties({"applied_jobs","hired_jobs","open_jobs"})
    private Set<User> hiring_company;*/

    @ManyToOne
    @JoinColumn(name="company_id",nullable = false)
    @JsonIgnoreProperties({"applied_jobs","hired_jobs","open_jobs"})
    private User hiringCompany;

    /*@ManyToMany(mappedBy = "favorites")
    @JsonIgnoreProperties({"favorites","readList"})
    private Set<User> faved_users;

    @ManyToMany(mappedBy = "readList")
    @JsonIgnoreProperties({"favorites","readList"})
    private Set<User> read_list_users;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "Authors_Books",
            joinColumns = {@JoinColumn(name = "BOOK_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name = "AUTHOR_ID", referencedColumnName = "ID")})
    @JsonIgnoreProperties("books")
    private Set<Author> authors;
*/
    public void setHiringCompany(User company){
        this.hiringCompany = company;
    }

    public User getHiring_company() {
        return hiringCompany;
    }

    public void setApplied_users(Set<User> applied_users) {
        this.applied_users = applied_users;
    }

    public Set<User> getApplied_users() {
        return applied_users;
    }

    public Set<User> getHired_users() {
        return hired_users;
    }

    public void setHired_users(Set<User> hired_users) {
        this.hired_users = hired_users;
    }

    public int getEmployeeCount() {
        return employeeCount;
    }

    public int getQuota() {
        return quota;
    }

    public void setEmployeeCount(int employeeCount) {
        this.employeeCount = employeeCount;
    }

    public void setQuota(int quota) {
        this.quota = quota;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setImage(String image) {
        this.image = image;
    }
    public void setDescription(String description){
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public String getImage() {
        return image;
    }
}
