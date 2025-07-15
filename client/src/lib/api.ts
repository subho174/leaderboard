import axios from "axios";

// setup for writing backend endpoints with ease while fecthing
const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

export default API;
