import axios from "axios";
export default axios.create({
    baseURL: process.env.VUE_APP_URL,
    // baseURL: "http://localhost:5000/api",
    headers: {
        "Content-type": "application/json"
    }
});