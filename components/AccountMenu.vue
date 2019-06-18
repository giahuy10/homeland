<template>
  <ul class="news-menu">
    <li>
      <nuxt-link to="/account">Hoạt động cá nhân</nuxt-link>
    </li>
    <li>
    <nuxt-link to="/account/saved">Lưu trữ</nuxt-link></li>
    <li>
    <nuxt-link to="/account/update">Tài khoản</nuxt-link></li>
    <template v-if="userDetail && userDetail.level == 2">
        <li><nuxt-link to="/account/verifypro">Phê duyệt dự án</nuxt-link></li>
        <li><nuxt-link to="/account/verifynews">Phê duyệt tin tức</nuxt-link></li>
    </template>
    <li><a href="#" @click.prevent="logout">Đăng xuất</a></li>
  </ul>
</template>

<script>
export default {
  computed: {
    userDetail () {
      return this.$store.state.user
    }
  },
  methods: {
    logout() {
      Cookie.remove('auth')
      Cookie.remove('user')
      this.$store.commit('setAuth', null)
      this.$store.commit('setUser', null)
      this.$router.push({path: '/'})
      localStorage.clear()
    }
  }
}
</script>
