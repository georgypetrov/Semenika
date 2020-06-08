<template>
<div>
    <CRow class="apply-container"> 
      <CCol sm="12" md="6">
      <h3
      class ="label-header-text"
      >Моите етикети</h3>
      </CCol>
      <CCol class="col-sm-12 col-md-6">
        <div style="margin: 30px 0px; float:right">
            <router-link 
            class="label-apply-btn" 
            :to="{ path: '/userapply'}" 
            replace
            >Подай заявление за етикети</router-link>
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
import SemenikaTable from '@/views/tables/SemenikaTable';


export default {
  name: 'UserLabels',
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
<style>



</style>