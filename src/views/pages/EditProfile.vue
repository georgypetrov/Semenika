<template>
  <div class="edit-profile-container">
    <h2>Редакция на профил</h2>
    <CForm class="inner-aplly-container">
      <CRow style="margin-top:20px;">
        <CCol md="6">
          <h4 class="heading-text">Име</h4>
        </CCol>
        <CCol md="6">
          <CInput
            class="right lot-numbers"
            :lazy="false"
            :value.sync="$v.form.name.$model"
            :isValid="checkIfValid('name')"
            autocomplete="name"
            invalidFeedback="Това е задължително поле и не може да бъде по-малко от 2 символа"
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol md="6">
          <h4 class="heading-text">Фамилия</h4>
        </CCol>
        <CCol md="6">
          <CInput
            class="right lot-numbers"
            :lazy="false"
            :value.sync="$v.form.surname.$model"
            :isValid="checkIfValid('surname')"
            autocomplete="surname"
            invalidFeedback="Това е задължително поле и не може да бъде по-малко от 2 символа"
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol md="6">
          <h4 class="heading-text">Фирма</h4>
        </CCol>
        <CCol md="6">
          <CInput class="right lot-numbers" v-model="$v.form.company.$model" />
        </CCol>
      </CRow>
      <CRow>
        <CCol md="6">
          <h4 class="heading-text">ЕИК</h4>
        </CCol>
        <CCol md="6">
          <CInput 
          	class="right lot-numbers" 
          	:lazy="false"
          	v-model="$v.form.pin.$model" 
          	:isValid="checkIfValid('pin')"
            autocomplete="pin"
            invalidFeedback="Щифтът трябва да е номер."
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol md="6">
          <h4 class="heading-text">E-mail</h4>
        </CCol>
        <CCol md="6">
          <CInput
            class="right lot-numbers"
            type="email"
            :lazy="false"
            :value.sync="$v.form.email.$model"
            :isValid="checkIfValid('email')"
            autocomplete="email"
            invalidFeedback="Това е задължително поле и изисква валиден e-mail адрес"
          />
          </CCol>
      </CRow>
      <CButton color="success" id="go-next" class="apply-submit" @click="submit()">Запиши</CButton>
    </CForm>
  </div>
</template>
<script>
import Repository from "@/repositories/RepositoryFactory";
const AuthRepository = Repository.get("auth");
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  email,
  requiredIf,
  numeric
} from "vuelidate/lib/validators";

export default {
  name: "EditProfile",
  components: {},
  data() {
    return {
      form: {
        name: "",
        surname: "",
        company: "",
        pin: "",
        email: ""
      }
    };
  },
  computed: {
    isValid() {
      return !this.$v.form.$invalid;
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    }
  },
  mixins: [validationMixin],
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      surname: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      company: {},
      pin: {
      	numeric
      }
    }
  },
  async created() {
    const { data } = await AuthRepository.user();
    this.form.name =  data.data.name
    this.form.surname =  data.data.surname
    this.form.company =  data.data.company
    this.form.pin =  data.data.pin
    this.form.email =  data.data.email
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
        AuthRepository.updateMe(this.form)
          .then(async resp => {
            if (resp.data) {
              await this.$store.commit("Auth/updateUserData", resp.data);
              this.$router.push("/myprofile");
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
<style scoped>
.edit-profile-container {
  background: #ffffff;
  padding: 30px;
}
.edit-profile-container .apply-submit {
  margin-top: 50px;
  padding: 10px 30px;
}
</style>