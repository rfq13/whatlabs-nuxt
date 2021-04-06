<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    <span>Caonnection</span>
                    <a href="javascript:void(0)" class="float-right btn btn-primary btn-sm" @click="dynamicallyInsert">add</a>
                    <a href="javascript:void(0)" class="float-right btn btn-warning mr-2 btn-sm" @click="change">add</a>
                </div>
            </div>
            <div class="card-body">
                <div class="row d-flex mr-auto" ref="body">
                    <div  v-for="(sess) in wa_sessions" :key="sess._id">
                        <cards v-if="sess.ready" :title="sess._id" :desc="sess.description"  imgSrc="https://docs.vuejs.id/images/logo.png" btnClass='btn btn-primary'>Ready dong!</cards>
                        <cards v-else :title="sess._id" :desc="sess.description" :imgSrc="qrSrc[sess._id]" btnClass='btn btn-primary'>Hello</cards>
                    </div>
                    <!-- <cards v-for="sess in wa_sessions" :key="sess._id" v-bind:imgSrc="testSrc['qewan']" btnClass='btn btn-primary'>Hello</cards> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import Cards from '@/components/Cards.vue';
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
    async asyncData({store}){
        await Promise.all([
            store.dispatch('user/getWaSessionsData')
        ]);
        return;
    },
    computed:{
        ...mapGetters(['loggedInUser']),
        ...mapState('user',{
            wa_sessions: state => state.wa_sessions
        })
    },
    data(){
        return{
            qrSrc:{},
            testSrc:{qewan:'tolol'}
        }
    },
    components:{
        "cards":Cards
    },
    beforeCreate(){
        console.log('before created');
    },
    created(){
        console.log('created');
    },
    beforeMount() {
        console.log('before mounted');
    },
    mounted(){
        console.log('mounted');
        
        const vm = this;
        vm.socket = this.$nuxtSocket({name:'main'}); 
        const io = vm.socket;

        io.on('message',(msg)=>{
            console.log(msg);
        })

        io.on('init',(data)=>{
            // console.log(data,'init bosssssss');
        })

        io.on('qr',(qr)=>{
            // this.testSrc['qewan'] = qr.src;
            this.$set(this.qrSrc, qr.id, qr.src)
            console.log(qr);
        })

        io.on('create-client',async (client)=>{
            await this.getWaSessionsData();
            // console.log(client,'ki lo client e');
        })

    },
    methods: {
        ...mapActions('user',['getWaSessionsData']),
        dynamicallyInsert(data) {
            const io = this.socket;
            const item = {
                user_id:this.loggedInUser._id,
                description:'create session from nuxt'
            };

            io.emit('create-session',item);
        },
        assignID(){
            // console.log(this.qrSrc,'sebelum');
            this.wa_sessions.forEach(sess => {
                this.qrSrc[sess._id] = undefined;
            });
            // console.log(this.qrSrc,'sesudah');
        },
        changeImg(key){
            var res = key.split(" ");
            this[res[0]][1] = res[2];
        },
        change(){
            this.changeImg(`testSrc 1 ${'https://forum.vuejs.org/uploads/default/original/2X/5/555257b8c5e7ecf34ce4f9b952eeaf006adfa339.png'}`);
        }
    }
}
</script>