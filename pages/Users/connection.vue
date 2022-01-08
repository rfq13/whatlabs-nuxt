<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <div class="card-title">
          <span>Connection</span>
          <a
            href="javascript:void(0)"
            class="float-right btn btn-primary btn-sm"
            @click="dynamicallyInsert"
            >add</a
          >
        </div>
      </div>
      <div class="card-body">
        <div class="row d-flex mr-auto" ref="body">
          <div v-for="sess in wa_sessions" :key="sess._id">
            <!-- <cards v-if="sess.ready" :session_status="statuses" :title="sess._id" :sid="sess._id" :desc="sess.description" imgSrc="https://docs.vuejs.id/images/logo.png" btnClass='btn btn-primary'>Hello</cards>
                        <cards v-else :session_status="statuses" :title="sess._id" :sid="sess._id" :desc="sess.description" :imgSrc="qrSrc[sess._id]" btnClass='btn btn-primary'>Hello</cards> -->
            <cards
              :session_status="statuses"
              :title="sess._id"
              :sid="sess._id"
              :desc="sess.description"
              :imgSrc="qrSrc[sess._id]"
              btnClass="btn btn-primary"
              >Hello</cards
            >
          </div>
          <!-- <cards v-for="sess in wa_sessions" :key="sess._id" v-bind:imgSrc="testSrc['qewan']" btnClass='btn btn-primary'>Hello</cards> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cards from '@/components/Cards.vue'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  async asyncData({ store }) {
    await Promise.all([store.dispatch('user/getWaSessionsData')])
    return
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState('user', {
      wa_sessions: (state) => state.wa_sessions
    })
  },
  data() {
    return {
      qrSrc: {},
      thanksMessage: '',
      statuses: {},
      // connectedImg:"http://simpleicon.com/wp-content/uploads/cloud-connection-2.png"
      connectedImg:"https://icons-for-free.com/iconfiles/png/512/communication+media+messenger+phone+social+speech+bubble+whatsapp-1320137108186587722.png"
    }
  },
  components: {
    cards: Cards
  },
  beforeCreate() {
    // console.log('before created');
  },
  created() {
    // console.log('created');
    //listen
  },
  beforeMount() {
    // console.log('before mounted');
  },
  mounted() {
    const vm = this
    vm.socket = this.$nuxtSocket({ name: 'main' })
    const io = vm.socket

    io.on('message', (msg) => {
      const thisStts = this.statuses
      const leng = Object.keys(thisStts).length
      const upd = []
      if (leng > 0) {
        thisStts.forEach((el, i) => {
          const ate = { id: el.id, text: el.text }
          upd.push(ate)
        })
      }
      upd.push(msg)

      this.statuses = upd
    })

    io.on('init', (data) => {
      // console.log(data,'init bosssssss');
    })

    io.on('qr', (qr) => {
      if (this.wa_sessions.length > 0) {
        const check = this.wa_sessions.filter(
          (sess) => sess._id == qr.id ?? false
        )
        if (check.length) this.$set(this.qrSrc, qr.id, qr.src)
      }
    })

    io.on('create-client', async (client) => {
      await this.getWaSessionsData()
      // console.log('create-client nich!');
    })

    io.on('remove-session', (id) => {
      this.$set(this.qrSrc, id, undefined)
    })

    io.on('authenticated', async (id) => {
      this.$set(this.qrSrc, id, this.connectedImg)
    })

    vm.$eventHub.on('closecard', (sessID) => {
      if (confirm('yakin hapus session?')) {
        console.log('it is a callbacke', sessID)
        io.emit('remove-session', sessID)
      }
    })
  },
  methods: {
    ...mapActions('user', ['getWaSessionsData']),
    dynamicallyInsert(data) {
      const io = this.socket
      const item = {
        user_id: this.loggedInUser._id,
        description: 'create session from nuxt'
      }

      io.emit('create-session', item)
    },
    tell() {
      // console.log('langsre');
    }
  }
}
</script>
