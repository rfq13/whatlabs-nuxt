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
import { mapGetters } from 'vuex'
import Header from '@/components/layouts/Header.vue'
import Sidebar from '@/components/layouts/Sidebar.vue'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  beforeMount() {
    const themeMode = this.$colorMode.preference
    const el = document.getElementById('content-wrapper')

    console.log(el, themeMode)
    if (el && el.classList.contains(themeMode) == false) {
      el.classList.add(`nwa-${themeMode}-mode`)
      console.log(`nwa-${themeMode}-mode`)
    }
  },
  data() {
    return {}
  },
  components: {
    'app-sidebar': Sidebar,
    'app-header': Header
  }
}
</script>
