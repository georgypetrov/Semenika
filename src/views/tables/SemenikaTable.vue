<template>
    <CCardBody>
        <CDataTable
          class="semenika-table"
          :items="semenikaData"
          :fields="fields"  
          items-per-page-select
          :items-per-page="10"
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
import semenikaData from '../users/LabelsData' ;
// eslint-disable-next-line no-unused-vars
const fields = [
  { label: "Номер на етикети", key: 'number', _style:'width:20%;' },
  { label: "Вид", key: 'kind', _style:'width:50%;'},
  { label: "Статус", key: 'status', _style:'width:20%;' },
  { label: "Действие", key: 'activity', _style:'width:10%;' },
]

export default {
  name: 'SemenikaTable',
  data () {
    return {
        semenikaData: semenikaData.map((item, id) => { return {...item, id}}),
        fields
        
    }
  },
  methods: {

  },
}
</script>
<style>


</style>