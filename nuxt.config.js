const pkg = require('./package')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Tổng hợp Dự án căn hộ nhà đất',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

      {
        rel: 'stylesheet',
        href:
          'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
      }
    ]
  },
  serverMiddleware: [
    '~/api'
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    // '~/assets/style/bootstrap-grid.css',
    '~/assets/style/main.scss',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-axios',
    '~/plugins/vue-moment',
    // { src: '~/plugins/vue-select', ssr: false },
    // { src: '~/plugins/vue-facebook-chat.js', ssr: false },
    // { src: '~/plugins/vue-flipbook.js', ssr: false}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'bootstrap-vue/nuxt'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://homenland.vn'
  },

  /*
  ** Build configuration
  */
  build: {

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
