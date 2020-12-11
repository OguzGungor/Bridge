package tr.com.obss.finalprojectbackend.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;


@Entity
@Table(name="users")
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String image;

    private String username;
    private String encryptedPassword;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "USER_ROLES",
            joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name = "ROLE_ID", referencedColumnName = "role")})
    Set<Role> roles = new HashSet<>();


    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "Applied_Jobs",
            joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name = "JOB_ID", referencedColumnName = "ID")})
    @JsonIgnoreProperties("applied_users")
    Set<Job> applied_jobs = new HashSet<>();

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "Hired_Jobs",
            joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name = "JOB_ID", referencedColumnName = "ID")})
    @JsonIgnoreProperties("hired_users")
    Set<Job> hired_jobs = new HashSet<>();


   /* @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "Open_Jobs",
            joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name = "JOB_ID", referencedColumnName = "ID")})
    @JsonIgnoreProperties("hiring_company")
    Set<Job> open_jobs = new HashSet<>();*/

   @OneToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER,mappedBy = "hiringCompany")
   @JsonIgnoreProperties("hiringCompany")
   Set<Job> open_jobs = new HashSet<>();




/*
    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "ReadList_User_Books",
            joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name = "BOOK_ID", referencedColumnName = "ID")})
    @JsonIgnoreProperties("read_list_users")
    Set<Book> readList = new HashSet<>();
*/
/*

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "Favorite_User_Books",
            joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name = "BOOK_ID", referencedColumnName = "ID")})
    @JsonIgnoreProperties("faved_users")
    Set<Book> favorites = new HashSet<>();

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "ReadList_User_Books",
            joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name = "BOOK_ID", referencedColumnName = "ID")})
    @JsonIgnoreProperties("read_list_users")
    Set<Book> readList = new HashSet<>();*/

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getPassword() {
        return encryptedPassword;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEncryptedPassword(String encryptedPassword) {
        this.encryptedPassword = encryptedPassword;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public Long getId() {
        return id;
    }

    public String getEncryptedPassword() {
        return encryptedPassword;
    }

   /* public Set<Job> getOpen_jobs() {
        return open_jobs;
    }*/

    public void setOpen_jobs(Set<Job> open_jobs) {
        this.open_jobs = open_jobs;
    }

    public Set<Job> getApplied_jobs() {
        return applied_jobs;
    }

    public void setApplied_jobs(Set<Job> applied_jobs) {
        this.applied_jobs = applied_jobs;
    }

    public Set<Job> getHired_jobs() {
        return hired_jobs;
    }

    public void setHired_jobs(Set<Job> hired_jobs) {
        this.hired_jobs = hired_jobs;
    }

    /*
                            public Set<Book> getFavorites() {
                                return favorites;
                            }

                            public Set<Book> getReadList() {
                                return readList;
                            }

                            public void setFavorites(Set<Book> favorites) {
                                this.favorites = favorites;
                            }

                            public void setReadList(Set<Book> readList) {
                                this.readList = readList;
                            }
                        */
    public void setImage(String image) {
        this.image = image;
    }

    public String getImage() {
        return image;
    }
}