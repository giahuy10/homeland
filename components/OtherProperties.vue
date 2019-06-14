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
                <nuxt-link :to="`/property/detail/${item.id}`">
                  <img :src="item.thumbnail" alt="">
                </nuxt-link>
                <div class="price">{{item.price}}</div>
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
                    <i class="fa fa-commenting-o" aria-hidden="true"></i> {{item.totalComments}}
                    <i class="fa fa-camera-retro" aria-hidden="true"></i> {{item.totalImages}}
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
  mounted () {
    this.getItems()
  },
  methods: {
    getItems () {
      this.$axios.get('/api/property?perPage=5&currentPage=1')
        .then(res => {
          console.log(res)
          this.items = res.data.result
        })
        .catch(err => console.log(err.response))
    }
  },
  data () {
    return {

      items: [
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.pro-img {
  img {
    height: 150px;
    width: 100%;
  }
}
</style>

