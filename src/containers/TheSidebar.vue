<template>
  <CSidebar 
    :minimize="minimize"
    unfoldable
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
    class="seme-menu"
  >
    <CSidebarBrand class="d-md-down-none seme-logo-container" to="/">
      <div class="semi-logo">
        <img
          src="img/semenika/semenika-logo.png"
          class="semi-logo-img "
        />
      </div>
    </CSidebarBrand>
    <ul class="seme-sidebar">
      <li class="c-sidebar-nav-item head-item" @click="activeLabels = !activeLabels"> Моите етикети</li> 
      <ul class="seme-sidebar" id="minimized-li" :class="{active: activeLabels}">
        <li class="c-sidebar-nav-item">
          <a class="c-sidebar-nav-link" href="/#/labels">
            <img src="img/semenika/bill.png" class="icon-pic"> Моите етикети
          </a>
        </li>
        <li class="c-sidebar-nav-item">
          <a class="c-sidebar-nav-link" href="/#/">
            <img src="img/semenika/box.png" class="icon-pic"> Опаковане на семена
          </a>
        </li> 
        <li class="c-sidebar-nav-item">
          <a class="c-sidebar-nav-link" href="/#/">
            <img src="img/semenika/cart.png" class="icon-pic"> Продажба на семена
          </a>
        </li> 
        <li class="c-sidebar-nav-item">
          <a class="c-sidebar-nav-link" href="/#/">
            <img src="img/semenika/truck.png" class="icon-pic"> Транспорт на семена <br> Товарене
          </a>
        </li>  
        <li class="c-sidebar-nav-item">
          <a class="c-sidebar-nav-link" href="/#/">
            <img src="img/semenika/hand-cart.png" class="icon-pic"> Транспорт на семена <br> Разтоварване
          </a>
        </li>
        <li class="c-sidebar-nav-item">
          <a class="c-sidebar-nav-link" href="/#/">
            <img src="img/semenika/box-2.png" class="icon-pic"> Разопаковане
          </a>
        </li>     
        <li class="c-sidebar-nav-item">
          <a class="c-sidebar-nav-link" href="/#/">
            <img src="img/semenika/search.png" class="icon-pic"> Търсене на етикет
          </a>
        </li> 
      </ul>

      <li class="c-sidebar-nav-item head-item" @click="activeApply = !activeApply"> Заявления</li>
        <ul class="seme-sidebar" id="minimized-li" :class="{active: activeApply}">
          <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="/#/userapply">
              <img src="img/semenika/document.png" class="icon-pic"> Подаване на заявление за <br> за издаване на етикети
            </a>
          </li>
          <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="/#/">
              <img src="img/semenika/potion.png" class="icon-pic"> Подаване на заявление за <br> за вземане на проби
            </a>
          </li>
          <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="/#/seedcertification">
              <img src="img/semenika/bean.png" class="icon-pic"> Подаване на заявление за <br> сертификация на <br> посевен материал
            </a>
          </li>
          <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="/#/">
              <img src="img/semenika/bean-2.png" class="icon-pic"> Подаване на заявление за <br> сертификация на <br> посадъчен материал
            </a>
          </li>
          <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="/#/">
              <img src="img/semenika/healty.png" class="icon-pic"> Подаване на заявление за <br> сертификация на <br> семена от картофи
            </a>
          </li>
          <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="/#/adminissue">
              <img src="img/semenika/document.png" class="icon-pic"> Издаване на етикети
            </a>
          </li>
        </ul>
      
      <li class="c-sidebar-nav-item head-item" @click="activePermissions = !activePermissions"> Разрешение и удостоверения</li>
        <ul class="seme-sidebar" id="minimized-li" :class="{active: activePermissions}">
        
        </ul>

      <li class="c-sidebar-nav-item head-item" @click="activeRegister = !activeRegister"> Регистри</li>
        <ul class="seme-sidebar" id="minimized-li" :class="{active: activeRegister}">
          <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="/#/registers">
              <img src="img/semenika/my-profile.png" class="icon-pic"> Лица които търгуват с <br> посевен или посадъчен <br> материал
            </a>
          </li>
          <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="/#/register/1">
              <img src="img/semenika/my-profile.png" class="icon-pic"> Физически лица, получили <br> разрешения за вземане на <br> проби от семена <br>(пробовземачи)
            </a>
          </li>
          <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="/#/register/2">
              <img src="img/semenika/my-profile.png" class="icon-pic">Лаборатории, получили <br> разрешение от ИАСАС<br> за  извършване на <br> лабораторни анализи на <br> посевни качества на <br>семената 
            </a>
          </li>
          <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="/#/register/3">
              <img src="img/semenika/my-profile.png" class="icon-pic"> Лица преминали курс на <br> обучение и успешно <br> положен изпит по <br> лабораторни методи за <br> анализ за чистота
            </a>
          </li>
          <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="/#/register/5">
              <img src="img/semenika/my-profile.png" class="icon-pic"> Полски инспектори <br> физически лица
            </a>
          </li>
          <li class="c-sidebar-nav-item">
            <a class="c-sidebar-nav-link" href="/#/register/4">
              <img src="img/semenika/my-profile.png" class="icon-pic"> Издадени разрешения на <br> лица, които предлагат на <br> пазара семена, <br> предназначени за научни <br> цели или селекционна <br> дейност
            </a>
          </li>
        </ul>
      
      <li class="c-sidebar-nav-item head-item" @click="activeProfile = !activeProfile"> Профил</li>
        <ul class="seme-sidebar" id="minimized-li" :class="{active: activeProfile}">
        <li class="c-sidebar-nav-item">
          <a class="c-sidebar-nav-link" href="/#/myprofile">
            <img src="img/semenika/my-profile.png" class="icon-pic"> Моят Профил
          </a>
        </li>
        <li class="c-sidebar-nav-item">
          <a class="c-sidebar-nav-link" href="/#/myprofile/edit">
            <img src="img/semenika/my-profile.png" class="icon-pic"> Редактиране на профила
          </a>
        </li>
        <li class="c-sidebar-nav-item">
          <a class="c-sidebar-nav-link" href="/#/myprofile/changepassword">
            <img src="img/semenika/my-profile.png" class="icon-pic"> Смяна на парола
          </a>
        </li>
        </ul>      
    </ul>
    <!-- <CRenderFunction flat :contentToRender="$options.nav"/> 
    <CSidebarMinimizer 
      class="c-d-md-down-none" 
      @click.native="$store.commit('toggle', 'sidebarMinimize')"
    />-->
  </CSidebar>
</template>

<script>
import nav from './_nav';
import {mapGetters} from "vuex";
export default {
  name: 'TheSidebar',
  nav,
  data(){
    return{
      activeLabels: false,
      activeApply: false,
      activePermissions: false,
      activeRegister: false,
      activeProfile: false,
      toRoute: '',
    }
  },
  created(){
      if(this.isMobile() === false){
        console.log(this.$route)

        this.toRoute = this.$route.fullPath;
        if(this.toRoute === '/labels'){
          this.allToFalse();
          this.activeLabels = true;
        }
        else if (this.toRoute === '/registers' || this.$route.name == "LinkRegisters"){
          this.allToFalse();
          this.activeRegister = true;
        }
        else if (this.toRoute === '/dashboard'){
          this.allToFalse();
        } else if (this.toRoute === '/myprofile'){
          this.allToFalse();
          this.activeProfile = true;
        }
      }
  },
  watch: {
    $route(to) {
      if(this.isMobile() === false){
        // console.log(to);
        this.allToFalse()
        this.toRoute = to.path;
        if(this.toRoute === '/labels'){
          this.allToFalse();
          this.activeLabels = true;
        }
        else if (this.toRoute === '/registers' || this.$route.name == "LinkRegisters"){
          this.allToFalse();
          this.activeRegister = true;
        }
        else if (this.toRoute === '/dashboard'){
          this.allToFalse();
        } else if (this.toRoute === '/myprofile'){
          this.allToFalse();
          this.activeProfile = true;
        }
      }
    }
  },
  computed: {
    ...mapGetters("Auth", ["isAdmin"]),
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  },
  methods: {
    allToFalse: function(){
      this.activeLabels = false
      this.activeApply = false
      this.activePermissions = false
      this.activeRegister = false
      this.activeProfile = false
    },
    isMobile() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style>

</style>