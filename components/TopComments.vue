<template>
  <div class="top-comments">
    <div class="container">
      <div class="inner">
        <h2>Bình luận sôi nổi</h2>
        <div class="users">
          <div v-for="(item, index) in items" :key="index" class="user">
            <img :src="item.avatar" alt="">
            <span>{{item.name}}</span>
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
      items: [
        {
          name: 'Eddy Nguyen',
          avatar: '/images/0 (1).jfif'
        },
        {
          name: 'Hoàng Oanh',
          avatar: '/images/0.jfif'
        },
        {
          name: 'Minh Khang',
          avatar: '/images/8e6f9c2ddddea7c6d5bb836d19308754.jpeg'
        },
        {
          name: 'Thái Hà',
          avatar: '/images/62979450.jfif'
        },
        {
          name: 'Hương Cẩm',
          avatar: '/images/can-nhan-3.png'
        },
        {
          name: 'Bảo Định',
          avatar: '/images/main-thumb-282821662-100-krruoowyyretxlddfvilxlmqdpnczfqg.jpeg'
        },
        {
          name: 'Khánh Băng',
          avatar: '/images/photo.jpg'
        },
        {
          name: 'Linh Trang',
          avatar: '/images/Richard-McGregor-fivebooks-interview2-100x100.jpg'
        },

      ]
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
      img {
        border-radius: 100%;
      }
    }
  }
}
</style>
