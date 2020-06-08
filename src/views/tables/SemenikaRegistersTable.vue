<template>
    <CCardBody>
        <CDataTable
          class="semenika-table"
          :items="registersData"
          :fields="fields"
          column-filter
          items-per-page-select
          :items-per-page="10"
          :table-filter="{ external: true, lazy: false, placeholder: 'Филтриране на резултатите', label: 'Search:'}"
          hover
          :sorter='{ external: true, resetable: true }'
          pagination
        >
        </CDataTable>
        <template>
          <td style="margin-right:20px;">
          </td>
        </template>
    </CCardBody>
    
</template>
<script>
import registersData from '../users/RegistersData' ;
import Repository from "@/repositories/RepositoryFactory";
const RegisterRepository = Repository.get("register");
// eslint-disable-next-line no-unused-vars
const fields = [
  { label: "Номер на регистрация", key: 'reg_no', _style:'width:10%;' },
  { label: "Име/наименование на физическото или юридическото лице", key: 'name_of_legal_person', _style:'width:50%;'},
  { label: "ЕИК", key: 'eik', _style:'width:10%;' },
  { label: "Удостоверение №", key: 'cer_no', _style:'width:20%;' },
  // { label: "Действие", key: '', _style:'width:10%;' },
]

export default {
  name: 'SemenikaRegistersTable',
  data () {
    return {
        registersData: [],
        fields
        
    }
  },
  methods: {

  },
  mounted(){
    RegisterRepository.index().then(res => {
      console.log(res.data.data);
      this.registersData = res.data.data
      
    }).catch(error => {
      console.log(error);
      
    })
  }
}
</script>
<style>
