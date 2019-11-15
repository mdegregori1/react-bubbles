import axios from "axios";

const axiosWithAuth = () => {
   console.log(Object.keys(localStorage.getItem('token')))
    return axios.create({
      headers: {
        authorization: localStorage.getItem("token")
      }
    });
  };

  export default axiosWithAuth;