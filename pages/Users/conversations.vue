<template>
<b-container fluid>
    <b-row>
      Rabin Karp
      <div style="margin:0px 6px">
        <switchButton :checked="nlp_algo==1" :changeAlgo="changeAlgo"/>
      </div>
      Fuzzy Match
    </b-row>
    <b-card class="mb-3">
      <template #header>
        <b-row>
          <b-col>
            <h6 class="mt-3">Conversations</h6>
          </b-col>
          <b-col>
            <DropdownInput placeholder="intent name" :createIntent="createIntent"></DropdownInput>
          </b-col>
        </b-row>
      </template>
      <b-card-body>
        <CardConvLists :dataConv="conversations" :movePage="movePage" :deleteConv="deleteConv" :deleteIntent="deleteIntent" :changeConv="changeConv" :changeIntent="changeIntent" :createConv="createConv"></CardConvLists>
      </b-card-body>
    <div class="mt-3">
      <b-pagination 
      v-model="currentPage" 
      pills 
      :total-rows="rows" 
      :per-page="perPage" 
       align="center"
      @change="movePage"
      ></b-pagination>
    </div>
    </b-card>

    <!-- </b-row> -->
  </b-container>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
import cardConvLists from "../../components/cardConvLists.vue";
import DropdownInput from "../../components/DropdownInput.vue";
import switchButton from "../../components/switchButton.vue";
export default {
  async asyncData({ store }) {
    await Promise.all([store.dispatch('conversations/v2getConvData'),store.dispatch('generalsettings/nlpAlgo')]);
    return
  },
  data(){
    return{
      currentPage:1,
      perPage:10
    }
  },
  mounted(){
  },
  computed: {
    ...mapState('conversations', {
      conversations: (state) => state.v2_conversations,
      rows: (state) => state.rows,
    }),
    ...mapState('generalsettings', {
      nlp_algo: (state) => state.nlp_algo,
    }),
    ...mapGetters(['loggedInUser']),
  },
  components:{cardConvLists,DropdownInput,switchButton},
  methods: {
    movePage(page){
      this.currentPage = page;
      this.$store.dispatch('conversations/v2getConvData', [page, this.perPage])
    },
    createIntent(e){
      this.$store.dispatch('conversations/v2setConvData', {
        method:'post',
        intent:e.target.value,
        page: this.currentPage,
        perPage: this.perPage
      })

      e.target.value = "";
    },
    deleteIntent(e,params={}){
      params.method =  "delete";
      params.page = this.currentPage;
      params.perPage = this.perPage;
      this.$store.dispatch('conversations/v2setConvData', params)
    },
    createConv(e,params){
      params.method =  "post";
      params.page = this.currentPage;
      params.perPage = this.perPage;
      params.urlparam = `/${params.intentId}`;
      this.$store.dispatch('conversations/v2setConvData', params)
    },
    changeIntent(e,params){
      // {intentId,prev} --> params
      params.change = e.target.value;
      params.method = "put";
      params.page = this.currentPage;
      params.perPage = this.perPage;
      if (params.change != params.prev) {
        this.$store.dispatch('conversations/v2setConvData', params)
      }
    },
    deleteConv(e,params){
      // {intentId,conv_id,key} --> params
      console.log(params);

      const {intentId,conv_id,index} = params;
      
      const fixparams = {
        method:"delete",
        conv_id,
        index,
        page: this.currentPage,
        perPage: this.perPage,
        urlparam:`/${intentId}`
      }
      
      this.$store.dispatch('conversations/v2setConvData', fixparams);
    },
    changeConv(e,params){
      // {intentId,conv_id,index} --> params

      const {intentId,conv_id:subconv,index:change_index} = params;
      
      const fixparams = {
        method:"put",
        subconv,
        change_index,
        change_value:e.target.value,
        page: this.currentPage,
        perPage: this.perPage,
        urlparam:`/${intentId}`
      }
      
      if (fixparams.change_value != params.prev) {
        this.$store.dispatch('conversations/v2setConvData', fixparams)
      }
    },
    changeAlgo(e){
      // console.log(e.target.checked,"mayang",e);
      
      this.$store.dispatch('generalsettings/nlpAlgo', {
        method:"post",
        set:e.target.checked ? 1 : 2
      })
    }
  }
}
</script>
