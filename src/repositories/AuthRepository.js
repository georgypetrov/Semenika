import Repository from "./Repository";
import axios from "axios";
import store from "../store";

// const resource = "/posts";
export default {
  login({ email, password }) {
    return Repository.post("/login", { email, password });
  },
  logout() {
    return Repository.post("/logout");
  },
  register(payload) {
    return Repository.post("/register", payload);
  },
  refreshToken(token) {
    return axios.post(
      process.env.VUE_APP_API_URL + "/refreshtoken",
      {},
      {
        headers: {
          Accept: "application/json",
          Refreshtoken: token
        }
      }
    );
  },
  user() {
    return Repository.get("/user/me");
  },
  updateMe(data) {
    return Repository.post("/user/me", data);
  },
  userImageUpdate(data) {
    const token = store.getters["Auth/accessToken"];
    return axios.post(process.env.VUE_APP_API_URL + "/user/me", data, {
      headers: {
        Accept: "application/json",
        "content-type": "multipart/form-data",
        Authorization: token
      }
    });
  }
};
