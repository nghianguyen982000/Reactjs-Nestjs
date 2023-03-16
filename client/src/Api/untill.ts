import axios from "axios";

const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // axios.interceptors.response.use(
    //   (response) => response,
    //   (error) => {
    //     if (error.response.status === 401) {
    //       // Redirect the user to the login page or refresh the authentication token
    //       window.location.href = "/login"; // Replace with the login page URL
    //     }
    //     return Promise.reject(error);
    //   }
    // );
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
