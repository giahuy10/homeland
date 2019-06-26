<template>
  <div class="property-in-list">
    <div class="pro-inner">
      <div class="pro-img">
        <nuxt-link :to="`/property/detail/${item.id}`">
          <img :src="item.thumbnail" alt="">
        </nuxt-link>
        <div class="price">{{item.price == 9 ? item.priceOther : optionsPrice[item.price]}}</div>
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
            <i class="fa fa-camera-retro" aria-hidden="true"></i> {{item.totalImages + item.totalImages2 > 0 ? item.totalImages + item.totalImages2 : 0}}
          </div>
          <div class="float-right">
            <i class="fa fa-share-alt" aria-hidden="true"></i>
            <i class="fa fa-heart" :class="item.like ? 'saved' : ''" aria-hidden="true" @click="save(item)"></i>
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
  },
  methods: {
    save (item) {
      if (this.$store.state.user) {
        this.$axios.post('/api/saved', {
          type: 3,
          itemId: item.id,
          title: item.title,
          url: `/property/detail/${item.id}`
        })
        .then(res => {
          let title = ''
          let text = ''
          let variant = ''
          if(res.data.id) {
            // Like
            title = 'Thành công'
            text = 'Bạn đã lưu dự án thành công'
            variant = 'success'
            this.item.like = 1
          } else{
            // dislike
            title = 'Thành công'
            text = 'Bạn đã hủy lưu dự án'
            variant = 'warning'
            this.item.like = null
          }
          this.toast(title, text, variant)
        })
        .catch(err=> console.log(err.response))
      } else {
        this.toast('Thông báo', 'Vui lòng đăng nhập trước để lưu dự án', 'warning')
      }

    },
    toast(title, text, variant) {
      console.log('ok')
        this.$bvToast.toast(text, {
          title: title,
          toaster: 'b-toaster-bottom-right',
          solid: true,
          appendToast: true,
          variant: variant
        })
      }
  }
}
</script>

<style lang="scss">
$pink : #ffa800;
.pro-img img {
    height: 150px;
    width: 100%;
}
i.fa {
  &.saved {
    color: #0c51b2;
  }
  &:hover {
    cursor: pointer;
    color: #2a5a7c;
  }

}
  .pro-title {
    font-size: 18px;
    height: 30px;
    overflow: hidden;
    a {
      color: #2a5a7c;
    }
  }
  .pro-desc {
    font-size: 13px;
        height: 40px;
    overflow: hidden
  }
  .property_listing_details {
    color: #8f8f8f;
    font-size: 16px;
    .inforoom, .infobath, .infosize {
      background-image: url(/images/unit.png);
      font-size: 14px;
      line-height: 30px;
      background-repeat: no-repeat;
      margin-right: 15px;
      padding-left: 23px;
      color: #3a4659;
      color: #8593a9;
      font-size: 13px;
    }
    .price {
      color: #8593a9;
      font-size: 13px;
    }
    .inforoom {
      background-position: 0 -1px;
    }
    .infobath {
      background-position: -63px -1px;
    }
    .infosize {
      background-position: -127px 0;
    }
  }
</style>
