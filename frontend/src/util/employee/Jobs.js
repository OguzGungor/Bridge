import axios from "axios";

export const applyJob = (id) => {
  var data = JSON.stringify(id);

    var config = {
      method: 'post',
      url: 'http://localhost:9090/api/employee/applyJob',
      headers: { 
        'Content-Type': 'application/json'
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

export const getAppliedJobs = () =>{
  var config = {
    method: 'get',
    url: 'http://localhost:9090/api/employee/getAppliedJobs',
    headers: { 
    },
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

export const getHiredJobs = () =>{
  var config = {
    method: 'get',
    url: 'http://localhost:9090/api/employee/getHiredJobs',
    headers: { 
    },
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

/*export const getJobDetails = (id) => {

}*/

export const addFavBook = (id) => {
  var data = JSON.stringify(id);

  var config = {
    method: "post",
    url: "http://localhost:9090/api/user/addFavBook",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
    withCredentials: true,
  };

  return axios(config)
    .then(function (response) {
      return "done";
    })
    .catch(function (error) {
      return "not done : " + error;
    });
};

export const addReadBook = (id) => {
  var data = JSON.stringify(id);

  var config = {
    method: "post",
    url: "http://localhost:9090/api/user/addReadBook",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
    withCredentials: true,
  };

  return axios(config)
    .then(function (response) {
      return "done";
    })
    .catch(function (error) {
      return "not done : " + error;
    });
};

export const getFavBooks = () => {
  return axios
    .get("http://localhost:9090/api/user/getFavBooks", {
      withCredentials: true,
    })
    .then((result) => {
      return result.data.map((book) => ({
        id: `${book.id}`,
        name: `${book.name}`,
        author: `${book.authors[0].name}`,
        image : `${book.image}`
      }));
    });
};

export const getReadBooks = () => {
  return axios
    .get("http://localhost:9090/api/user/getReadBooks", {
      withCredentials: true,
    })
    .then((result) => {
      return result.data.map((book) => ({
        id: `${book.id}`,
        name: `${book.name}`,
        author: `${book.authors[0].name}`,
        image : `${book.image}`
      }));
    });
};

export const removeFavBook = (id) => {
  var data = JSON.stringify(id);

  var config = {
    method: "post",
    url: "http://localhost:9090/api/user/removeFavBook",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
    withCredentials: true,
  };

  return axios(config)
    .then(function (response) {
      return "done";
    })
    .catch(function (error) {
      return "not done" + error;
    });
};


export const removeReadBook = (id) => {
  var data = JSON.stringify(id);

  var config = {
    method: "post",
    url: "http://localhost:9090/api/user/removeReadBook",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
    withCredentials: true,
  };

  return axios(config)
    .then(function (response) {
      return "done";
    })
    .catch(function (error) {
      return "not done" + error;
    });
};