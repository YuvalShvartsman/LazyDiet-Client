import axios from "axios";

export const BASE_URL = "http://localhost:3000";

const db = axios.create({
  baseURL: BASE_URL,
});

export default db;
