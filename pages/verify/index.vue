<template>
  <div class="verify">
    <div class="container">
      <div class="alert alert-warning" v-if="err">
        Token không hợp lệ
      </div>
      <div class="alert alert-success" v-else>
        Kích hoạt tài khoản thành công.
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  // middleware: 'notAuthenticated',
  data () {
    return {
      err: false
    }
  },
  mounted () {
    this.checkToken()
  },
  methods: {
    checkToken () {
      this.err = false
      this.$axios.post(`/api/user/verify?token=${this.$route.query.token}`)
        .then(res => {
          console.log('verified', res)

          const auth = {
            accessToken: res.data.token
          }
          this.$store.commit('setAuth', auth) // mutating to store for client rendering
          Cookie.set('auth', auth) // saving token in cookie for server rendering
          this.$store.commit('setUser', res.data.user) // mutating to store for client rendering
          Cookie.set('user', res.data.user) // saving token in cookie for server rendering
          // this.$router.push('/account')
        })
        .catch(err => {
          console.log(err)
          this.err = true
        })
    }
  }
}
</script>
