<template>
  <CHeader with-subheader>
    <CToggler in-header class="ml-3 d-lg-none" @click="$store.commit('toggleSidebarMobile')" />
    <CToggler in-header class="ml-3 d-md-down-none" @click="$store.commit('toggleSidebarDesktop')" />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <img
        src="img/semenika/semenika-logo.png"
        class="c-avatar-img responsive-logo"
        size="custom-size"
      />
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/labels">Етикети</CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to exact>Заявления</CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink>Разрешене и удостоверения</CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/registers">
          Регистри
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3" v-if="isAdmin">
        <CHeaderNavLink to=/users>Потребители</CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3" v-if="isAdmin">
        <CHeaderNavLink>Статистика</CHeaderNavLink>
      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav>
      <TheHeaderDropdownAccnt />
      <CHeaderNavItem class="px-3">
        <button in-header class="c-header-exit-btn" @click="exit">
          <img
            src="img/semenika/exit-arrow.png"
            class="c-avatar-img mobile-hidden"
            size="custom-size"
          />
          Изход
        </button>
      </CHeaderNavItem>
    </CHeaderNav>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt";
import {mapGetters} from "vuex"

export default {
  name: "TheHeader",
  components: {
    TheHeaderDropdownAccnt
  },
  computed:{
    ...mapGetters("Auth", ["isAdmin"])
  },
  methods: {
    async exit() {
      await this.$store.dispatch("Auth/logout");
      this.$router.push({ name: "Login" });
    }
  }
};
</script>
