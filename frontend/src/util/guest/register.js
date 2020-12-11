var axios = require('axios');


export const registerRequest = (values) => {
    var data = JSON.stringify({"username" : values.name , 
    "encryptedPassword" : values.password,
    "roles":[{"role":values.role}]}
    );
    var config = {
        method: 'post',
        url: 'http://localhost:9090/guest/register',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    };
    //console.log(data);
    return axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
}

