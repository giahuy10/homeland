<template>
  <div class="forgot">
    <div class="container">
      <h2>Quên mật khẩu</h2>
      <div class="alert alert-success" v-if="summited">
        Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu vào địa chỉ {{email}}.
      </div>
      <b-form @submit.prevent="onSubmit" v-else>
        <b-form-group
          id="input-group-1"
          label=""
          label-for="input-1"
          description="Chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu vào email của bạn"
        >
          <b-form-input
            id="input-1"
            v-model="email"
            type="email"
            required
            placeholder="Email"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Gửi</b-button>
      </b-form>
    <div class="alert alert-warning" v-if="err" v-text="err.data.msg"></div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: 'notAuthenticated',
  data () {
    return {
      summited: false,
      email: '',
      err: null
    }
  },
  methods: {
    onSubmit () {
      this.err = null
      this.summited = false
      this.$axios.post(`/api/user/forgot/${this.email}`)
        .then(res => {
          console.log(res)
          this.summited = true
        })
        .catch(err => {
          console.log(err.response)
          this.err = err.response
          this.email = ''
        })
    }
  }
}
</script>
