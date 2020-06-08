import Repository from "./Repository";
import axios from "axios";
import store from "../store";

const resource = "/trademeterialregister";
export default {
  index() {
    return Repository.get(resource);
  },
  // get(id) {
  //   return Repository.get(resource + "/" + id);
  // },
  create(payload) {
    return Repository.post(resource, payload);
  },
  update(id, payload) {
    return Repository.post(`${resource}/${id}`, payload);
  },
  delete(id) {
    return Repository.delete(`${resource}/${id}`);
  },
  updateRegistersLinks(id, payload){
    return Repository.post("/registerslinks/"+id, payload)
  },
  registerslinks(){
    return Repository.get("/registerslinks")
  }
};
