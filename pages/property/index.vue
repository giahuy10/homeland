<template>
  <div class="list-properties">
    <div class="container">
      <div class="row">
        <div class="col-2">
          <div class="sidebar">
            <ul>
              <li><a href="">Mua nhà ở đâu(Mới nhất)</a></li>
              <li><a href="">Dự án nào (xem nhiều nhất)</a></li>
              <li><a href="">Camera nhà đất</a></li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-10">
          <div class="row">
            <div v-for="(item, index) in items" :key="index" class="property col-6 col-sm-4 col-md-3">
              <div class="pro-inner">
                <div class="pro-img">
                  <nuxt-link to="/property/detail">
                    <img :src="item.thumbnail" alt="">
                  </nuxt-link>
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
                    <i class="fa fa-commenting-o" aria-hidden="true"></i> 12
                    <i class="fa fa-camera-retro" aria-hidden="true"></i> 12
                    <i class="fa fa-share-alt" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="clear"></div>
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
          title: 'North Diamond',
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
          title: 'Dự án The Garden',
          thumbnail: '/images/4.png',
          desc: '54 Liễu Giai - Ba Đình',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Central Park',
          thumbnail: '/images/5.jpg',
          desc: '54 Liễu Giai - Ba Đình',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Thảo Nguyên',
          thumbnail: '/images/6.jpg',
          desc: '54 Liễu Giai - Ba Đình',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Nam Cường',
          thumbnail: '/images/7.jpg',
          desc: '54 Liễu Giai - Ba Đình',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Bà Nà Hill',
          thumbnail: '/images/8.jpg',
          desc: '54 Liễu Giai - Ba Đình',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Lotte Park',
          thumbnail: '/images/9.jpg',
          desc: '54 Liễu Giai - Ba Đình',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Sông Hồng',
          thumbnail: '/images/10.jpg',
          desc: '54 Liễu Giai - Ba Đình',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Palace City',
          thumbnail: '/images/11.jpg',
          desc: '54 Liễu Giai - Ba Đình',
          price: '2 tỷ'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.list-properties {
  padding-top: 20px;
  .sidebar {
    ul {
      list-style: none;
      padding-left: 0;
      li {
        background: #f8f9fa;
        border-bottom: 1px solid #e5e5e5;
        a {
          display: block;
          padding: 10px 20px;
        }
      }
    }
  }
  $pink : #ffa800;


  .property {

    // padding: 10px;
    margin-bottom: 30px;
    @media screen and (max-width: 767px) {
      padding: 0 5px;
    }
    .pro-inner {
      border: 1px solid #ccc;
      box-shadow: 0 0 1px 0px #e3e3e3;
      .pro-info {
        padding: 10px 20px;
      }
    }
  }
  .pro-title {
    font-size: 18px;
    a {
      color: $pink;
    }
  }
  .pro-desc {
    font-size: 13px;
  }
  .property_listing_details {
    color: #85878a;
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

}

</style>
