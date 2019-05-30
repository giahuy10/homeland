<template>
  <div class="featured-properties">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-3">
          <h2 class="mod-title">Tổng hợp dự án</h2>
        </div>
        <div class="col-xs-6 col-md-2 filter-item">
          <b-form-select v-model="filter.city" :options="optionsCity"></b-form-select>
        </div>
        <div class="col-xs-6 col-md-1 filter-item">
          <b-form-select v-model="filter.type" :options="optionsType"></b-form-select>
        </div>
        <div class="col-xs-6 col-md-3 filter-item">
          <b-form-input placeholder="Tên dự án, loại nhà, địa điểm..."></b-form-input>
        </div>
        <div class="col-xs-6 col-md-2 filter-item">
          <b-form-select v-model="filter.district" :options="optionsDistrict"></b-form-select>
        </div>
        <div class="col-xs-6 col-md-1 filter-item">
          <b-form-select v-model="filter.price" :options="optionsPrice"></b-form-select>
        </div>
      </div>
      <div class="mod-content">
        <div class="row">
          <div class="col-12 col-md-2">
            <div class="sidebar">
            <ul>
              <li><a href="">Mua nhà ở đâu</a></li>
              <li><a href="">Dự án nào</a></li>
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
                      Comment mới nhất/CHưa có comment thì ko hiển thị
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      filter: {
        city: null,
        district: null,
        type: null,
        price: null
      },
      optionsCity: [
        { value: null, text: '-- Thành phố --'},
        { value: 1, text: 'Hà Nội'},
        { value: 2, text: 'Hồ Chí Minh'},
        { value: 2, text: 'Đà nẵng'},
      ],
      optionsDistrict: [
        { value: null, text: '-- Quận/Huyện --'},
        { value: 1, text: 'Gia Lâm'},
        { value: 2, text: 'Ba Đình'},
        { value: 2, text: 'Thanh Xuân'},
      ],
      optionsType: [
        { value: null, text: '-- Loại --'},
        { value: 1, text: 'Căn hộ chung cư'},
        { value: 2, text: 'Biệt thự, liền kề'},
        { value: 2, text: 'Shophouse'},
      ],
      optionsPrice: [
        { value: null, text: '-- Giá --'},
        { value: 1, text: '600tr - 1 tỷ'},
        { value: 2, text: '1 tỷ - 3 tỷ'},
        { value: 2, text: '3 tỷ - 5 tỷ'},
        { value: 2, text: '5 tỷ - 7 tỷ'},
        { value: 2, text: '7 tỷ - 10 tỷ'},
        { value: 2, text: '10 tỷ - 20 tỷ'},
        { value: 2, text: '20 tỷ - 30 tỷ'},
        { value: 2, text: 'Trên 30 tỷ'},
      ],
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

<style lang="scss" >
$pink : #e7005a;
.featured-properties {
  .filter-item {
    padding: 0 5px;
  }
  .mod-content {
    padding-top: 20px;
  }
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
          &:hover {
            text-decoration: none;
          }
        }
      }
    }
}
</style>

