<template>
  <CRow class="apply-container">
  <h2>Подаване на онлайн заявления за издаване на етикети</h2>
    <CCol col="12" xl="12" style="padding: 0;">
      <CCard style="box-shadow:none; padding:0;">
        
        <CCardBody>
          <CDataTable
          class="semenika-table"
            
            :items="items"
            :fields="fields"
            :items-per-page="10"
            :active-page="activePage"
            :pagination="{ doubleArrows: false, align: 'center'}"
            column-filter
          >
            <!-- clickable-rows -->
            <template #name="data">
              <td>{{ `${data.item.name} ${data.item.surname}` }}</td>
            </template>
            <template #company="data">
              <td>{{ data.item.company || '' }}</td>
            </template>
            <template #roles="data">
              <td>{{ getRolesString(data.item.roles) }}</td>
            </template>
            <template #action="{item}">
              <td>
                <router-link :to="'users/'+item.id">Редактиране</router-link>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import RepositoryFactory from "@/repositories/RepositoryFactory";
const UsersRepository = RepositoryFactory.get("users");
import { Utils } from "@/_helpers/utils.js";

export default {
  name: "Users",
  data() {
    return {
      items: [],
      fields: [
        {
          label: "Потребителско име",
          key: "name",
          _classes: "font-weight-bold"
        },
        { label: "Фирма", key: "company" },
        { label: "Регистриран на:", key: "created_at" },
        { label: "Роля", key: "roles" },
        { label: "Действие", key: "action" }
      ],
      activePage: 1
    };
  },
  computed: {},
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.page) {
          this.activePage = Number(route.query.page);
        }
      }
    }
  },
  methods: {
    rowClicked(item) {
      this.$router.push({ path: `users/${item.id}` });
    },
    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },
    getRolesString(roles) {
      return Utils.filterNames(roles)
        .filter(item => {return item != "frontend"})
        .toString();
    }
  },
  async created() {
    const { data } = await UsersRepository.index();
    this.items = data.data;
  }
};
</script>
