import axios from "axios";
const Instance = axios.create({
  baseURL: "https://api.realworld.io/api",
  headers: {
    Authorization: `Token ${localStorage.getItem("token")}`,
  },
});

export default Instance;
