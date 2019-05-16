<template>
  <div class="other-properties">
    <div class="container">
      <h2 class="mod-title">Dự án nổi bật</h2>
      <div class="mod-content">
        <div class="content-inner">
          <div v-for="(item, index) in items" :key="index" class="property">
            <div class="pro-img">
              <nuxt-link to="/property/detail">
                <img :src="item.thumbnail" alt="">
              </nuxt-link>
            </div>
            <div class="pro-title">
              <nuxt-link to="/property/detail" v-text="item.title"></nuxt-link>
            </div>
          </div>
          <div class="clear"></div>
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
          title: 'Dự án Palace City',
          thumbnail: '/images/1.jpg',
          desc: 'Dự Án Lakeview City – Khu Đô Thị Đáng Sống Nhất ...',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Palace City',
          thumbnail: '/images/2.jpg',
          desc: 'Dự Án Lakeview City – Khu Đô Thị Đáng Sống Nhất ...',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Palace City',
          thumbnail: '/images/3.jpg',
          desc: 'Dự Án Lakeview City – Khu Đô Thị Đáng Sống Nhất ...',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Palace City',
          thumbnail: '/images/5.jpg',
          desc: 'Dự Án Lakeview City – Khu Đô Thị Đáng Sống Nhất ...',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Palace City',
          thumbnail: '/images/6.jpg',
          desc: 'Dự Án Lakeview City – Khu Đô Thị Đáng Sống Nhất ...',
          price: '2 tỷ'
        }

      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$pink : #e7005a;
.other-properties {
  margin: 40px 0;
  .property {
    float: left;
    width: 20%;
    padding: 10px;
    box-sizing: border-box;
    .pro-title {
      text-align: center;
      a {
        color: $pink;
      }
    }
  }

}
</style>

