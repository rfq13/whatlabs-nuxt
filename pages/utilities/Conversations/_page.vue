<template>
  <b-container fluid>
    <b-card no-body class="mb-3">
      <b-card-body>
        <!-- <component :is="component"/> -->
        <cardBody :mode="component"></cardBody>
      </b-card-body>
    </b-card>
  </b-container>
</template>
<script>
import cardBody from '../../../components/cardNav/cardBody.vue'
export default {
  async asyncData({ store }) {
    await Promise.all([store.dispatch('conversations/convData')])
    return
  },
  mounted() {

    this.$eventHub.on('conv', (cond) => {
      console.log(cond)
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('pushState')
  },
  components: {
    cardBody
  },
  data() {
    return {
      component: '',
    }
  },
  methods: {
    changeComponent(comp) {
      this.component = comp
      this.$nuxt.$emit('pushState', comp)
    },
  }
}
</script>
