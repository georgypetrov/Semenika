import axios from "axios";
import store from "../store";
// import RepositoryFactory from "./RepositoryFactory"
// const AuthRepository = RepositoryFactory.get("auth");

// You can use your own logic to set your local or production domain
const baseDomain = process.env.VUE_APP_API_URL;
// const baseDomain = "http://api.semenika.serve";
// The base URL is empty this time due we are using the jsonplaceholder API
const baseURL = `${baseDomain}`;

const instance = axios.create({
  baseURL
});

instance.interceptors.request.use( function(config) {
    const token = store.getters["Auth/accessToken"];
    config.headers = {
      'Accept': 'application/json',
      'Authorization': token
    }
    return config;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if ([401, 403].indexOf(error.response.status) !== -1) {
      store.dispatch("Auth/logout");
      // location.reload(true);
    }
    return error;
  }
);

export default instance;
