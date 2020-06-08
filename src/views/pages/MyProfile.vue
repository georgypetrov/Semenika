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
        <h4 class="heading-text" style="margin:0;">{{ fullName }}</h4>
        <p>{{ company }}</p>
        <br />
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
            </div>
          </CCol>
          <CCol sm="5" md="5">
            <div class="role-status">
              <template v-if="role.status == 'requested'">
                <a href="#" @click.prevent="clickUploadBtn(role.name)" class="upload">Качи документ</a>
              </template>
              <template v-if="role.status == 'pending'">
                <a :href="role.document" target="_blank">Виж документите</a>
              </template>
            </div>
          </CCol>
        </CRow>
        <input type="file" id="documentUpload" ref="file" style="display:none" @change="uploadFile" />
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
              >Cancle</button>
            </template>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import Repository from "@/repositories/RepositoryFactory";
const AuthRepository = Repository.get("auth");
const RoleRepository = Repository.get("role");
import { Utils } from "@/_helpers/utils";

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
      imageerror: false,
    };
  },
  computed: {
    fullName() {
      return this.user ? this.user.name + " " + this.user.surname : "";
    },
    company() {
      return this.user ? this.user.company : "";
    },
    roles() {
      return this.user ? this.user.unapprove_role : [];
    },
    rolesOptions() {
      return this.rolesDefaultOptions.filter(item => {
        let requestedRoles = Utils.filterNames(this.roles);
        return !requestedRoles.includes(item.value);
      });
    }
  },
  async created() {
    this.init();
  },
  methods: {
    uploadImageClick() {
      this.$refs.profileImg.click();
    },
    uploadImage(e) {          
      let mimeType = e.target.files[0].type;
      let allowedMimeType = ['image/jpg', 'image/jpeg', 'image/png'];
      if(allowedMimeType.includes(mimeType)){
        const formData = new FormData();
        formData.append("profile_image", e.target.files[0]);
        AuthRepository.userImageUpdate(formData)
        .then(async resp => {
          if (resp.data) {
            await this.init();
            await this.$store.commit("Auth/updateUserData", this.user);
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
      const { data } = await AuthRepository.user();
      this.user = data.data;
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
          await this.$store.commit("Auth/updateUserData", this.user);
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
        await this.$store.commit("Auth/updateUserData", this.user);
        this.rolesDropDown = false;
      });
    }
  }
};
</script>
<style src="spinkit/spinkit.min.css"></style>
<style scoped>
.profile-container {
  background: #ffffff;
  padding: 30px;
}
.profile-image {
  height: auto;
  width: 100%;
}
p,{
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
@media (max-width: 575px) {
  .dash-see-category {
    margin-bottom: 25px;
  }
}
</style>