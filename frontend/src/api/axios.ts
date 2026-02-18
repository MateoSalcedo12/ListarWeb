import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:3000" : "https://listarweb-api.onrender.com");

const instance = axios.create({ baseURL });

export default instance;
