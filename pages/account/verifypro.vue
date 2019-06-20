<template>
  <div class="account">
    <div class="container">
      <User/>
      <div class="row">
        <div class="col-12 col-md-3">
          <AccountMenu/>
        </div>
        <div class="col-12 col-md-9">
          <div class="row">
           <div class="col-12 col-md-3" v-for="(item, index) in items" :key="index">
              <Property :item="item"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
import User from '~/components/User'
import Property from '~/components/Property'
import AccountMenu from '~/components/AccountMenu'
export default {
  middleware: 'authenticated',
  components: {
    AccountMenu,  User, Property
  },
  data () {
    return {
      items: []
    }
  },
  mounted () {
    this.getItems()
  },
  methods: {
    getItems () {
      this.$axios.get('/api/property?verify=true')
        .then(res => this.items = res.data.result)
        .catch(err => console.log(err.response))
    }
  }

}
</script>


