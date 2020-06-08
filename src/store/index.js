import Vue from 'vue'
import Vuex from 'vuex'
import Auth from "./modules/auth";
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "production";

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  asideShow: false,
  darkMode: false
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  toggle (state, variable) {
    state[variable] = !state[variable]
  }
}

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    Auth
  },
  strict: debug
})