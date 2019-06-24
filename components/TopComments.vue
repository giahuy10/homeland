<template>
  <div class="top-comments">
    <div class="container">
      <div class="inner">
        <h2>Top thành viên</h2>
        <div class="users">
          <div v-for="(item, index) in items" :key="index" class="user">
            <img :src="item.avatar ? item.avatar : '/images/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg'" alt="">
            <span>{{item.lastName}}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
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
      this.$axios.get('/api/user/top')
        .then(res => this.items = res.data)
        .catch(err => console.log(err.response))
    }
  }

}
</script>

<style lang="scss" scoped>
.top-comments {
  .inner {
    // background: #e5e5e5;
    margin: 0 10px;
  }
  h2 {
    text-align: center;
    padding: 20px;
  }
  .users {
    text-align: center;
    .user {
      display: inline-block;
      width: 12%;
      padding: 10px;
      @media screen and (max-width: 767px) {
        width: 33%;
      }
      img {
       
            border-radius: 100%;
          width: 100px;
          height: 100px;
          display: block;
          /* margin-bottom: 9px; */
          margin: 0 auto;
          margin-bottom: 5px;
      }
    }
  }
}
</style>
