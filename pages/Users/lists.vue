<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <div class="card-tittle">
                    <span>Users</span>
                    <a href="javascript:void(0)" class="float-right btn btn-primary btn-sm" @click="getUsersData">Reload</a>
                </div>
            </div>
            <div class="card-body">
                <b-table striped hover :items="users" :fields="fields" show-empty></b-table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions,mapState } from 'vuex';
export default {
    async asyncData({store}){
        await Promise.all([
            store.dispatch('user/getUsersData')
        ]);
        return;
    },
    data(){
        return{
            fields:['email','name','createdAt','password'],
        }
    },
    computed:{
        ...mapState('user',{
            users: state => state.users
        })
    },
    methods:{
        ...mapActions('user',['getUsersData']),
        cek(){
            console.log(this.users,'cwk data user');
        }
    }
}
</script>