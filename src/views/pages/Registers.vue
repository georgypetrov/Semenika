<template>
<div>
    <div class="apply-container">        
        <h3
        class ="label-header-text"        
        >Публичен национален електронен регистър на лицата, които търгуват с посевен или посадъчен материал</h3>        
        <div class="admin-registers-container" v-if="isAdmin === true">
            <router-link to="/registers/createtrademeterialregister">
            <button 
              class="label-apply-btn"               
              >Добавяне на нов запис
            </button>
            </router-link>
        </div>
        
        <semenika-registers-table></semenika-registers-table>        
    </div>
</div>
</template>
<script>
import SemenikaRegistersTable from '@/views/tables/SemenikaRegistersTable';
import { mapGetters } from "vuex";
export default {
  name: 'Registers',
  components: {
      SemenikaRegistersTable,      
  },
  data () {
    return {
        // isAdmin: false,        
    }
  },
  computed:{
    ...mapGetters("Auth", ["isAdmin"])
  },
  methods: {

  }
}
</script>
<style>
.admin-registers-container{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 15px;
}
</style>