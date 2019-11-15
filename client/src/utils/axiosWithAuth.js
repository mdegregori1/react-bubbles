import axios from "axios";

const axiosWithAuth = () => {
    return axios.create({
      headers: {
        authorization: localStorage.getItem("token")
      }
    });
  };

  export default axiosWithAuth;