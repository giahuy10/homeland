<template>
  <div class="account-menu">
    <h4 class="text-center">Trang cá nhân</h4>
    <ul class="">
    <li>
      <nuxt-link to="/account">Hoạt động</nuxt-link>
    </li>
    <li>
    <nuxt-link to="/account/saved">Lưu trữ</nuxt-link></li>
    <li>
    <nuxt-link to="/account/update">Tài khoản</nuxt-link></li>
    <template v-if="userDetail && userDetail.level == 2">
        <li><nuxt-link to="/account/verifypro">Phê duyệt dự án</nuxt-link></li>
        <li><nuxt-link to="/account/verifynews">Phê duyệt tin tức</nuxt-link></li>
        <li><nuxt-link to="/account/banner">Quản lý banner</nuxt-link></li>
    </template>
    <li><a href="#" @click.prevent="logout">Đăng xuất</a></li>
  </ul>
  </div>

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

<style lang="scss">
.account-menu {
  border: 1px solid #ccc;
  border-top: 0;
  h4 {
    background: #ffa800;
    color: #fff;
    padding: 7px 10px;
  }
  ul {
    list-style: none;
    padding-left: 10px;
    li {
      a {
        display: block;
        padding: 2px 10px;
        &.nuxt-link-exact-active {
          color: #914c0d;
          font-weight: bold;
        }
      }
    }
  }
}
</style>

