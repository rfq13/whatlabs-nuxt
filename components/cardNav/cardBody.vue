<template>
  <div class="pb-3">
    <div v-if="mode == `b1`">
      <b-row>
        <b-col>
          <b-card-title>Conversations</b-card-title>
        </b-col>
        <b-col>
          <div class="float-right">
            <b-dropdown
              size="md"
              dropleft
              variant="link"
              toggle-class="text-decoration-none"
              class="m-2"
              no-caret
            >
              <template #button-content>
                <b-icon
                  class="float-right"
                  icon="plus-square-fill"
                  font-scale="1"
                  aria-hidden="true"
                ></b-icon>
              </template>
              <b-dropdown-form @submit.stop.prevent>
                <b-form-input
                  id="dropdown-form-email"
                  size="sm"
                  placeholder="kategori.."
                  @keyup.enter="Ctg(false, $event, 'create')"
                ></b-form-input>
              </b-dropdown-form>
            </b-dropdown>
          </div>
        </b-col>
      </b-row>
      <b-container fluid="md">
        <b-row class="mb-3">
          <div
            v-for="(conv, i) in conversations"
            :key="i"
            class="col-lg-6 mt-3"
          >
            <b-card-group deck>
              <b-card>
                <b-row class="mb-3">
                  <b-col>
                    <b-form-input
                      :value="i | capitalize"
                      placeholder="Category"
                      size="sm"
                      @blur="Ctg(i, $event, 'update')"
                      @keyup.enter="$event.target.blur"
                    ></b-form-input>
                  </b-col>
                  <span style="color:red" @click="Ctg(i, $event, 'delete')">
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </span>
                </b-row>
                <b-row>
                  <b-col lg="6">
                    <b-badge
                      href="javascript:void(0)"
                      variant="primary"
                      class="capitalize"
                      >training phrase</b-badge
                    >
                    <b-icon
                      @click.prevent="Create(`${i}|p`)"
                      class="float-right"
                      icon="plus-circle-fill"
                      font-scale="1"
                      aria-hidden="true"
                    ></b-icon>
                    <b-list-group class="mt-2">
                      <b-list-group-item
                        button
                        v-for="(p, k) in conv.pertanyaan"
                        :key="k"
                        @click="Edit(`${i}|p|${p}`)"
                        class="d-flex justify-content-between align-items-center"
                      >
                        <!-- {{ p }} -->
                        <!-- (`${i} p ${k}`) -->
                        <!-- :ref="i+'|p|'+p" -->
                        <!-- <span v-if="">{{ p }}</span> -->
                        <b-form-input
                          :ref="i + '|p|' + p"
                          :value="conv.pertanyaan[k]"
                          placeholder="Question"
                          @blur="Update(`${i}|p|${p}`, $event)"
                          :readonly="!edit[i].pertanyaan[p]"
                          @keyup.enter="blurOnEnter($event)"
                          size="sm"
                        ></b-form-input>

                        <a
                          href="javascript:void(0)"
                          @click.prevent="Delete(`${i}|p|${p}`)"
                          ><i class="fas fa-times-circle"></i
                        ></a>
                      </b-list-group-item>
                    </b-list-group>
                  </b-col>
                  <b-col lg="6">
                    <b-badge
                      href="javascript:void(0)"
                      variant="info"
                      class="capitalize"
                      >output</b-badge
                    >
                    <b-icon
                      @click.prevent="Create(`${i}|j`)"
                      class="float-right"
                      icon="plus-circle-fill"
                      font-scale="1"
                      aria-hidden="true"
                    ></b-icon>
                    <b-list-group class="mt-2">
                      <b-list-group-item
                        button
                        v-for="(p, k) in conv.jawaban"
                        :key="k"
                        @click="Edit(`${i}|j|${p}`)"
                        class="d-flex justify-content-between align-items-center"
                      >
                        <!-- {{ p }} -->
                        <!-- (`${i} p ${k}`) -->
                        <!-- :ref="i+'|p|'+p" -->
                        <!-- <span v-if="">{{ p }}</span> -->
                        <b-form-input
                          :ref="i + '|j|' + p"
                          :value="conv.jawaban[k]"
                          placeholder="Answers"
                          @blur="Update(`${i}|j|${p}`, $event)"
                          :readonly="!edit[i].jawaban[p]"
                          @keyup.enter="blurOnEnter($event)"
                          size="sm"
                        ></b-form-input>

                        <a
                          href="javascript:void(0)"
                          @click.prevent="Delete(`${i}|j|${p}`)"
                          ><i class="fas fa-times-circle"></i
                        ></a>
                      </b-list-group-item>
                    </b-list-group>
                  </b-col>
                </b-row>
              </b-card>

              <!-- <b-card title="Title" header-tag="header" footer-tag="footer">
                                <template #header>
                                    <h6 class="mb-0">Header Slot</h6>
                                </template>
                                <b-card-text>Header and footers using slots.</b-card-text>
                                <b-button href="#" variant="primary">Go somewhere</b-button>
                                <template #footer>
                                    <em>Footer Slot</em>
                                </template>
                            </b-card> -->
            </b-card-group>
          </div>
        </b-row>
        <b-button variant="primary" @click.prevent="cekConv(mode)"
          >Go somewhere</b-button
        >
      </b-container>
    </div>
    <div v-else-if="mode == `b2`">
      <b-card-title>Card Judul</b-card-title>

      <b-card-text>
        With supporting text below as a natural lead-in to additional content.
      </b-card-text>

      <b-button variant="warning" @click.prevent="cekConv(mode)"
        >Go somewhere</b-button
      >
    </div>
    <div v-else>
      <b-card-title>Card Aran</b-card-title>

      <b-card-text>
        With supporting text below as a natural lead-in to additional content.
      </b-card-text>

      <b-button variant="success" @click.prevent="cekConv(mode)"
        >Go somewhere</b-button
      >
    </div>
  </div>
</template>

<style scoped>
.capitalize {
  text-transform: capitalize;
}

.form-control:focus,
.form-control:active {
  background: transparent;
  border: none;
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
}

.form-control[readonly] {
  background-color: transparent;
  border: 0;
  font-size: 1em;
}

.form-control {
  border: none;
}
</style>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      edit: {}
    }
  },
  components: {},
  filters: {
    capitalize: (value) => {
      value = value.replace('_', ' ')
      return (
        value
          .toString()
          .charAt(0)
          .toUpperCase() + value.slice(1)
      )
    }
  },
  props: {
    mode: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('conversations', {
      conversations: (state) => state.conversations
    })
  },
  created() {
    this.init()
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      Object.keys(this.conversations).forEach((key, i) => {
        const conv = this.conversations
        let pert = { pertanyaan: {}, jawaban: {} }
        const pertanyaan = conv[key].pertanyaan
        const jawaban = conv[key].jawaban
        this.$set(this.edit, key, pert)

        pertanyaan.forEach((p) => {
          this.$set(this.edit[key]['pertanyaan'], p, false)
        })

        jawaban.forEach((p) => {
          this.$set(this.edit[key]['jawaban'], p, false)
        })
      })
    },
    //k -> key| e -> event | m -> mode
    Ctg(key, e, act) {
      const val = e.target.value
      const newKey = val ? val.replace(' ', '_').toLowerCase() : val

      if (key != newKey) {
        this.$store.dispatch('conversations/convData', [key, newKey, act])

        if (val) {
          this.$nextTick(() => {
            this.$set(this.edit, newKey, {
              pertanyaan: { '': false },
              jawaban: { '': false }
            })
          })
        }
      }

      if (act == 'create') {
        if (val) {
          e.target.value = ''
        }
      }
    },
    cek(e) {
      // console.log(e.value);
    },
    cekConv(cond) {
      this.$eventHub.emit('conv', cond)
    },
    updateInputStatus(key, val) {
      const params = key.split('|')
      const type = params[1] == 'p' ? 'pertanyaan' : 'jawaban'

      this.$set(this.edit[params[0]][type], params[2], val)
    },
    Edit(key) {
      this.updateInputStatus(key, true)
      this.$nextTick(() => this.$refs[key][0].focus())
    },
    Create(key) {
      const val = ''
      const act = 'create'

      this.$store.dispatch('conversations/convData', [key, val, act])
    },
    Update(key, e) {
      const val = e.target.value
      const act = 'update'
      const params = key.split('|')
      if (val !== params[2]) {
        this.$store.dispatch('conversations/convData', [key, val, act])
      }
      this.updateInputStatus(key, false)
    },
    blurOnEnter(e) {
      //   console.log('lohi')
      e.target.blur()
    },
    Delete(key) {
      const val = ''
      const act = 'delete'
      this.$store.dispatch('conversations/convData', [key, val, act])
    }
  }
}
</script>
