var axios = require('axios');

export const getOfferedJobs = (name) =>{
if(name){
        var data = name;

        var config = {
          method: 'post',
          url: 'http://localhost:9090/api/employer/searchCompanyJobs',
          headers: { 
            'Content-Type': 'application/json'
          },
          withCredentials : true,
          data : data
        };
        
        return axios(config)
        .then(function (response) {
          //console.log(JSON.stringify(response.data));
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });

}else{
        var config = {
          method: 'get',
          url: 'http://localhost:9090/api/employer/getCompanyJobs',
          headers: { 
            
          },
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
}

export const closeJob = (id) => {
    var data = JSON.stringify(id);

    var config = {
    method: 'post',
    url: 'http://localhost:9090/api/employer/closeJob',
    headers: { 
        'Content-Type': 'application/json'
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

export const openJob = (id) => {
  var data = JSON.stringify(id);

  var config = {
  method: 'post',
  url: 'http://localhost:9090/api/employer/openJob',
  headers: { 
      'Content-Type': 'application/json'
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

export const getJobInfo = (id) => {

  var data = JSON.stringify(id);

  var config = {
    method: 'post',
    url: 'http://localhost:9090/api/employer/getJobInfo',
    headers: { 
      'Content-Type': 'application/json'
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

export const addJob = (values) => {
  var data;
  if(values.id){
   // alert("hi");    
   data = JSON.stringify({"id" : values.id,"title":values.title,"description":values.description,"quota":values.quota});
  }else{
    
    data = JSON.stringify({"title":values.title,"description":values.description,"quota":values.quota});

  }

    var config = {
    method: 'post',
    url: 'http://localhost:9090/api/employer/addJob',
    headers: { 
        'Content-Type': 'application/json'
    },
    withCredentials : true,
    data : data
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

export const showApplicants = (id) => {
var data = JSON.stringify(id);

var config = {
  method: 'post',
  url: 'http://localhost:9090/api/employer/showCandidates',
  headers: { 
    'Content-Type': 'application/json'
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

export const showOngoingJobs = () => {
  var config = {
    method: 'get',
    url: 'http://localhost:9090/api/employer/ongoingJobs',
    headers: { 
    },
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



export const showEmployees = (id) =>{
  var data = JSON.stringify(id);

  var config = {
    method: 'post',
    url: 'http://localhost:9090/api/employer/showEmployees',
    headers: { 
      'Content-Type': 'application/json'
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

export const removeJob = (id) => {
  var data = JSON.stringify(id);

var config = {
  method: 'post',
  url: 'http://localhost:9090/api/employer/removeJob',
  headers: { 
    'Content-Type': 'application/json'
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

export const searchOfferedJobs = (name) =>{
 

}