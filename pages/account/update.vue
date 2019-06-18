<template>
  <div class="account">
    <div class="container">
      <User/>
      <div class="row">
        <div class="col-12 col-md-2">
          <AccountMenu/>
        </div>
        <div class="col-12 col-md-10">
          <Account />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
import User from '~/components/User'
import Account from '~/components/Account'
import AccountMenu from '~/components/AccountMenu'
export default {
  middleware: 'authenticated',
  components: {
    Account, AccountMenu,  User
  }



}
</script>


