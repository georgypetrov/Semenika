<template>
  <div class="apply-container">
    <h2>{{ titles[$route.params.id] }}</h2>
    <hr class="in-dash-line" />
    <a :href="link" class="link" v-if="!isAdmin">{{ link }}</a>
    <CForm class="inner-aplly-container" v-if="isAdmin">
      <CRow class="row-below">
        <CCol sm="6" md="6">
          <h4 class="heading-text">Линк към външен регистър:</h4>
        </CCol>
        <CCol sm="6" md="6">
          <input type="text" id="link" v-model="link" class="form-control" placeholder />
        </CCol>
      </CRow>
      <CButton color="success" id="go-next" class="apply-submit" @click="submit()">ЗАПИШИ</CButton>
      <CAlert
        :show="10"
        closeButton
        color="success"
        v-if="success"
        fade
        style="margin-top: 20px"
      >Връзката е актуализирана</CAlert>
    </CForm>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Repository from "@/repositories/RepositoryFactory";
const RegisterRepository = Repository.get("register");
export default {
  name: "LinkRegisters",
  components: {},
  data() {
    return {
      success: false,
      link: "",
      titles: {
        1: "Физически лица, получили разрешения за вземане на проби от семена (пробовземачи)",
        2: "Лаборатории, получили разрешение от ИАСАСза  извършване на лабораторни анализи на посевни качества на семената ",
        3: "Лица преминали курс на обучение и успешно положен изпит по лабораторни методи за анализ за чистота",
        4: "Издадени разрешения на лица, които предлагат на пазара семена, предназначени за научни цели или селекционна дейност",
        5: "Полски инспектори физически лица"
      }
    };
  },
  computed: {
    ...mapGetters("Auth", ["isAdmin"])
  },
  watch: {
    $route() {
      RegisterRepository.registerslinks()
        .then(resp => {
          console.log(resp.data.data.registerslinks);
          resp.data.data.registerslinks.forEach(item => {
            if (item.id == this.$route.params.id) {
              this.link = item.link;
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    RegisterRepository.registerslinks()
      .then(resp => {
        console.log(resp.data.data.registerslinks);
        resp.data.data.registerslinks.forEach(item => {
          if (item.id == this.$route.params.id) {
            console.log(item.link);
            this.link = item.link;
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    submit() {
      let payload = {
        _method: "PATCH",
        link: this.link
      };
      RegisterRepository.updateRegistersLinks(this.$route.params.id, payload)
        .then(resp => {
          console.log(resp);
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 10000);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
#link {
  width: 90%;
}
.link {
  color: #3399ff;
  margin-top: 5px;
}
.link:hover {
  text-decoration: none;
  color: #2778c9;
}
</style>