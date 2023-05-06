import axios from "axios";
axios.post("/api/getUser").then((res) => {
    console.log(res);
});