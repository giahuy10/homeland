<template>
  <div class="account">
    <div class="container">
      <img src="/images/StockSnap_KWRZNZ6DC6.jpg" alt="">
      <br><br>
      <div class="row">
        <div class="col-12 col-md-2">
          <ul class="news-menu">
            <li><a href="#" @click.prevent="currentTabComponent = 'Activities'" :class="currentTabComponent == 'Activities' ? 'active' : ''">Hoạt động cá nhân</a></li>
            <li><a href="#" @click.prevent="currentTabComponent = 'Saved'" :class="currentTabComponent == 'Saved' ? 'active' : ''">Lưu trữ</a></li>
            <li><a href="#" @click.prevent="currentTabComponent = 'Account'" :class="currentTabComponent == 'Account' ? 'active' : ''">Tài khoản</a></li>
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
import Activities from '~/components/Activities'
import Saved from '~/components/Saved'
import Account from '~/components/Account'
export default {
  components: {
    Activities, Saved, Account
  },
  data () {
    return {
      currentTabComponent: 'Activities'
    }
  }
}
</script>
