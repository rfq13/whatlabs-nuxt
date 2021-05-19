<template>
    <div class="col-sm-4 mt-3">
        <div class="card" style="width: 18rem;">
            <img :src="imgSrc" class="card-img-top" :alt="imgSrc">
            <div class="card-body">
                <h5 class="card-title">{{ title }}</h5>
                <p class="card-text">{{ desc }}</p>
                <a href="#" :class="btnClass" @click.prevent="sayHi()">
                    <slot/>
                </a>
                <a href="#" :class="btnCloseClass" @click.prevent="closecard(sid)">
                    <i class="fas fa-times"></i>
                </a>
                
                    <ul class="list-group mt-3">
                        <div v-for="(stat,i) in session_status" :key="i">
                            <li class="list-group-item" v-if="stat.id == sid">
                                <!-- {{ stat.text }} -->
                                {{ stat.text }}
                            </li>
                        </div>
                    </ul>
            </div>
        </div>
    </div>
</template>
<style>
.list-group{
    max-height: 300px;
    margin-bottom: 10px;
    overflow:scroll;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}
</style>
<script>
export default {
    props: {
        sid:{
            type:String,
            required: true
        },
        btnClass:{
            type:String,
            default:'btn btn-warning'
        },
        btnCloseClass:{
            type:String,
            default:'btn btn-danger'
        },
        title:{
            type:String,
            default:'title'
        },
        desc:{
            type:String,
            default:'desc'
        },
        imgSrc:{
            type:String,
            default:'/loading.gif'
        },
        session_status:{
            // type: Array,
            default: () => []
        }
    },
    created(){
        console.log(this.session_status,'sesstatus');
    },
    data(){
        return{
            // helloBackVar: 'Hello Parent',
        }
    },
    methods: {
        closecard(id) {
            this.$eventHub.emit('closecard',id);
        },
        sayHi() {
            alert('hai joel!');
        },
    },
}
</script>