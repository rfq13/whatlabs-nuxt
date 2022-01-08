<template>
  <div class="pb-3">
      <div
        v-for="(intent, i) in dataConv"
        :key="i"
      >
      
          <b-card class="mb-3">
            <b-row class="mb-3">
              <b-col>
                <b-form-input
                  :value="intent.key"
                  placeholder="Intent"
                  size="sm"
                  class="invisible-form-control"
                  @blur="changeIntent($event,{intentId:intent._id,prev:intent.key})"
                  @keyup.enter="blurOnEnter($event)"
                ></b-form-input>
              </b-col>
              <span style="color:red;" @click="deleteIntent($event,{intentId:intent._id,prev:intent.key})">
                <i class="fa fa-times mr-2" aria-hidden="true"></i>
              </span>
            </b-row>
            <b-row>
              <b-col lg="6" v-for="(conv,k) in intent.conversations" :key="k">
                <conversationItem :conv="conv" :intent="intent" :createConv="createConv" :deleteConv="deleteConv" :changeConv="changeConv" />
              </b-col>
            </b-row>
          </b-card>
        <!-- </b-card-group> -->
      </div>
  </div>
</template>

<style scoped>
.card-custom-width{
  width: 350px;
}
</style>

<script>

import conversationItem from "./conversationItem.vue";
export default {
  data() {
    return {
      edit: {},
    }
  },
  components: {conversationItem},
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
  filters: {
    
  },
  props: {
    title: {
      type: String,
      default:"title"
    },
    dataConv: {
      type: Array,
    },
    movePage: {
      type: Function,
      required:true
    },
    deleteIntent: {
      type: Function,
      required:true
    },
    changeIntent: {
      type: Function,
      required:true
    },
    deleteConv: {
      type: Function,
      required:true
    },
    createConv: {
      type: Function,
      required:true
    },
    changeConv: {
      type: Function,
      required:true
    },
  },
  created() {
  },
  mounted() {
    // console.log(this.dataConv);
  },
  methods: {
    blurOnEnter(e) {
      //   console.log('lohi')
      e.target.blur()
    },
  }
}
</script>
