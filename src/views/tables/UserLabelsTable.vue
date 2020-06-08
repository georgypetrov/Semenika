<template>
    <CCardBody>
        <CDataTable
          class="semenika-table"
          :items="UserLabelsData"
          :fields="fields"
          column-filter
          :table-filter="{ external: true, lazy: false, placeholder: 'Номер на етикет', label: 'Search:'}"
          :striped = "true"
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
import UserLabelsData from '../users/UserLabelsData' ;
// eslint-disable-next-line no-unused-vars
const fields = [
  { label: "Номер на етикети", key: 'number', _style:'width:70%;' },
  { label: "Вид", key: 'batch', _style:'width:30%;'},
]

export default {
  name: 'UserLabelsTable',
  data () {
    return {
        UserLabelsData: UserLabelsData.map((item, id) => { return {...item, id}}),
        fields
        
    }
  },
  methods: {

  },
}
</script>
<style>
.table-striped tbody tr:nth-of-type(even) > td{
  background-color: #f5f5f5;
}

</style>