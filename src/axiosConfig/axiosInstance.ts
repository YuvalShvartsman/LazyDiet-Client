import axios from "axios";

const db = axios.create({
  baseURL: "http://localhost:3000",
});

export default db;
