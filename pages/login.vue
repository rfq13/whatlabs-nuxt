<template>
    <!-- Outer Row -->
    <client-only>
        <b-container fluid>
            <div class="row justify-content-center">
                <b-col xl="10" md="9" lg="12">

                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <!-- Nested Row within Card Body -->
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form class="user">
                                            <b-form-group>
                                                <b-form-input
                                                    type="email" class="form-control form-control-user"
                                                    id="exampleInputEmail" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." v-model="auth.username"
                                                    ></b-form-input>
                                            </b-form-group>
                                            <b-form-group>
                                                <b-form-input
                                                    type="password" class="form-control form-control-user"
                                                    id="exampleInputPassword" aria-describedby="emailHelp"
                                                    placeholder="Password" v-model="auth.password"
                                                    ></b-form-input>
                                            </b-form-group>
                                            <b-form-group id="input-group-4">
                                                <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0" size="sm">Remember Me</b-form-checkbox>
                                            </b-form-group>
                                            <a href="javascript:void(0)" @click="submit" class="btn btn-primary btn-user btn-block">
                                                Login
                                            </a>
                                            <!-- <hr>
                                            <a href="index.html" class="btn btn-google btn-user btn-block">
                                                <i class="fab fa-google fa-fw"></i> Login with Google
                                            </a>
                                            <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                                <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                            </a> -->
                                        </form>
                                        <hr>
                                        <div class="text-center">
                                            <a class="small" href="forgot-password.html">Forgot Password?</a>
                                        </div>
                                        <div class="text-center">
                                            <!-- <a class="small" href="register.html"></a> -->
                                            <NuxtLink to="/registration" class="small" v-if="!isAuthenticated">Create an Account!</NuxtLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <notifications group="foo" />
                </b-col>
            </div>
        </b-container>
    </client-only>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    mounted(){
        this.$notify({
            group: 'foo',
            title: 'Important message',
            text: "password harus sama dengan confirm password"
        });
    },
    computed:{
        ...mapGetters(['isAuthenticated'])
    },
    layout:'auth',
    auth:false,
    middleware:'guest',
    data(){
        return {
            auth:{
                username:null,
                password:null
            }
        }
    },
    methods:{
        async submit(){
            try {
                let response = await this.$auth.loginWith('local', { 
                    data: this.auth
                })
                
                if (response.data.token) {
                    this.$router.push('/');
                    // window.location.reload();
                }else{
                    this.$notify({
                        group: 'foo',
                        title: 'Important message',
                        text: response.data.message,
                        type:'error'
                    })
                }
                    
            } catch ({response}) {
                const result = response.data;
                const qey = Object.keys(result.response);

                if(qey.length > 0){
                    qey.forEach((msg,i) => {
                        this.$notify({
                            group: 'foo',
                            title: result.message,
                            text: `${msg}: ${result.response[msg]}`
                        })
                    });
                }else{
                    this.$notify({
                        group: 'foo',
                        title: "something went wrong!",
                        text: result.message
                    })
                }
            }
        }
    }
}
</script>