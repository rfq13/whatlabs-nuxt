<template>
  <div id="wrapper">
    <app-sidebar v-if="isAuthenticated"></app-sidebar>
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <app-header v-if="isAuthenticated"></app-header>
        <Nuxt />
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import Header from '@/components/layouts/Header.vue';
  import Sidebar from '@/components/layouts/Sidebar.vue';
  export default {
    colorMode: 'light',
    computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser'])
    },
    data(){
      return{
      }
    },
   components:{
     'app-sidebar':Sidebar,
     'app-header':Header
   }
  }
</script>