import axios from "axios";
export default axios.create({
    // baseURL: "https://afternoon-castle-40052.herokuapp.com/api",
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-type": "application/json"
    }
});