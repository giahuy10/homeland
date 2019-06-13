<template>
  <div class="featured-properties">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-3">
          <h2 v-if="title" class="mod-title">Dự án mới</h2>
        </div>
      </div>
      <div class="mod-content">
        <div class="row">
          <div v-for="(item, index) in items" :key="index" class="property col-20">
            <div class="pro-inner">
              <div class="pro-img">
                <nuxt-link to="/property/detail">
                  <img :src="item.thumbnail" alt="">
                </nuxt-link>
                <div class="price">1 tỷ - 2 tỷ</div>
              </div>
              <div class="pro-info">
                <div class="pro-title">
                  <nuxt-link to="/property/detail" v-text="item.title"></nuxt-link>
                </div>
                <div class="pro-desc">
                  <i class="fa fa-location-arrow" aria-hidden="true"></i> {{item.desc}}
                </div>
                <div class="pro-note">
                  Đoạn giới thiệu dự án ở đây
                </div>
                <div class="property_listing_details">
                  <div class="float-left">
                    <i class="fa fa-commenting-o" aria-hidden="true"></i> 12
                    <i class="fa fa-camera-retro" aria-hidden="true"></i> 12
                  </div>
                  <div class="float-right">
                    <i class="fa fa-share-alt" aria-hidden="true"></i>
                    <i class="fa fa-heart" aria-hidden="true"></i>
                  </div>
                  <div class="clearfix"></div>
                </div>
              </div>
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
  props: ['title'],
  data () {
    return {

      items: [
        {
          title: 'Dự án Palace City',
          thumbnail: '/images/house-525x328.jpg',
          desc: '54 Liễu Giai - Ba Đình',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Khai Sơn',
          thumbnail: '/images/1.jpg',
          desc: '54 Liễu Giai - Ba Đình',
          price: '2 tỷ'
        },
        {
          title: 'Dự án North Diamond',
          thumbnail: '/images/2.jpg',
          desc: '54 Liễu Giai - Ba Đình',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Vin City',
          thumbnail: '/images/3.jpg',
          desc: '54 Liễu Giai - Ba Đình',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Vin City',
          thumbnail: '/images/3.jpg',
          desc: '54 Liễu Giai - Ba Đình',
          price: '2 tỷ'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

