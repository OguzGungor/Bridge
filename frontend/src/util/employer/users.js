var axios = require('axios');

export const getCandidate  = (id) => {
    var data = JSON.stringify(id);

var config = {
  method: 'post',
  url: 'http://localhost:9090/api/employer/showCandidate',
  headers: { 
    'Content-Type': 'application/json', 
  },
  data : data,
  withCredentials : true
};

return axios(config)
.then(function (response) {
  //console.log(JSON.stringify(response.data));
  return response.data;
})
.catch(function (error) {
  console.log(error);
});

}

export const hireCandidate = (userid,jobid) =>{
    var FormData = require('form-data');
    var data = new FormData();
    data.append('applicantId', userid);
    data.append('jobId ', jobid);

    var config = {
    method: 'post',
    url: 'http://localhost:9090/api/employer/hireCandidate',
    headers: { 
    },
    data : data,
    withCredentials : true
    };

    return axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
        return response.data;
    })
    .catch(function (error) {
    console.log(error);
    });
}


export const unhireEmployee = (userid,jobid) =>{

  var FormData = require('form-data');
  var data = new FormData();
  data.append('employeeId', userid);
  data.append('jobId', jobid);

  var config = {
    method: 'post',
    url: 'http://localhost:9090/api/employer/unhireEmployee',
    headers: { 
    },
    data : data,
    withCredentials : true
  };

  return axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
}