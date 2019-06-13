<template>
  <div class="container">
    <h1>Đăng nhập</h1>
    <div>
      <label for="email">
        <input id="email" type="email" v-model="login.email">
      </label>
      <label for="password">
        <input id="password" type="password" v-model="login.password">
      </label>
      <button @click="postLogin">
        Đăng nhập
      </button>
      <p>The credentials are not verified for the example purpose.</p>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  data () {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    postLogin() {
      this.$axios.post('/api/user/login', this.login)
        .then(res => {
          console.log(res)
          const auth = {
            accessToken: res.data.token
          }
          this.$store.commit('setAuth', auth) // mutating to store for client rendering
          Cookie.set('auth', auth) // saving token in cookie for server rendering
          this.$router.push('/')
        })
    }
  }
}
</script>
