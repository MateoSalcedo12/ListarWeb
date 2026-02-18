import axios from "axios";

const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";
const baseURL = isLocalhost ? "http://localhost:3000" : "https://listarweb-api.onrender.com";

const instance = axios.create({ baseURL });

export default instance;
