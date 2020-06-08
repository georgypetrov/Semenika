<template>
  <div>
    <!-- User Dashboard-->
    <div v-show="isAdmin === false">
      <CRow>
        <CCol class="dash-container">
          <p class="dash-heading-text">Моите етикети</p>
          <hr class="in-dash-line" />
          <!-- table here -->
          <user-labels-table></user-labels-table>
          <button class="dash-see-all">Виж всички</button>
        </CCol>
        <CCol class="dash-container">
          <p class="dash-heading-text">Подадени заявления</p>
          <hr class="in-dash-line" />
          <!-- table here -->
          <button class="dash-see-all">Виж всички</button>
        </CCol>
      </CRow>
      <CRow>
        <CCol class="dash-container">
          <p class="dash-heading-text">Разрешения и удостоверения</p>
          <hr class="in-dash-line" />
          <!-- table here -->
          <button class="dash-see-all">Виж всички</button>
        </CCol>
        <CCol class="dash-container">
          <p class="dash-heading-text">Регистри</p>
          <hr class="in-dash-line" />
          <!-- table here -->
          <button class="dash-see-all">Виж всички</button>
        </CCol>
      </CRow>
    </div>
    <!-- Admin Dashboard-->
    <div v-show="isAdmin === true">
      <CRow>
        <CCol class="dash-container">
          <p class="dash-heading-text">Регистри</p>
          <hr />
          <!-- table here -->
          <semenika-table></semenika-table>
          <button class="dash-see-category">Виж етикетите</button>
          <button class="dash-see-all">Виж всички</button>
        </CCol>
      </CRow>
    </div>
  </div>
</template>

<script>
import UserLabelsTable from "@/views/tables/UserLabelsTable";
import SemenikaTable from "@/views/tables/SemenikaTable";
// import RepositoryFactory from "./../repositories/RepositoryFactory";
// const Auth = RepositoryFactory.get("auth");
import { mapGetters } from "vuex"
// import theTable from "@/views/tables/Table.vue"
export default {
  name: "Dashboard",
  components: {
    SemenikaTable,
    UserLabelsTable
  },
  data() {
    return {
      // isAdmin: false
    };
  },
  computed:{
    ...mapGetters("Auth", ["isAdmin"])
  },
  methods: {},
  created() {
    // setInterval(() => {
    //   Auth.user()
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }, 30000);
  }
};
</script>
<style>
</style>