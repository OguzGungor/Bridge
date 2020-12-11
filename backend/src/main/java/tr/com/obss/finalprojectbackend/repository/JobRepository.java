package tr.com.obss.finalprojectbackend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import tr.com.obss.finalprojectbackend.model.Job;
import tr.com.obss.finalprojectbackend.model.User;

import java.util.List;

public interface JobRepository extends CrudRepository<Job, Long> {

    List<Job> findAll();
    List<Job> findAllByStatus(@Param("Status") String status);
    List<Job> findAllByHiringCompany_Id(@Param("id")long id);
    List<Job> findAllByTitleContainsAndStatus(@Param("title") String name,@Param("Status")String status);
    List<Job> findAllByTitleContains(@Param("title") String name);
    List<Job> findAllByTitleContainsAndHiringCompany_IdAndStatus(@Param("title") String name,@Param("id")long id,@Param("Status")String status);
    List<Job> findAllByTitleContainsAndHiringCompany_Id(@Param("title") String name,@Param("id")long id);
    List<Job> findAllByHiringCompany_IdAndStatus(@Param("id")long id,@Param("Status")String status);
}
