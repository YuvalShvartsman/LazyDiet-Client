import axios from "axios";

const db = axios.create({
  baseURL: "http://localhost:3000", // Set the base URL
});

export default db;
