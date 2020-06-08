<template>
  <div class="profile-container">
    <h2>Моят профил</h2>
    <hr class="in-dash-line" />
    <template v-if="!this.user">
      <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>
    </template>
    <CRow v-if="this.user">
      <CCol sm="3" md="3" style="text-align:center">
        <img
          :src="user.profile_image ? user.profile_image : 'img/semenika/image-placeholder.png'"
          class="profile-image"
        />
        <input style="display: none" type="file" ref="profileImg" @change="uploadImage" />
        <button class="dash-see-category" @click="uploadImageClick">Качи нова снимка</button>
        <CAlert
          closeButton
          color="danger"
          v-if="imageerror==true"
          fade
          style="margin-top: 20px"
        >Каченият файл трябва да бъде изображение във формат jpg, jpeg, png</CAlert>
      </CCol>
      <CCol sm="9" md="9">
        <CForm class="inner-aplly-container">
          <CRow>
            <CCol sm="4" md="4">
              <h4 class="heading-text" style="margin:0;">Моите роли</h4>
            </CCol>
          </CRow>
          <CRow v-for="(role, index) in roles" :key="index">
            <CCol sm="4" md="4">
              <p>{{role.name}}</p>
            </CCol>
            <CCol sm="3" md="3">
              <div class="role-status">
                <template v-if="role.status == 'requested' || role.status == 'pending'">
                  <p style="color:red;">Не потвърдено</p>
                </template>
                <template v-if="role.status == 'approve'">
                  <p style="color: green;">Потвърдено</p>
                </template>
                <template v-if="role.status ==  'reject'">
                  <p style="color:red;">Отхвърлена</p>
                </template>
              </div>
            </CCol>
            <CCol sm="5" md="5">
              <div class="role-status">
                <template v-if="role.status == 'requested'">
                  <a
                    href="#"
                    @click.prevent="clickUploadBtn(role.name)"
                    class="upload"
                  >Качи документ</a>
                </template>
                <template v-if="role.status == 'pending'">
                  <a :href="role.document" target="_blank" class="upload">Виж документите</a>
                  <a href="#" @click.prevent="approveRole(role.name)" class="approve">Удобри</a>
                  <a href="#" @click.prevent="rejectRoleClick(role.name)" class="reject">Откажи</a>
                  <!-- <a href="#" @click.prevent="rejectRole(role.name)" class="reject">Reject</a> -->
                </template>
                <template v-if="role.status == 'reject'">
                  <a :href="role.document" target="_blank" class="upload">Виж документите</a>
                </template>
              </div>
            </CCol>
          </CRow>
          <input
            type="file"
            id="documentUpload"
            ref="file"
            style="display:none"
            @change="uploadFile"
          />
          <CRow>
            <CCol sm="6" md="6" v-if="roles.length < 4">
              <button
                v-if="!rolesDropDown"
                class="dash-see-all"
                style="margin-top:15px; padding: 8px 15px;"
                @click="rolesDropDown = !rolesDropDown"
              >+ ДОБАВИ РОЛЯ</button>
              <template v-if="rolesDropDown">
                <CSelect
                  @update:value="selectRole"
                  :options="rolesOptions"
                  placeholder="Add New Role"
                  style="margin-top:15px;"
                />
                <button
                  @click="rolesDropDown = !rolesDropDown"
                  class="dash-see-all"
                  style="margin-top:15px; padding: 8px 15px;"
                >Cancel</button>
              </template>
            </CCol>
          </CRow>

          <CRow style="margin-top:20px;">
            <CCol md="6">
              <h4 class="heading-text">Име</h4>
            </CCol>
            <CInput
              class="col-md-6 right"
              :lazy="false"
              :value.sync="$v.form.name.$model"
              :isValid="checkIfValid('name')"
              autocomplete="name"
              invalidFeedback="Това е задължително поле и не може да бъде по-малко от 2 символа"
            />
          </CRow>
          <CRow>
            <CCol md="6">
              <h4 class="heading-text">Фамилия</h4>
            </CCol>
            <CInput
              class="col-md-6 right"
              :lazy="false"
              :value.sync="$v.form.surname.$model"
              :isValid="checkIfValid('surname')"
              autocomplete="surname"
              invalidFeedback="Това е задължително поле и не може да бъде по-малко от 2 символа"
            />
          </CRow>
          <CRow>
            <CCol md="6">
              <h4 class="heading-text">Фирма</h4>
            </CCol>
            <CInput class="col-md-6 right" v-model="$v.form.company.$model" />
          </CRow>
          <CRow>
            <CCol md="6">
              <h4 class="heading-text">ЕИК</h4>
            </CCol>
            <CInput 
              class="col-md-6 right" 
              :lazy="false"
              v-model="$v.form.pin.$model"
              :isValid="checkIfValid('pin')"
              autocomplete="pin"
              invalidFeedback="Щифтът трябва да е номер." 
            />
          </CRow>
          <CRow>
            <CCol md="6">
              <h4 class="heading-text">E-mail</h4>
            </CCol>
            <CInput
              class="col-md-6 right"
              type="email"
              :lazy="false"
              :value.sync="$v.form.email.$model"
              :isValid="checkIfValid('email')"
              autocomplete="email"
              invalidFeedback="Това е задължително поле и изисква валиден e-mail адрес"
            />
          </CRow>
          <CRow style="margin-top:20px;">
            <CCol md="6">
              <h4 class="heading-text">Нова парола</h4>
            </CCol>
            <CInput
              class="col-md-6 right"
              :isValid="checkIfValid('password')"
              :value.sync="$v.form.password.$model"
              type="password"
              autocomplete="new-password"
              invalidFeedback="Паролата е задължителна и трябва да е поне 6 знака"
            ></CInput>
          </CRow>
          <CRow>
            <CCol md="6">
              <h4 class="heading-text">Потвърди парола</h4>
            </CCol>
            <CInput
              class="col-md-6 right"
              :isValid="checkIfValid('confirmpassword')"
              :value.sync="$v.form.confirmpassword.$model"
              type="password"
              autocomplete="confirm-password"
              invalidFeedback="Потвърдете паролата е задължителна и трябва да съвпада с нова парола"
            ></CInput>
          </CRow>
          <CButton color="success" class="apply-submit" @click="submit()">Запиши</CButton>
          <CButton
            color="danger"
            style="margin-left: 10px"
            class="apply-submit"
            @click="$router.push('/users')"
          >Cancel</CButton>
        </CForm>

        <CModal
          :show.sync="rejectRoleModal"
          :no-close-on-backdrop="true"
          :centered="true"
          title="Modal title 2"
          size="lg"
          color="dark"
        >
          <!-- <textarea v-model="rejectReson"></textarea> -->
          <CTextarea
            placeholder="Reason of reject"
            rows="9"
            v-model="rejectReason"
            :isValid="rejectReasonIsValid"
            invalidFeedback="Reason is required"
          />
          <template #header>
            <h6 class="modal-title">Custom smaller modal title</h6>
            <CButtonClose @click="rejectRoleModal = false" class="text-white" />
          </template>
          <template #footer>
            <CButton @click="rejectRoleModal = false" color="danger">Discard</CButton>
            <CButton @click="rejectRole(123)" color="success">Accept</CButton>
          </template>
        </CModal>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import Repository from "@/repositories/RepositoryFactory";
const UserRepository = Repository.get("users");
const RoleRepository = Repository.get("role");
import { Utils } from "@/_helpers/utils";
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  email,
  sameAs,
  requiredIf,
  numeric
} from "vuelidate/lib/validators";

export default {
  name: "MyProfile",
  components: {},
  data() {
    return {
      user: null,
      role: null,
      rolesDefaultOptions: [
        { value: "trader", label: "Seed trader" },
        { value: "producer", label: "Seed producer" },
        { value: "logistics", label: "logistics" },
        { value: "farmer", label: "Farmer" }
      ],
      rolesDropDown: false,
      form: {
        _method: "PATCH",
        name: "",
        surname: "",
        company: "",
        pin: "",
        email: "",
        password: "",
        confirmpassword: ""
      },
      rejectReason: "",
      rejectRoleModal: false,
      rejectReasonIsValid: null,
      rejectRoleName: "",
      imageerror: false,
    };
  },
  computed: {
    isValid() {
      return !this.$v.form.$invalid;
    },
    isDirty() {
      return this.$v.form.$anyDirty;
    },
    fullName() {
      return this.user ? this.user.name + " " + this.user.surname : "";
    },
    company() {
      return this.user ? this.user.company : "";
    },
    roles() {
      return this.user
        ? [...this.user.roles, ...this.user.unapprove_role].filter(item => {
            return item.name != "frontend";
          })
        : [];
    },
    rolesOptions() {
      return this.rolesDefaultOptions.filter(item => {
        let requestedRoles = Utils.filterNames(this.roles);
        return !requestedRoles.includes(item.value);
      });
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
      },
      password: {
        minLength: minLength(6)
      },
      confirmpassword: {
        required: requiredIf(function() {
          return this.form.password != "";
        }),
        sameAsPassword: sameAs("password")
      }
    }
  },
  async mounted() {
    this.init();
  },
  methods: {
    approveRole(role) {
      let payload = {
        user_id: this.user.id,
        role_name: role,
        status: "approve"
      };
      RoleRepository.approveRole(payload)
        .then(res => {
          console.log(res);
        })
        .then(error => {
          console.log(error);
        });
    },
    rejectRoleClick(role) {
      this.rejectRoleModal = true;
      this.rejectRoleName = role;
    },
    rejectRole() {
      // console.log(this.rejectReason);
      if (this.rejectReason == "" || this.rejectReason == null) {
        this.rejectReasonIsValid = false;
      } else {
        this.rejectRoleName;
        let payload = {
          user_id: this.user.id,
          role_name: this.rejectRoleName,
          status: "reject",
          reason: this.rejectReson
        };
        RoleRepository.approveRole(payload)
          .then(res => {
            this.rejectRoleModal = false;
            this.rejectRoleName = "";
          })
          .catch(error => {
            this.rejectRoleName = "";
            console.log(error);
          });
        // console.log(role);
      }
    },
    submit() {
      this.validate();
      if (this.isValid) {
        let payload = this.form;
        if (payload.password == "" || payload.confirmpassword == "") {
          delete payload.password;
          delete payload.confirmpassword;
        }
        UserRepository.update(this.user.id, payload)
          .then(res => {
            this.$router.push("/users");
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    validate() {
      this.$v.$touch();
    },
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
    uploadImageClick() {
      this.$refs.profileImg.click();
    },
    uploadImage(e) {
      let mimeType = e.target.files[0].type;
      let allowedMimeType = ['image/jpg', 'image/jpeg', 'image/png'];
      if(allowedMimeType.includes(mimeType)){
        const formData = new FormData();
        formData.append("profile_image", e.target.files[0]);
        formData.append("_method", "PATCH");
        UserRepository.updateImage(this.user.id, formData)
          .then(async resp => {
            if (resp.data) {
              await this.init();
              this.$refs.profileImg.value = "";
            }
          })
          .catch(error => {
            console.log(error);
          });
        this.imageerror = false;
      }else{
        this.imageerror = true;
      }      
    },
    async init() {
      const { data } = await UserRepository.get(this.$route.params.id);
      this.user = data.data;
      this.form.name = data.data.name;
      this.form.surname = data.data.surname;
      this.form.company = data.data.company;
      this.form.pin = data.data.pin;
      this.form.email = data.data.email;
    },
    clickUploadBtn(role) {
      this.$refs.file.click();
      this.role = role;
    },
    uploadFile(e) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("role_name", this.role);
      formData.append("user_id", this.user.id);
      RoleRepository.uploadDocument(formData)
        .then(async res => {
          await this.init();
          // await this.$store.commit("Auth/updateUserData", this.user);
          this.$refs.file.value = "";
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectRole(val) {
      this.user.id;
      let payload = {
        role_name: val,
        user_id: this.user.id
      };
      RoleRepository.addNewRole(payload).then(async res => {
        this.init();
        await this.init();
        // await this.$store.commit("Auth/updateUserData", this.user);
        this.rolesDropDown = false;
      });
    }
  }
};
</script>
<style src="spinkit/spinkit.min.css"></style>
<style scoped>
.role-status p{
  margin-top:none;
}
.profile-container {
  background: #ffffff;
  padding: 30px;
}
.profile-image {
  height: auto;
  width: 100%;
}
p {
  margin-top: 5px;
  margin-bottom: 0;
}
.alredy-uploaded {
  margin: 0;
  margin-bottom: 5px;
  padding: 10px;
}
.dash-see-category {
  padding: 8px 15px;
  text-align: center;
  margin: 0;
  margin-top: 20px;
}
.upload {
  color: #3399ff;
  margin-top: 5px;
}
.upload:hover {
  text-decoration: none;
  color: #2778c9;
}
.approve {
  color: #26994d;
  margin-top: 5px;
  margin-left: 10px;
}
.approve:hover {
  text-decoration: none;
  color: #16572c;
}
.reject {
  color: #e03232;
  margin-top: 5px;
  margin-left: 10px;
}
.reject:hover {
  text-decoration: none;
  color: #8f2222;
}
@media (max-width: 575px) {
  .dash-see-category {
    margin-bottom: 25px;
  }
}
</style>