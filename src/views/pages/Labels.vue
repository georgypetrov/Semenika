<template>
<div>
  <div class="user-label-container" v-show="isAdmin === false">
    <user-labels></user-labels>
  </div>
  <div class="admin-label-container" v-show="isAdmin === true">
    <admin-labels></admin-labels>
  </div>
</div>
</template>
<script>
import UserLabels from '@/components/UserLabels';
import AdminLabels from '@/components/AdminLabels';
import { mapGetters } from "vuex";

export default {
  name: 'Labels',
  components: {
    UserLabels,
    AdminLabels,
  },
  data () {
    return {
      // isAdmin: false
    }
  },
  computed:{
    ...mapGetters("Auth", ["isAdmin"])
  },
  methods: {

  }
}
</script>