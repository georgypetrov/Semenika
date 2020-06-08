<template>
  <!-- <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  > -->
    <!-- <template #toggler> -->
    <!-- <template #toggler> -->
      <!-- <CHeaderNavLink>
        <div class="profile-avatar">
          <img
            src="img/semenika/avatar-placeholder.png"
            class="profile-avatar-img"
          />
        </div>
        <span id="user-names">{{ user.name + " " + user.surname }}</span>
      </CHeaderNavLink>
    </template> -->

    <!-- <CDropdownItem>
      <CIcon name="cil-settings" /> Settings
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem>
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem> -->
  <!-- </CDropdown> -->
   <CHeaderNavLink to="/myprofile">
        <div class="profile-avatar">
          <img
            :src="user.profile_image ? user.profile_image : 'img/semenika/avatar-placeholder.png'"
            class="profile-avatar-img"
          />
        </div>
        <span id="user-names">{{ user.name + " " + user.surname }}</span>
      </CHeaderNavLink>
</template>

<script>
import {mapGetters } from "vuex"
export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      itemsCount: 2
    }
  },
  computed:{
    ...mapGetters("Auth", ["user"])
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
  #user-names:after{
    content: '\\/';
    color: black;
    margin-left: 3px;
    position: relative;
    bottom: 5px;
    font-size: 9px;
  }
</style>