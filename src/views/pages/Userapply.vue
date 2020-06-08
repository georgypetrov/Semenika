<template>
  <div class="apply-container">
    <h2>Подаване на онлайн заявления за издаване на етикети</h2>
    <hr 
    class="in-dash-line">
      <CForm class="inner-aplly-container">
        <CRow>
          <CCol sm="12" md="6">
            <h4 class="heading-text">Заявител</h4>
          </CCol>
          <CCol sm="12" md="6">
              <p 
              id="dynamicName">Name Surname, Company name</p>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="2" md="2">
            <h4 class="heading-text">До</h4>
          </CCol>
          <CCol class="col-sm-6 col-md-6 offset-sm-2 offset-md-2">
            <input 
              type="text" 
              class="form-control" 
              placeholder="">
          </CCol>
          <CCol sm="2" md="2">
            <span 
            id="additional-text">
              ТЗ на ИАСАС
            </span>
          </CCol>
        </CRow>
        <CRow style="margin-top:20px;">
          <CCol>
            <h4 class="heading-text">№ на акта за апробация:</h4>
            <input 
              type="text" 
              class="form-control" 
              placeholder="">
          </CCol>
        </CRow>
        <CRow style="margin-top:20px; margin-bottom:20px;">
          <CCol>
            <h4 class="heading-text">Инспектор:</h4>
            <input 
              type="text" 
              class="form-control" 
              placeholder="Име на полския инспектор">
          </CCol>
        </CRow>
        <h4 class="heading-text">Инспектиран посев</h4>
        <CRow>
          <CCol md="6">
            <CSelect
              class=""
              :value.sync="crop"
              :options="['Пшеница','Овес','Лавандула']"
              custom
              prepend="Ботанически вид:"
            />
            <CSelect
              class=""
              value="Зърнени"
              :options="['Зърнени','Маслодайни култури','Земеделска култура']"
              custom
              prepend="Категория:"
            />
          </CCol>
          <CCol md="6">
            <CSelect
              class=""
              value="Гинра"
              :options="['Надита','Гинра','Гизда', 'Боряна']"
              custom
              prepend="Сорт:"
            />
          </CCol>
        </CRow>  
        <h4 class="heading-text">Вид етикет</h4>
        <CRow>
          <CCol md="6">
            <p>По чл.29, ал.6 от ЗППМ</p>
          </CCol>
          <CCol md="6" class="col-right">
            <input
              class="form-check-input type-check"
              type="radio"
              value="ZPPM"
              id="ZPPM"
              v-model= "picker"
            />
            <div></div>
          </CCol>
          <CCol md="6">
            <p>OECD</p>
          </CCol>
          <CCol md="6" class="col-right">
            <input
              class="form-check-input type-check"
              type="radio"
              value="OECD"
              id="OECD"
              v-model= "picker"
            />
            <div></div>
          </CCol>
          <CCol md="6">
            <p>Неокончателно сертифициране</p>
          </CCol>
          <CCol md="6" class="col-right">
            <input
              class="form-check-input type-check"
              type="radio"
              value="not-yet"
              id="not-yet"
              v-model= "picker"
            />
            <div></div>
          </CCol>
        </CRow>
        <CRow>
          <CCol md="6 lot">
          <h4 class="heading-text">Партида:</h4>
            <td>
              <p>Номер</p>
              <input
              type="text"
              class="lot-numbers"
              v-model="lotNumber">
            </td>
            <td>
              <p>Сериен №</p>
              <input
              type="text"
              class="lot-numbers"
              v-model="serialNumber">
            </td>
            <td>
              <p>Kоличество</p>
              <input
              type="text"
              class="lot-numbers"
              v-model="amount"
              style="width:70%">
              <p style="position: relative; bottom: 25px; left: 75px;">кг.</p>
            </td>
          </CCol>
          <CCol md="6" class="lot">
            <h4 class="heading-text">Етикети</h4>
            <td>
              <p >Брой</p>
              <input
              type="text"
              class="lot-numbers"
              v-model="labelNumber">
            </td>
            <td>
              <p>Количество</p>
              <input
              type="text"
              class="lot-numbers"
              v-model="labelAmount">
            </td>
            <td style="position: relative; top: 42px;">
              <CSelect
                class=""
                :value.sync="unit"
                :options="['Грам','Килограм','Тон']"
                custom
                style="width: 150px;"
              />
            </td>
          </CCol>
          <!--<button 
            id="add-new-btn">
            <span>+</span> Добави нов ред</button>
          -->
          <CCol md="12">
            <h4 class="heading-text">Информация за третиране на семената:</h4>
            <textarea 
              class="form-control seeds-info" 
              id="message" 
              name="body" 
              rows="5" 
              placeholder="Химически третирания, тъговско име на препарата"
            ></textarea>
          </CCol>
        </CRow>
        <CButton color="success" id="go-next" class="apply-submit" @click="submit()">ИЗПРАТИ</CButton>
      </CForm>
  </div>
</template>

<script>
export default {
  name: 'Userapply',
  components: {

  },
  data () {
    return {
      picker: '',
      lotNumber: 0,
      serialNumber: 0,
      amount: 0,
      labelNumber: 0,
      labelAmount: 0,
      seedsInfo: '',
      crop: '',
      unit: '',

    }
  },
  methods: {
  }
}
</script>

<style>
/*input[type="radio"] {
   display: none;
}
input[type="radio"] + div {
   height: 20px;
   width: 20px;
   display: inline-block;
   cursor: pointer;
   vertical-align: middle;
   background: #FFF;
   border: 1px solid #d2d2d2;
   border-radius: 100%;
}
input[type="radio"] + div:hover {
	border-color: red;
}
input[type="radio"]:checked + div {
	background-color: red;
} */
</style>