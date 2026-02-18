import axios from "axios";

const instance = axios.create({
  baseURL: "https://listarweb-api.onrender.com",
});

export default instance;
