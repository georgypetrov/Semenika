<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm class="reg-form" style="width: 90%">
                <h1>Регистрация</h1>
                <stepper :step="2"></stepper>
                <p>Моля, въведете Вашите данни:</p>
                <div class="row">
                  <CInput
                    class="col-md-6 left"
                    label="First Name"
                    :lazy="false"
                    :value.sync="$v.form.firstName.$model"
                    :isValid="checkIfValid('firstName')"
                    placeholder="Име"
                    autocomplete="given-name"
                    invalidFeedback="Това е задължително поле и не може да бъде по-малко от 2 символа"
                  />
                  <CInput
                    class="col-md-6 right"
                    label="Last Name"
                    :lazy="false"
                    :value.sync="$v.form.lastName.$model"
                    :isValid="checkIfValid('lastName')"
                    placeholder="Фамилия"
                    autocomplete="family-name"
                    invalidFeedback="Това е задължително поле и не може да бъде по-малко от 2 символа"
                  >
                    <template #prepend-content></template>
                  </CInput>
                </div>
                <div class="row">
                  <CInput
                    class="col-md-6 left"
                    label="Email"
                    type="email"
                    :lazy="false"
                    :value.sync="$v.form.email.$model"
                    :isValid="checkIfValid('email')"
                    placeholder="E-mail"
                    autocomplete="email"
                    invalidFeedback="Това е задължително поле и изисква валиден e-mail адрес"
                  ></CInput>
                  <CInput
                    class="col-md-6 right"
                    :isValid="checkIfValid('password')"
                    :value.sync="$v.form.password.$model"
                    label="Password"
                    type="password"
                    placeholder="Парола"
                    @copy.prevent
                    autocomplete="new-password"
                    invalidFeedback="Паролата трябва да бъде не по-малко от 8 символа и да съдържа: число, главна буква и малка буква"
                  ></CInput>
                  <div class="col-12">
                    <!-- :isValid="checkIfValid('isCompany')" -->
                    <input
                      :checked.sync="form.isCompany"
                      type="checkbox"
                      @click="form.isCompany = !form.isCompany"
                      class="mb-2 checkbox-step-2"
                    />
                    <p style="position: relative; margin-left: 20px; margin-top: -25px;">Регистрирам се от името на компания</p>
                    <CInput
                      style="padding:0"
                      label="Company Name"
                      :lazy="false"
                      :value.sync="$v.form.companyName.$model"
                      placeholder="Име на фирма"
                      autocomplete="company"
                      invalidFeedback="Това е задължително поле и изисква валиден e-mail адрес"
                      :isValid="checkIfValid('companyName')"
                      v-show="form.isCompany"
                    ></CInput>
                  </div>
                </div>
                <div class="submit-container">
                  <CButton id="back-btn" @click="prevStep()">Назад</CButton>
                  <CButton color="success" id="go-next" @click="submit()">Напред</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import stepper from "@/components/Stepper";
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  email,
  helpers,
  requiredIf,
  requiredUnless
} from "vuelidate/lib/validators";

export default {
  name: "stepTwo",
  components: {
    stepper
  },
  props:{
    loading: {
      type: Boolean,
      default:false
    }
  },
  data() {
    return {
      checked: "",
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        companyName: "",
        isCompany: false
      },
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
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        // minLength: minLength(8),
        // strongPass: helpers.regex(
        //   "strongPass",
        //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
        // )
      },
      isCompany: {},
      companyName: {
        required: requiredIf(function (){
          return this.form.isCompany
        }),
        minLength: minLength(3)
      }
    }
  },
  methods: {
    prevStep: function() {
      this.$emit('onPrev');
    },
    checkIfValid(fieldName) {
      const field = this.$v.form[fieldName];
      if (!field.$dirty) {
        return null;
      }
      if(!field.$error && field.$model){
        return null
      }
      return !field.$error
    },
    submit() {
      this.validate();
      // TO DO -> make companyName reqiured and minLength: minLength(3) only if isCompany is clicked
      if (this.isValid) {
        this.$emit('onSubmit', this.form)
      }
    },

    validate() {
      this.$v.$touch();
    }
  }
};
</script>
<style scoped>
</style>