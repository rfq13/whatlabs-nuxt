export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 8000 // bawaan: 3000
  },
  globalName: 'whatlabs-nuxt',
  head: {
    title: 'whatlabs-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/wa-favicon.svg' }
    ],
    script: [
      {
        src:"/vendor/jquery/jquery.min.js",
        type: 'text/javascript'
      },
      {
        src:"/vendor/bootstrap/js/bootstrap.bundle.min.js",
        type: 'text/javascript'
      },
      {
        src:"/vendor/jquery-easing/jquery.easing.min.js",
        type: 'text/javascript'
      },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // '@/assets/css/architect-ui.css',
    '@/assets/vendor/fontawesome-free/css/all.min.css',
    '@/assets/css/sb-admin-2.min.css',

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src:'~/plugins/vue-notification.js',ssr:false},
    // {src:'~/plugins/axios.js'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/bootstrap-vue',
    'nuxt-socket-io',
  ],
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/login', method: 'post', propertyName:'token' },
          logout: false,
          user: { url: '/user', method: 'get' }
        }
      }
    }
  },
  axios:{
    baseURL:'http://localhost:4000'
  },
  io: {
    // module options
    sockets: [{
      name: 'main',
      url: 'http://localhost:4000'
    }]
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  router: {
    middleware: ['auth']
  },
  
}
