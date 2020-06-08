<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Вход</h1>
                  <CInput
                    placeholder="Въведете имейл"
                    autocomplete="username email"
                    v-model="email"
                    @keyup.enter="login"
                    @copy.prevent
                  >
                    <template #prepend-content>
                      <CIcon name="cil-user" />
                    </template>
                  </CInput>
                  <CInput
                    placeholder="Парола"
                    type="password"
                    autocomplete="curent-password"
                    v-model="password"
                    @keyup.enter="login"
                    @copy.prevent
                  >
                    <template #prepend-content>
                      <CIcon name="cil-lock-locked" />
                    </template>
                  </CInput>
                    <!-- :show="10" -->
                  <CAlert
                    closeButton
                    color="danger"
                    v-if="error"
                    fade
                    style="margin-top: 20px"
                  >{{error}}</CAlert>

                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="link" class="px-0 forgotten-pass">Забравена парола?</CButton>
                    </CCol>
                    <CCol col="12" class="text-center">
                      <CButton
                        color="primary"
                        class="green-back"
                        @click="login"
                        :disabled="loading"
                      >Вход</CButton>
                      <br />
                      <router-link
                        class="green-text"
                        :to="{ path: '/register'}"
                        replace
                      >Създайте профил!</router-link>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { cilUser } from "@coreui/icons";
import { cilPencil } from "@coreui/icons";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    error: "",
    returnUrl: "",
    loading: false
  }),
  icons: { cilPencil, cilUser },
  user: cilUser,
  computed: {
    ...mapGetters("Auth", ["isAuthenticated"])
  },
  created() {
    this.returnUrl = this.$route.query.returnUrl || "/";
    if (this.isAuthenticated) {
      this.$router.push(this.returnUrl);
    }
  },
  methods: {
    login() {
      const { email, password } = this;
      this.loading = true;
      this.error = ""
      this.$store
        .dispatch("Auth/login", { email, password })
        .then(({ data }) => {
          if (data.status == false) {
            this.error = data.message;
            this.loading = false;
          } else {
            this.$router.push(this.returnUrl);
            this.loading = false;
          }
        })
        .catch(error => {
          console.log(error);

          this.error = "Error";

          this.loading = false;
        });
      // console.log(this.error);
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}
.input-group-text {
  background: #ebedef;
}
.form-control:focus {
  background-color: yellow;
}
.green-back {
  background: #38d984;
  margin-bottom: 10px;
  padding: 13px 40px;
}
.green-back:hover {
  background: #2ba263;
}
.green-back:active {
  background-color: #2ba263 !important;
  background: #2ba263;
}
.green-text {
  color: #38d984;
}
.green-text:hover {
  color: #2ba263;
  text-decoration: none;
}
.forgotten-pass {
  text-decoration: underline;
  color: #989da5;
}
.forgotten-pass:hover {
  color: #9096a0;
}
</style>
