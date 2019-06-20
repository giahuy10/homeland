<template>
  <div class="account">
    <div class="container">
      <User/>
      <div class="row">
        <div class="col-12 col-md-3">
          <AccountMenu/>
        </div>
        <div class="col-12 col-md-9">
          <Saved />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
import User from '~/components/User'
import Saved from '~/components/Saved'
import AccountMenu from '~/components/AccountMenu'
export default {
  middleware: 'authenticated',
  components: {
    Saved, AccountMenu,  User
  }
}
</script>


