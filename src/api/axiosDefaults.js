import axios from "axios";

axios.defaults.baseURL = "https://energyplace-be-f35f3084f662.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;