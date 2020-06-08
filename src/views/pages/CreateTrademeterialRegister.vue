<template>
<div>
    <div class="apply-container">
        <h3
        class ="label-header-text"        
        >Добавяне на запис към: Публичен национален електронен регистър на лицата, които тъгуват с посевен или посадъчен материал</h3>        
        <div style="margin-top: 25px;">
          <CForm class="inner-aplly-container">
            <CRow>
              <CCol sm="6" md="6">
                <h4 class="heading-text">Култури:</h4>
              </CCol>
              <CCol sm="6" md="6">
                <CSelect    
                  placeholder="Изберете Култура"              
                  :value.sync="form.culture"
                  :options="['Зърнено-житни култури','Маслодайни култури','Бобовите култури']"
                  custom
                  :lazy="false"
                  :isValid="checkIfValid('culture')"
                  autocomplete="culture"
                  invalidFeedback="Моля, изберете култура"
                />
              </CCol>
            </CRow>
            <CRow class="row-below">
              <CCol sm="6" md="6">
                <h4 class="heading-text">Номер на регистрация:</h4>
              </CCol>
              <CCol sm="6" md="6">
                <CInput 
                  type="text" 
                  class="lot-numbers"                   
                  :lazy="false"
                  v-model="form.reg_no"
                  :isValid="checkIfValid('reg_no')"
                  autocomplete="reg_no"
                  invalidFeedback="Това е задължително поле и трябва да бъде число"
                />
              </CCol>
            </CRow>
            <CRow class="row-below">
              <CCol sm="6" md="6">
                <h4 class="heading-text">Удостоверение номер:</h4>
              </CCol>
              <CCol sm="6" md="6">
                <CInput 
                  type="text" 
                  class="lot-numbers" 
                  :lazy="false"
                  v-model="form.cer_no"
                  :isValid="checkIfValid('cer_no')"
                  autocomplete="cer_no"
                  invalidFeedback="Това е задължително поле и трябва да бъде число"
                />
              </CCol>
            </CRow>
            <CRow class="row-below">
              <CCol sm="6" md="6">
                <h4 class="heading-text">Дата на вписване в регистъра:</h4>
              </CCol>
              <CCol sm="6" md="6">
                <v-date-picker                  
                  is-indigo
                  v-model="form.date_of_entry"                  
                  :masks="{ input: ['DD/MM/YYYY'], data: ['YYYY-MM-DD']}"
                  :firstDayOfWeek="2"
                  :input-props="{
                    placeholder: 'DD/MM/YYYY',
                  }"
                />
                <div class="date-error-msg mt-1" v-if="dateErrorMessage">
                  {{ dateErrorMessage }}
                </div>
              </CCol>
            </CRow>
            <CRow class="row-below">
              <CCol sm="6" md="6">
                <h4 class="heading-text">ЕИК:</h4>
              </CCol>
              <CCol sm="6" md="6">
                <CInput 
                  type="text" 
                  class="lot-numbers" 
                  :lazy="false"
                  v-model="form.eik"
                  :isValid="checkIfValid('eik')"
                  autocomplete="eik"
                  invalidFeedback="Това е задължително поле"
                />
              </CCol>
            </CRow>
            <CRow class="row-below">
              <CCol sm="6" md="6">
                <h4 class="heading-text">Град:</h4>
              </CCol>
              <CCol sm="6" md="6">
                <CSelect 
                  placeholder="Изберете Град"                   
                  :value.sync="form.city" 
                  :options="['Айтос','Бургас','Търново']" 
                  custom 
                  :lazy="false"
                  :isValid="checkIfValid('city')"
                  autocomplete="city"
                  invalidFeedback="Моля, изберете град"
                />                
              </CCol>
            </CRow>
            <CRow class="row-below">
              <CCol sm="6" md="6">
                <h4 class="heading-text">Име/наименование на физическото или юридическото лице:</h4>
              </CCol>
              <CCol sm="6" md="6">
                <CInput 
                  type="text" 
                  class="lot-numbers"                   
                  :lazy="false"
                  v-model="form.name_of_legal_person"
                  :isValid="checkIfValid('name_of_legal_person')"
                  autocomplete="name_of_legal_person"
                  invalidFeedback="Това е задължително поле"
                />
              </CCol>
            </CRow>
            <CRow class="row-below">
              <CCol sm="6" md="6">
                <h4 class="heading-text">Телефон:</h4>
              </CCol>
              <CCol sm="6" md="6">
                <CInput 
                  type="tel"                   
                  class="lot-numbers"                   
                  :lazy="false"
                  v-model="form.phone"
                  :isValid="checkIfValid('phone')"
                  autocomplete="phone"
                  invalidFeedback="Това е задължително поле"
                />
              </CCol>
            </CRow>
            <CButton color="success" id="go-next" class="apply-submit" @click="submit()">ДОБАВИ</CButton>            
            <router-link to="/registers">
              <CButton color="danger" style="margin-left: 10px" class="apply-submit">ОТКАЗ</CButton>
            </router-link>
          </CForm>
        </div>        
    </div>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import RepositoryFactory from "@/repositories/RepositoryFactory";
const RegisterRepository = RepositoryFactory.get('register');
import { DatePicker } from "v-calendar";
import { validationMixin } from "vuelidate";
import {
  required,
  numeric
} from "vuelidate/lib/validators";

export default {
  name: 'CreateTrademeterialRegister',
  components: {  
    "v-date-picker": DatePicker    
  },
  data () {
    return { 
      form: {
        culture: "",
        reg_no: 0,
        cer_no: 0,
        date_of_entry: new Date(),
        eik: "",
        city: "",      
        name_of_legal_person: "",
        phone: "",      
      }    
    }
  },
  computed:{
    ...mapGetters("Auth", ["isAdmin"]),
    isValid() {
      return !this.$v.form.$invalid;
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    },
    dateErrorMessage() {
      if (!this.form.date_of_entry) return 'Това е задължително поле';
      return '';
    },
  },
  mixins: [validationMixin],
  validations: {
    form: {
      culture: {
        required
      },
      reg_no: {
        required,
        numeric       
      },
      cer_no: {
        required,
        numeric      
      },
      date_of_entry: {
        required        
      },
      eik: {
        required
      },
      city: {
        required
      },
      name_of_legal_person: {
        required
      },
      phone: {
        required
      }
    }
  },
  methods: {   
    checkIfValid(fieldName) {
      const field = this.$v.form[fieldName];      
      if (!field.$dirty) {
        return null;
      }
      if (!field.$error && field.$model) {
        return null;
      }
      return !field.$error;
    }, 
    submit() {        
      this.validate();
      if (this.isValid) {        
        RegisterRepository.create(this.form)
        .then(async resp => {
          if (resp.data) {                                  
            this.$router.push("/registers");
          }
        })
        .catch(error => {
          console.log(error);
        });
      }        
    },
    validate() {
      this.$v.$touch();
    }
  }
};
</script>
<style>
.admin-registers-container{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 15px;
}
.form-group {
  margin-bottom: 0;
}
.date-error-msg {
  font-size: 80%;
  color: #e55353;
}
</style>