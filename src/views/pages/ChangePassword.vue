<template>
	<div class="changepassword-container">
		<h2>Смяна на парола</h2>
		<CForm class="inner-aplly-container">
			<CRow style="margin-top:20px;">
        <CCol md="6">
          <h4 class="heading-text">Нова парола</h4>
        </CCol>
        <CCol md="6">
        <CInput
          class="right lot-numbers"
          :isValid="checkIfValid('password')"
          :value.sync="$v.form.password.$model"          
          type="password"          
          autocomplete="new-password"
          invalidFeedback="Паролата е задължителна и трябва да е поне 6 знака"          
        />
        </CCol>
      </CRow>
      <CRow>
        <CCol md="6">
          <h4 class="heading-text">Потвърди парола</h4>
        </CCol>
        <CCol md="6">
        <CInput
          class="right lot-numbers"
          :isValid="checkIfValid('confirmpassword')"
          :value.sync="$v.form.confirmpassword.$model"          
          type="password"          
          autocomplete="confirm-password" 
          invalidFeedback="Потвърдете паролата е задължителна и трябва да съвпада с нова парола"         
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
  sameAs  
} from "vuelidate/lib/validators";

export default {
  name: 'ChangePassword',
  components: {
  },
  data () {
    return {
      form: {
        password: "",
        confirmpassword: ""     
      },
    }
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
      password: {
        required,   
        minLength: minLength(6)     
      },  
      confirmpassword: {
        required, 
        sameAsPassword: sameAs('password')       
      },
    }
  },    
  methods: {  	
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
      if (this.isValid) {
        AuthRepository.updateMe(this.form)
        .then(async resp => {
          if (resp.data) {
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
}
</script>
<style scoped>
	.changepassword-container {
    background: #ffffff;
    padding: 30px;
	}
	.changepassword-container .apply-submit {
    margin-top: 50px;
    padding: 10px 30px;
	}
  .changepassword-container .form-control {
    width: 90%;
  }
  .form-control {
    background: red!important;
  }
  .form-group input{
    background: red!important;
  }
</style>