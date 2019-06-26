<template>
  <div class="reset-password">
    <div class="container">
      <h2>Đặt lại mật khẩu</h2>
      <div class="alert alert-success" v-if="passChanged">
        Đặt lại mật khẩu thành công. <nuxt-link to="/login">Đăng nhập</nuxt-link>
      </div>
      <b-form @submit.prevent="onSubmit" v-else>
        <b-form-group >
           <b-form-input type="password" required v-model="password" placeholder="Mật khẩu mới"></b-form-input>
        </b-form-group>
        <b-form-group >
           <b-form-input type="password" required v-model="confirmpassword" placeholder="Xác nhận mật khẩu mới"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Đặt mật khẩu</b-button>
      </b-form>
      <div class="alert alert-warning" v-if="err" v-text="err"></div>
    </div>
  </div>
</template>

<script>
export default {
  // middleware: 'notAuthenticated',
  data () {
    return {
      password: '',
      confirmpassword: '',
      err: '',
      user: {},
      passChanged: false
    }
  },
  methods: {
    onSubmit () {
      this.err = ''
      this.passChanged = false
      if (this.password != this.confirmpassword) {
        this.err = 'Xác nhận mật khẩu không đúng'
        this.password = ''
        this.confirmpassword = ''
      } else {
        this.$axios.put(`/api/user/${this.user.id}`, {
          updatePassword: this.password
        })
        .then(res => {
          console.log(res)
          this.passChanged = true
        })
        .catch(err => console.log(err.response))
      }


    },
    checkToken () {
      this.err = ''
      this.$axios.post(`/api/user/verify/${this.$route.params.token}`)
        .then(res => {
          console.log(res)
          this.user = res.data.user
        })
        .catch(err => {
          this.$router.push({path: '/'})
        })
    }
  },
  mounted () {
    this.checkToken()
  }
}
</script>
