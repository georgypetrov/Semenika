<template>
  <div class="register">
    <div v-show="step === 1">
      <step-one @onNext="onStepOneNext"></step-one>
    </div>
    <div v-show="step === 2">
      <step-two :loading="loading" @onPrev="onStepTwoPrev" @onSubmit="onStepTwoSubmit"></step-two>
    </div>
  </div>
</template>

<script>
import stepOne from "@/components/StepOne";
import stepTwo from "@/components/StepTwo";
import { mapGetters } from "vuex";

export default {
  name: "Register",
  components: {
    stepOne,
    stepTwo
  },
  data() {
    return {
      step: 1,
      form: {
        name: "",
        surname: "",
        email: "",
        password: "",
        company: "",
        isCompany: false,
        roles: null,
        error: ""
      },
      loading: false
    };
  },
  computed: {
    ...mapGetters("Auth", ["isAuthenticated"])
  },
  created() {
    if (this.isAuthenticated) {
      this.$router.push("/");
    }
  },
  methods: {
    prev: function() {
      this.step--;
    },
    next: function() {
      this.step++;
    },
    submit: function() {
      this.loading = true;
      this.$store
        .dispatch("Auth/register", this.form)
        // eslint-disable-next-line no-unused-vars
        .then(resp => {
          this.$router.push("/");
        })
        .catch(error => {
          this.error = error.response.data.message;
          this.loading = false;
        });
    },
    stepCheck: function() {
      return this.step;
    },
    onStepOneNext(payload) {
      this.form.roles = payload;
      this.next();
    },
    onStepTwoPrev() {
      this.prev();
    },
    onStepTwoSubmit(payload) {
      this.form.name = payload.firstName;
      this.form.surname = payload.lastName;
      this.form.email = payload.email;
      this.form.password = payload.password;
      this.form.company = payload.companyName;
      this.form.isCompany = payload.isCompany;
      this.submit();
    }
  }
};
</script>
<style>
</style>