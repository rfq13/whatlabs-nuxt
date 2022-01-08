<template>
  <client-only>
    <b-container fluid>
      <div class="row justify-content-center">
        <b-col xl="5" md="4" lg="6">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <!-- Nested Row within Card Body -->
              <div class="row">
                <!-- <div class="col-lg-5 d-none d-lg-block bg-register-image"></div> -->
                <div class="col-lg">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                    </div>
                    <form class="user">
                      <div class="form-group row">
                        <div class="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="text"
                            class="form-control form-control-user"
                            id="exampleFirstName"
                            placeholder="First Name"
                            v-model="registration.firstname"
                          />
                        </div>
                        <div class="col-sm-6">
                          <input
                            type="text"
                            class="form-control form-control-user"
                            id="exampleLastName"
                            placeholder="Last Name"
                            v-model="registration.lastname"
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control form-control-user"
                          id="exampleInputEmail"
                          placeholder="Email Address"
                          v-model="registration.email"
                        />
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="password"
                            class="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                            v-model="registration.password"
                          />
                        </div>
                        <div class="col-sm-6">
                          <input
                            type="password"
                            class="form-control form-control-user"
                            id="exampleRepeatPassword"
                            placeholder="Repeat Password"
                            v-model="registration.confirm_password"
                          />
                          <span
                            class="text-danger"
                            style="margin-left:33px;font-size:12px"
                            >{{ error }}</span
                          >
                        </div>
                      </div>
                      <a
                        href="javascript:void(0)"
                        @click="register"
                        class="btn btn-primary btn-user btn-block"
                      >
                        Register Account
                      </a>
                      <hr />
                      <!-- <a
                        href="index.html"
                        class="btn btn-google btn-user btn-block"
                      >
                        <i class="fab fa-google fa-fw"></i> Register with Google
                      </a>
                      <a
                        href="index.html"
                        class="btn btn-facebook btn-user btn-block"
                      >
                        <i class="fab fa-facebook-f fa-fw"></i> Register with
                        Facebook
                      </a> -->
                    </form>
                    <hr />
                    <!-- <div class="text-center">
                      <a class="small" href="forgot-password.html"
                        >Forgot Password?</a
                      >
                    </div> -->
                    <div class="text-center">
                      <NuxtLink
                        to="/login"
                        class="small"
                        v-if="!isAuthenticated"
                        >Already have an account? Login!</NuxtLink
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </div>
      <notifications group="foo" />
    </b-container>
  </client-only>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  layout: 'auth',
  auth: false,
  middleware: 'guest',
  data() {
    return {
      registration: {
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        confirm_password: null
      },
      error: ''
    }
  },
  methods: {
    async register() {
      if (this.registration.password !== this.registration.confirm_password) {
        this.error = '*harus sama dengan password!'
        return
      }

      this.$axios
        .post('registration', this.registration)
        .then((reg) => {
          this.$auth
            .loginWith('local', {
              data: {
                username: this.registration.email,
                password: this.registration.password
              }
            })
            .then((response) => {
              console.log(response)
              if (response.data.token) {
                this.$router.push('/')
              } else {
                this.$notify({
                  group: 'foo',
                  title: 'Important message',
                  text: response.data.message
                })
              }
            })
            .catch((err) => {
              // console.log(err,'error nih');
              const result = response.data
              const qey = Object.keys(result.response)

              if (qey.length > 0) {
                qey.forEach((msg, i) => {
                  this.$notify({
                    group: 'foo',
                    title: result.message,
                    text: `${msg}: ${result.response[msg]}`,
                    type: 'error'
                  })
                })
              } else {
                this.$notify({
                  group: 'foo',
                  title: 'something went wrong!',
                  text: result.message
                })
              }
            })
        })
        .catch(({ response }) => {
          for (const key in response.data) {
            if (Object.hasOwnProperty.call(response.data, key)) {
              const err = response.data[key]
              this.$notify({
                group: 'foo',
                title: 'something went wrong!',
                text: err.message,
                type: 'error'
              })
            }
          }
          // throw new Error(err)
        })
    }
  }
}
</script>
