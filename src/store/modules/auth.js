import Repository from "./../../repositories/RepositoryFactory";
import { Utils } from "./../../_helpers/utils";
import { Role } from "./../../_helpers/role";
const AuthRepository = Repository.get("auth");

const state = {
  user: JSON.parse(sessionStorage.getItem("user")) || "",
  token: JSON.parse(sessionStorage.getItem("token")) || "",
  roles: JSON.parse(sessionStorage.getItem("user"))
    ? Utils.filterNames(JSON.parse(sessionStorage.getItem("user")).roles) || []
    : [],
  permissions: JSON.parse(sessionStorage.getItem("user"))
    ? Utils.filterNames(
        JSON.parse(sessionStorage.getItem("user")).permissions
      ) || []
    : [],
  status: ""
};

const getters = {
  isAuthenticated: state => !!(state.user && state.token),
  accessToken: state =>
    state.token ? state.token.token_type + " " + state.token.access_token : "",
  refreshToken: state => (state.token ? state.token.refresh_token : ""),
  isAdmin: state => state.roles.includes(Role.Admin),
  user: state => state.user
};

const actions = {
  login: ({ commit, dispatch }, { email, password }) => {
    return new Promise((resolve, reject) => {
      commit("request");
      AuthRepository.login({ email, password })
        .then(async resp => {
          if (resp.data) {
            if (resp.data.status) {
              await sessionStorage.setItem(
                "user",
                JSON.stringify(resp.data.data)
              );
              await sessionStorage.setItem(
                "token",
                JSON.stringify(resp.data.data.token)
              );
              await dispatch("refreshToken", resp.data.data.token);
              await commit("success", resp);
            }
            resolve(resp);
          }
        })
        .catch(error => {
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("token");
          commit("error");
          reject(error);
        });
    });
  },
  register: ({ commit, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      commit("request");
      AuthRepository.register(payload)
        .then(async resp => {
          if (resp.data) {
            await sessionStorage.setItem(
              "user",
              JSON.stringify(resp.data.data)
            );
            await sessionStorage.setItem(
              "token",
              JSON.stringify(resp.data.data.token)
            );
            await dispatch("refreshToken", resp.data.data.token);
            await commit("success", resp);
            resolve(resp);
          }
        })
        .catch(error => {
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("token");
          commit("error");
          reject(error);
        });
    });
  },
  logout: ({ commit }) => {
    return new Promise((resolve, reject) => {
      AuthRepository.logout()
        .then(() => {
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("token");
          commit("reset");
          resolve();
        })
        .catch(error => {
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("token");
          commit("reset");
          reject(error);
        });
    });
  },
  refreshToken: ({ state, getters, commit, dispatch }, token) => {
    setInterval(() => {
      AuthRepository.refreshToken(getters.refreshToken)
        .then(newTokens => {
          console.log("refreshToken", newTokens);
          let user = JSON.parse(sessionStorage.getItem("user"));
          user.token = newTokens.data.data;
          sessionStorage.setItem("user", JSON.stringify(user));
          sessionStorage.setItem("token", JSON.stringify(newTokens.data.data));
          commit("refreshToken", newTokens.data.data);
        })
        .catch(error => {
          dispatch("logout");
        });
    }, (parseInt(token.expires_in) - 600) * 1000);
  }
};

const mutations = {
  request: state => {
    state.status = "loading";
  },
  success: (state, resp) => {
    state.status = "success";
    state.user = resp.data.data;
    state.token = resp.data.data.token;
    state.roles = Utils.filterNames(resp.data.data.roles);
    state.permissions = Utils.filterNames(resp.data.data.permissions);
  },
  reset: state => {
    state.status = "";
    state.user = "";
    state.token = "";
    state.roles = [];
    state.permissions = [];
  },
  error: state => {
    state.status = "error";
  },
  refreshToken: (state, newTokens) => {
    state.token = newTokens;
  },
  updateUserData: (state, payload) => {
    let user = state.user;
    payload.company ? (user.company = payload.company) : "";
    payload.email ? (user.email = payload.email) : "";
    payload.name ? (user.name = payload.name) : "";
    payload.permissions ? (user.permissions = payload.permissions) : "";
    payload.pin ? (user.pin = payload.pin) : "";
    payload.profile_image ? (user.profile_image = payload.profile_image) : "";
    payload.roles ? (user.roles = payload.roles) : "";
    payload.surname ? (user.surname = payload.surname) : "";
    payload.unapprove_role
      ? (user.unapprove_role = payload.unapprove_role)
      : "";
    sessionStorage.setItem("user", JSON.stringify(user));
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
