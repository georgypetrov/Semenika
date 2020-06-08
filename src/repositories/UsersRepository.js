import Repository from "./Repository";
import axios from "axios";
import store from "../store";

const resource = "/users";
export default {
  index() {
    return Repository.get(resource);
  },
  get(id) {
    return Repository.get(resource + "/" + id);
  },
  create(payload) {
    return Repository.post(resource, payload);
  },
  update(id, payload) {
    return Repository.post(`${resource}/${id}`, payload);
  },
  updateImage(id, data) {
    const token = store.getters["Auth/accessToken"];
    return axios.post(
      `${process.env.VUE_APP_API_URL}${resource}/${id}`,
      data,
      {
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data",
          Authorization: token
        }
      }
    );
  },
  delete(id) {
    return Repository.delete(`${resource}/${id}`);
  }
};
