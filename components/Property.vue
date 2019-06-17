<template>
  <div class="property-in-list">
    <div class="pro-inner">
      <div class="pro-img">
        <nuxt-link :to="`/property/detail/${item.id}`">
          <img :src="item.thumbnail" alt="">
        </nuxt-link>
        <div class="price">{{optionsPrice[item.price]}}</div>
      </div>
      <div class="pro-info">
        <div class="pro-title">
          <nuxt-link :to="`/property/detail/${item.id}`" v-text="item.title"></nuxt-link>
        </div>
        <div class="pro-desc">
          <i class="fa fa-location-arrow" aria-hidden="true"></i> {{item.location}}
        </div>
        <div class="pro-note">

        </div>
        <div class="property_listing_details">
          <div class="float-left">
            <i class="fa fa-commenting-o" aria-hidden="true"></i> {{item.totalComments ? item.totalComments : 0}}
            <i class="fa fa-camera-retro" aria-hidden="true"></i> {{item.totalImages ? item.totalImages : 0}}
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
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
      optionsPrice: {
        1: '600tr - 1 tỷ',
        2: '1 tỷ - 3 tỷ',
        3: '3 tỷ - 5 tỷ',
        4: '5 tỷ - 7 tỷ',
        5: '7 tỷ - 10 tỷ',
        6: '10 tỷ - 20 tỷ',
        7: '20 tỷ - 30 tỷ',
        8: 'Trên 30 tỷ'
      },
    }
  }
}
</script>
