<template>
<div>
    <CRow class="apply-container"> 
      <CCol md="6">
      <h3
      class ="label-header-text"
      >Преглед на етикети</h3>
      </CCol>
      <CCol class="col-md-4 offset-md-2">
        <div style="margin: 30px 0px; float:right">
            <router-link 
            class="label-apply-btn " 
            :to="{ path: '/adminissue'}" 
            replace
            >издай нов етикети</router-link>
        </div>
      </CCol>
      <CCol md="12"
      class="">
      <hr 
      class="in-dash-line">
      <semenika-table></semenika-table>
      </CCol>
    </CRow> 
</div>
</template>
<script>
// import DemoTable from '@/views/tables/DemoTable';
import SemenikaTable from '@/views/tables/SemenikaTable';

export default {
  name: 'AdminLabels',
  components: {
      SemenikaTable,
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>