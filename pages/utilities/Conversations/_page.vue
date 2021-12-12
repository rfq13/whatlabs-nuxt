<template>
  <b-container fluid>
    <b-card no-body class="mb-3">
      <b-card-header header-tag="nav">
        <b-nav card-header tabs>
          <b-nav-item
            :active="component == 'b1'"
            @click.prevent="changeComponent('b1')"
            >b1</b-nav-item
          >
          <b-nav-item
            :active="component == 'b2'"
            @click.prevent="changeComponent('b2')"
            >b2</b-nav-item
          >
          <b-nav-item
            :active="component == 'b3'"
            @click.prevent="changeComponent('b3')"
            >b3</b-nav-item
          >
        </b-nav>
      </b-card-header>

      <b-card-body>
        <!-- <component :is="component"/> -->
        <cardBody :mode="component"></cardBody>
      </b-card-body>
    </b-card>
  </b-container>
</template>
<script>
import cardBody from '@/components/cardNav/cardBody.vue'
export default {
  async asyncData({ store }) {
    await Promise.all([store.dispatch('conversations/convData')])
    return
  },
  created() {
    this.$nuxt.$on('pushState', (params) => {
      this.addHashToLocation(params)
    })
  },
  beforeMount() {
    this.component = this.$route.hash ? this.$route.hash.replace('#') : 'b1'
  },
  mounted() {
    const loc = window.location.href
    loc.split('#').forEach((page, i) => {
      const finding = Object.keys(this.btn).find((paramBtn) => paramBtn == page)
      if (finding) return this.changeComponent(finding)
    })

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
      btn: {
        b1: {
          active: false
        },
        b2: {
          active: false
        },
        b3: {
          active: false
        }
      }
    }
  },
  methods: {
    changeComponent(comp) {
      this.component = comp
      this.$nuxt.$emit('pushState', comp)
    },
    addHashToLocation(params) {
      return
      history.pushState(
        {},
        null,
        this.$route.path + '#' + encodeURIComponent(params)
      )
    }
  }
}
</script>
