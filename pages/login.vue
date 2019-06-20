<template>
  <div class="container login-page">
    <h1>Đăng nhập</h1>
    <div>
           <b-button block @click.prevent="loginByFacebook" variant="facebook"> <i class="fa fa-facebook"></i> Đăng nhập bằng Facebook</b-button>

      <b-button block @click.prevent="loginByGoogle" variant="google"> <i class="fa fa-google-plus"></i> Đăng nhập bằng Google</b-button>

      <div class="text-center"> <br> <br>  Hoặc sử dụng email</div>
      <b-form @submit.prevent="postLogin" >
      <b-form-group
        id="input-group-1"
        label="Email:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="login.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="login.password"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-button block type="submit" variant="primary">Đăng nhập</b-button>

      <br>
      <p>Chưa có tài khoản? <a href="#" @click.prevent="$router.push({path: '/register'})">Đăng ký ngay</a></p>
      <p><a href="#" @click.prevent="$router.push({path: '/forgot'})">Quên mật khẩu?</a></p>
    </b-form>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
import firebase from '@/plugins/firebase'

const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()
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
          this.$store.commit('setUser', res.data.user) // mutating to store for client rendering
          Cookie.set('user', res.data.user) // saving token in cookie for server rendering
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err.response)
          this.toast('Thông báo', err.response.data.msg, 'warning')
        })
    },
    loginByFacebook () {
      firebase.auth().signInWithPopup(facebookProvider)
          .then(data => {
            this.checkEmail(data.user, 'facebook')
          })
          .catch(err => {
            this.checkEmail ({email: err.email}, 'facebook')
          })
    },
    loginByGoogle () {

        firebase.auth().signInWithPopup(googleProvider)
          .then(data => {
            this.checkEmail(data.user, 'google')

          })
          .catch(err => {
            this.checkEmail ({email: err.email}, 'google')
          })

    },
    toast(title, text, variant) {
      console.log('ok')
        this.$bvToast.toast(text, {
          title: title,
          toaster: 'b-toaster-bottom-right',
          solid: true,
          appendToast: true,
          variant: variant
        })
      },
    checkEmail (user, provider) {
      console.log('checkemail')
      this.$axios.post(`/api/user/checkEmail`, user)
        .then(res => {
          const auth = {
            accessToken: res.data.token
          }
          this.$store.commit('setAuth', auth) // mutating to store for client rendering
          Cookie.set('auth', auth) // saving token in cookie for server rendering
          this.$store.commit('setUser', res.data.user) // mutating to store for client rendering
          Cookie.set('user', res.data.user) // saving token in cookie for server rendering
          this.$router.push('/account')
        })
        .catch(err => {
          console.log(err.response)
          localStorage.setItem(`${provider}UserData`, JSON.stringify(user))
          this.$router.push({path: '/register'})
        })
    }
  }
}
</script>

<style lang="scss">
.btn-google {
  background: #dd4b39;
  color:#fff;
}
.btn-facebook {
  background: #3b5998;
  color:#fff;
}
.login-page {
  h1 {
    font-size: 30px;
        color: #8f5c2e;
    text-align: center;
    margin-top: 20px;
  }
}
</style>
