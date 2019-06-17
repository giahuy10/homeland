<template>
  <div class="account">
    <div class="container">
      <User/>
      <div class="row">
        <div class="col-12 col-md-2">
          <ul class="news-menu">
            <li>
              <nuxt-link to="/account">Hoạt động cá nhân</nuxt-link>
            </li>
            <li>
            <nuxt-link to="/account/saved">Lưu trữ</nuxt-link></li>
            <li>
            <nuxt-link to="/account/update">Tài khoản</nuxt-link></li>
            <li><a href="#" @click.prevent="logout">Đăng xuất</a></li>
          </ul>
        </div>
        <div class="col-12 col-md-10">
          <component v-bind:is="currentTabComponent"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
import User from '~/components/User'

import Activities from '~/components/Activities'
import Saved from '~/components/Saved'
import Account from '~/components/Account'
export default {
  middleware: 'authenticated',
  components: {
    Activities, Saved, Account, User
  },
  data () {
    return {
      currentTabComponent: 'Account'
    }
  },
  methods: {
    logout() {
      Cookie.remove('auth')
      this.$store.commit('setAuth', null)
      this.$router.push({path: '/'})
      localStorage.clear()
    }
  }
}
</script>
