<template>
    <div class="apply-container">
      <h2>Издаване на етикети</h2>
      <hr 
      class="in-dash-line">
      <CForm class="inner-aplly-container">  
        <CRow>
            <CCol sm="12" md="12">
              <h4 class="heading-text">Издал етикета:</h4>
            </CCol>
            <CCol sm="12" md="12">
              <p>Димитър Ненов, ИАСАС</p>
            </CCol>
        </CRow>
        <CRow>
          <CCol sm="12" md="12">
            <h4 class="heading-text">Брой етикети:</h4>
            <input
              type="text"
              class="form-control"
              style="margin-bottom: 1rem;"
              placeholder="Брой етикети:">
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12" md="12">
            <h4 class="heading-text">Тип на етикета</h4>
            <CSelect
              class=""
              value="Семена"
              :options="['Семена','Разсад']"
              custom
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12" md="12">
            <h4 class="heading-text">Категория</h4>
            <CSelect
              class=""
              value="Овес"
              :options="['Пшеница','Овес','Лавандула']"
              custom
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12" md="6">
          <h4 class="heading-text">Дата на издаване</h4>
          <v-date-picker
            is-indigo
            v-model="issueDate"
            :masks="{ input: ['DD/MM/YYYY'], data: ['YYYY-MM-DD']}"
            :firstDayOfWeek = "2"
            :input-props='{
              placeholder: "DD/MM/YYYY",
            }'
          />
          </CCol>
          <CCol sm="12" md="6">
          <h4>Запечатани на</h4>
          <v-date-picker
            placeholder="test"
            is-indigo
            v-model="packedDate"
            :masks="{ input: ['DD/MM/YYYY'], data: ['YYYY-MM-DD']}"
            :firstDayOfWeek = "2"
            :input-props='{
              placeholder: "DD/MM/YYYY",
            }'
          />
          </CCol>
        </CRow>
        <CRow style="margin-top:20px; margin-bottom: 1rem;">
          <CCol md="4">
            <h4>Партиден номер</h4>
            <input
              type="text"
              class="form-control">
          </CCol>
          <CCol md="4">
            <h4>Вид</h4>
            <input
              type="text"
              class="form-control">
          </CCol>
          <CCol md="4">
            <h4>Количество</h4>
            <input
              type="text"
              class="form-control">
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12" md="12">
            <h4>Нетно тегло</h4>
            <input
              tyle="text"
              class="form-control"
              style="margin-bottom: 1rem;"
              >
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12" md="12">
            <h4>Друга информация</h4>
            <textarea 
              class="form-control seeds-info" 
              id="message" 
              name="body" 
              rows="5"
            ></textarea>
          </CCol>
        </CRow>
        <CButton color="success" id="go-next" class="apply-submit" @click="submit()">ИЗДАЙ</CButton>
      </CForm>
    </div>
</template>
<script>
import { DatePicker } from 'v-calendar'

export default {
  name: 'AdminIssue',
  components: {
    'v-date-picker': DatePicker
  },
  data () {
    return {
      packedDate: new Date(),
      issueDate: new Date()
    }
  },
  methods: {
  }
}
</script>
<style>
</style>