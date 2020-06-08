<template>
    <div class="stepper">
      <div id="line" v-bind:style=" step == 1 ? 'background: linear-gradient(90deg, rgba(255,255,255,1) 40%, rgba(165,171,183,1) 60%);' : 'background: linear-gradient(90deg, rgba(165,171,181,1) 40%, rgba(255,255,255,1) 60%);'" >
        <div class="dot" id="left-dot" v-bind:style= "step == 1 ? 'background: #ffffff' : ''"></div>
        <div class="dot" id="right-dot" v-bind:style= "step == 2 ? 'background: #ffffff' : ''"></div>
      </div>
      <p class="stepper-additional" id="left" style="color:#b2b7c1" v-bind:style= "step == 1 ? 'color: #ffffff' : ''">Изберете тип профил</p>
      <p class="stepper-additional" id="right" style="color:#b2b7c1" v-bind:style= "step == 2 ? 'color: #ffffff' : ''">Въведете вашите данни</p>
    </div>
</template>
<script>
export default {
    name: 'Stepper',
    props: {
        step: {
            type: Number,
            default: 1
        }
    }
}
</script>
<style>
.stepper{
    width:100%;
    margin-bottom: 5%;
}
#line{
    height: 3px;
    width: 80%;
    background: #ffffff;
    margin: 10px auto;
}
.stepper-additional{
    position: relative;
    font-size: 10px;
    color: #b2b7c1;
}
#left{
    margin-left: 13%;
}
#right{
    margin-left: 68%;
    margin-top: -30px;
}
.dot{
    height: 20px;
    width: 20px;
    background: #b2b7c1;
    position: relative;
    border-radius: 50%;
}
.active{
    background: #ffffff;
}
#left-dot{
    top: -8px;
    left: 0px;
}
#right-dot{
    margin-top: -28px;
    margin-left: 96%;
}
</style>