<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <h1>Регистрация</h1>
              <stepper :step="1"></stepper>
              <CForm class="reg-form">
                <p id="role-text">Моля изберете Вашата роля</p>
                <p
                  class="additional-text"
                >По-късно ще трябва да представите изискваните документи за избраната от Вас роля</p>
                <div class="check-container">
                  <input
                    class="form-check-input company-check"
                    type="checkbox"
                    name="trader"
                    id="trader"
                    value="trader"
                    v-model="roles"
                    @click="isTrader ? isTrader = false : isTrader = true"
                  />
                  <p>Търговец на семена</p>
                  <input
                    class="form-check-input company-check"
                    type="checkbox"
                    name="grower"
                    id="grower"
                    value="producer"
                    v-model="roles"
                    @click="isGrower ? isGrower = false : isGrower = true"
                  />
                  <p>Производител на семена</p>
                  <input
                    class="form-check-input company-check"
                    type="checkbox"
                    name="supplier"
                    id="supplier"
                    value="logistics"
                    v-model="roles"
                    @click="isSupplier ? isSupplier = false : isSupplier = true"
                  />
                  <p>Логистик</p>
                  <input
                    class="form-check-input company-check"
                    type="checkbox"
                    name="farmer"
                    id="farmer"
                    value="farmer"
                    v-model="roles"
                    @click="isFarmer ? isFarmer = false : isFarmer = true"
                  />
                  <p>Земеделски производител</p>-->
                </div>
                <div class="login-back">
                  <router-link :to="{ path: '/login'}" replace>Вместо това влезте в профила си</router-link>
                  <CButton
                    color="success"
                    :disabled="continueCheck()"
                    id="go-next"
                    @click="nextStep()"
                  >Напред</CButton>
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

export default {
  name: "stepOne",
  components: {
    stepper
  },
  data() {
    return {
      isTrader: false,
      isGrower: false,
      isSupplier: false,
      isFarmer: false,
      options: ["trader", "producer", "logistics", "farmer"],
      roles: []
    };
  },
  watch:{
    // roles(n, v){
    //   console.log(n);
    //   console.log(v);
      
      
    // }
  },
  computed: {
    responseObj() {
      return {
        roles: {
          trader: this.isTrader,
          producer: this.isGrower,
          logistics: this.isSupplier,
          farmer: this.isFarmer
        }
      };
    }
  },

  methods: {
    nextStep: function() {
      this.$emit("onNext", this.roles);
    },
    continueCheck: function() {
      if (this.isTrader || this.isGrower || this.isSupplier || this.isFarmer) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
<style >
</style>