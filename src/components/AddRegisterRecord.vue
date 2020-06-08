<template>
  <div style="margin-top: 25px;">
    <CForm class="inner-aplly-container">
      <CRow>
        <CCol sm="6" md="6">
          <h4 class="heading-text">Култури:</h4>
        </CCol>
        <CCol sm="6" md="6">
          <CSelect
            id="cereals"
            value="cereals"
            :options="['Зърнено-житни култури','Маслодайни култури','Бобовите култури']"
            custom
          />
        </CCol>
      </CRow>
      <CRow class="row-below">
        <CCol sm="6" md="6">
          <h4 class="heading-text">Номер на регистрация:</h4>
        </CCol>
        <CCol sm="6" md="6">
          <input type="text" class="lot-numbers" v-model="registrationNumber" />
        </CCol>
      </CRow>
      <CRow class="row-below">
        <CCol sm="6" md="6">
          <h4 class="heading-text">Удостоверение номер:</h4>
        </CCol>
        <CCol sm="6" md="6">
          <input type="text" class="lot-numbers" v-model="certificateNumber" />
        </CCol>
      </CRow>
      <CRow class="row-below">
        <CCol sm="6" md="6">
          <h4 class="heading-text">Дата на вписване в регистъра:</h4>
        </CCol>
        <CCol sm="6" md="6">
          <v-date-picker
            id="picker"
            is-indigo
            v-model="signingDate"
            :masks="{ input: ['DD/MM/YYYY'], data: ['YYYY-MM-DD']}"
            :firstDayOfWeek="2"
            :input-props="{
                        placeholder: 'DD/MM/YYYY',
                      }"
          />
        </CCol>
      </CRow>
      <CRow class="row-below">
        <CCol sm="6" md="6">
          <h4 class="heading-text">ЕИК:</h4>
        </CCol>
        <CCol sm="6" md="6">
          <input type="text" class="lot-numbers" v-model="identifier" />
        </CCol>
      </CRow>
      <CRow class="row-below">
        <CCol sm="6" md="6">
          <h4 class="heading-text">Град:</h4>
        </CCol>
        <CCol sm="6" md="6">
          <CSelect id="city" :value.sync="city" :options="['Айтос','Бургас','Търново']" custom />
        </CCol>
      </CRow>
      <CRow class="row-below">
        <CCol sm="6" md="6">
          <h4 class="heading-text">Име/наименование на физическото или юридическото лице:</h4>
        </CCol>
        <CCol sm="6" md="6">
          <input type="text" class="lot-numbers" v-model="companyName" />
        </CCol>
      </CRow>
      <CRow class="row-below">
        <CCol sm="6" md="6">
          <h4 class="heading-text">Телефон:</h4>
        </CCol>
        <CCol sm="6" md="6">
          <input type="tel" id="phone" class="form-control" v-model="phoneNumber" />
        </CCol>
      </CRow>
      <CButton color="success" id="go-next" class="apply-submit" @click="submit">ДОБАВИ</CButton>
      <CButton color="danger" class="apply-submit" @click="back">ДОБАВИ</CButton>
    </CForm>
  </div>
</template>
<script>
import RepositoryFactory from "@/repositories/RepositoryFactory"
const RegisterRepository = RepositoryFactory.get('register')
import { DatePicker } from "v-calendar";

export default {
  name: "AddRegisterRecord",
  components: {
    "v-date-picker": DatePicker
  },
  data() {
    return {
      registrationNumber: 0,
      certificateNumber: 0,
      signingDate: new Date(),
      identifier: 0,
      city: "",
      cereals: "",
      phoneNumber: "",
      companyName: ""
    };
  },
  methods: {
    back() {
      this.$emit("onCancel");
    },
    submit() {
        // RegisterRepository.create()
      console.log();
    }
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 0;
}
</style>