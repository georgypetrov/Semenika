<template>
    <div class="apply-container">
        <h2>Подаване на онлайн заявление за сертификация на посевен материал</h2>
        <hr 
        class="in-dash-line">
        <CForm class="inner-aplly-container">
            <CRow class="cert-row">
                <CCol sm="12" md="5">
                  <h4 class="heading-text">От:</h4>
                </CCol>
                <CCol sm="12" md="7">
                    <p 
                    id="dynamicName">Name Surname, Company Name</p>
                </CCol>
            </CRow>
            <CRow class="cert-row" style="margin-bottom: 30px;">
                <CCol sm="12" md="5">
                  <h4 class="heading-text">До:</h4>
                </CCol>
                <CCol sm="12" md="7">
                  <p>ИЗПЪЛНИТЕЛНА АГЕНЦИЯ ПО СОРТОИЗПИТВАНЕ, АПРОБАЦИЯ И СЕМЕКОНТРОЛ</p>
                </CCol>
            </CRow>
            <CRow>
              <CCol sm="12" md="12">
                <h4 class="heading-text">Статут на заявителя</h4>
              </CCol>
              <CCol sm="12" md="12" class="check-box-container">
                <input
                  class="form-check-input cert-check"
                  type="radio"
                  value="creator"
                  id="creator"
                  v-model= "picker"
                />                  
                <p class="check-text">създател и/или сортоподдържащ на сорта</p>
              </CCol>
              <CCol sm="12" md="12" class="check-box-container">
                <input
                  class="form-check-input cert-check"
                  type="radio"
                  value="contracted"
                  id="contracted"
                  v-model= "picker"
                />               
                <p class="check-text">оправомощено/сключило лицензионен договор физическо или юридическо лице, когато за сорта има издаден национален или европейски сертификат за правна закрила</p>
              </CCol>
              <CCol sm="12" md="12" class="check-box-container">
                <input
                  class="form-check-input cert-check"
                  type="radio"
                  value="free-variety"
                  id="free-variety"
                  v-model= "picker"
                />               
                <p class="check-text">физическо или юридическо лице, което притежава семена от свободен сорт от категория, за която е възможно да се продължи схемата на сертификация</p>
              </CCol>
              <CCol sm="12" md="12" class="check-box-container">
                <input
                  class="form-check-input cert-check"
                  type="radio"
                  value="paid-variety"
                  id="free-variety"
                  v-model= "picker"
                />               
                <p class="check-text">лице, което е закупило семена от сорт с правна закрила, който е продаван от притежателя на сертификат без ограничения за преразмножаване</p>
              </CCol>
            </CRow>
            <CRow style="margin-top: 20px;">
              <CCol sm="12" md="12">
                <h4 class="heading-text">Уважаеми господине (госпожо), заявявам за сертификация посевен материал:</h4>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="4" md="4">
                <p class="box-heading">Вид</p>
                <input
                type="text"
                class="lot-numbers"
                v-model="kind">
              </CCol>
              <CCol sm="4" md="4">
                <p class="box-heading">Сорт</p>
                <input
                type="text"
                class="lot-numbers"
                v-model="variety">
              </CCol>
              <CCol sm="4" md="4">
                <p class="box-heading">Категория</p>
                <input
                type="text"
                class="lot-numbers"
                v-model="category">
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6" md="6">
                <h5>Местонахождение:</h5>
                <input
                type="text"
                class="lot-numbers"
                v-model="location">
              </CCol>
              <CCol sm="6" md="6">
                <h5>БЗС (кадастрален) №</h5>
                <input
                type="text"
                class="lot-numbers"
                v-model="kadNumber">
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6" md="6">
                <h5>Размер на площта [dca]:</h5>
                <input
                type="text"
                class="lot-numbers"
                v-model="areaSize">
              </CCol>
              <CCol sm="6" md="6">
                <h5>Предшественик</h5>
                <input
                type="text"
                class="lot-numbers"
                v-model="parent">
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6" md="6">
                <h5>Полска инспекция</h5>
                <input
                type="text"
                class="lot-numbers"
                v-model="inspector">
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6" md="6">
                <h5>Окачествен посадъчен материал</h5>
                <input
                type="text"
                class="lot-numbers"
                placeholder="ИАСАС"
                v-model="material">
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6" md="6">
                <h5>Лаборатория за здравен анализ</h5>
                <input
                type="text"
                class="lot-numbers"
                placeholder="ИАСАС"
                v-model="laboratory">
              </CCol>
            </CRow>
            <CRow style="margin-top: 20px; ">
              <CCol sm="12" md="12">
                <h4 class="heading-text" style="margin-bottom: 20px;">Приложение</h4>
                <div class="image-upload">
                  <label for="file-input" class="file-input">
                    <img src="img/semenika/upload-logo.png" style="height:35px;"/>
                    <p>скица на посева (актуална за съответната година)</p>
                  </label>
                  <input id="file-input" type="file" />
                </div>
                <div class="image-upload colored">
                  <label for="file-input" class="file-input">
                    <img src="img/semenika/upload-logo.png" style="height:35px;"/>
                    <p>документи за изходния материал</p>
                  </label>
                  <input id="file-input" type="file" />
                </div>
                <div class="image-upload">
                  <label for="file-input" class="file-input">
                    <img src="img/semenika/upload-logo.png" style="height:35px;"/>
                    <p>документ, издаден от Българската агенция по безопастност на храните (БАБХ), удостоверяващ липсата на нематоди в площите, предназначени за създаване на насаждения за производство на посадъчен материал</p>
                  </label>
                  <input id="file-input" type="file" />
                </div>
                <div class="image-upload colored">
                  <label for="file-input" class="file-input">
                    <img src="img/semenika/upload-logo.png" style="height:35px;"/>
                    <p>копие от регистрационна карта на земеделски стопанин/производител издадена от областна дирекция "Земеделие" към МЗХГ</p>
                  </label>
                  <input id="file-input" type="file" />
                </div>
                <div class="image-upload">
                  <label for="file-input" class="file-input">
                    <img src="img/semenika/upload-logo.png" style="height:35px;"/>
                    <p>копие от договор с притежателя на сертификат, когато сортът е защитен</p>
                  </label>
                  <input id="file-input" type="file" />
                </div>
                <div class="image-upload colored">
                  <label for="file-input" class="file-input">
                    <img src="img/semenika/upload-logo.png" style="height:35px;"/>
                    <p>други документи</p>
                  </label>
                  <input id="file-input" type="file" />
                </div>                                
              </CCol>
            </CRow>
            <CButton color="success" id="go-next" class="apply-submit" @click="submit()">ИЗПРАТИ</CButton>
        </CForm>
    </div>
</template>

<script>
export default {
  name: 'SeedCertification',
  components: {
  },
  data () {
    return {
      picker: '',
      kind: '',
      variety: '',
      category: '',
      location: '',
      kadNumber: 0,
      areaSize: 0,
      parent: '',
      inspector: '',
      material: '',
      laboratory: ''
    }
  },
  methods: {

  }
}
</script>
<style scoped>
  .cert-check{
    margin-top: 11px;
    margin-left: 0px!important;
  }
  h5{
    width: 100%;
  }
  .image-upload>input {
    display: none;
  }
  .file-input{
    display: flex;
    padding-top: 10px;
  }
  .file-input p {
    margin-left: 10px;
  }
  .colored{
    background: #f6f6f6;
  }
  .image-upload{
    min-height: 55px;
    margin-bottom: 10px;
  }
</style>