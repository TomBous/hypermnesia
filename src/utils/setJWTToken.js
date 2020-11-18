import axios from "axios";
const setJWTToken = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = "bearer " + token;
    } else {
        delete axios.defaults.headers["Authorization"];
    }
}

export default setJWTToken;