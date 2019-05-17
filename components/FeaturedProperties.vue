<template>
  <div class="featured-properties">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-3">
          <h2 class="mod-title">Dự án đang mở bán</h2>
        </div>
        <div class="col-xs-6 col-md-2">
          <b-form-select v-model="filter.city" :options="optionsCity"></b-form-select>
        </div>
        <div class="col-xs-6 col-md-2">
          <b-form-select v-model="filter.type" :options="optionsType"></b-form-select>
        </div>
        <div class="col-xs-6 col-md-2">
          <b-form-select v-model="filter.district" :options="optionsDistrict"></b-form-select>
        </div>
        <div class="col-xs-6 col-md-3">
          <b-form-select v-model="filter.price" :options="optionsPrice"></b-form-select>
        </div>
      </div>
      <div class="mod-content">
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
                <div class="pro-desc" v-html="item.desc">
                </div>
                <div class="property_listing_details">
                  <span class="inforoom">2</span>
                  <span class="infobath">3</span>
                  <span class="infosize">120 m<sup>2</sup></span>
                  <span class="price" v-text="item.price"></span>
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
  data () {
    return {
      filter: {
        city: null,
        district: null,
        type: null,
        price: null
      },
      optionsCity: [
        { value: null, text: '-- Chọn thành phố --'},
        { value: 1, text: 'Hà Nội'},
        { value: 2, text: 'Hồ Chí Minh'},
        { value: 2, text: 'Đà nẵng'},
      ],
      optionsDistrict: [

      ],
      optionsType: [
        { value: null, text: '-- Chọn loại --'},
        { value: 1, text: 'Biệt thự liền kề'},
        { value: 2, text: 'Biệt thự đơn lập'},
        { value: 2, text: 'Chung cư'},
      ],
      optionsPrice: [
        { value: null, text: '-- Chọn khoảng giá --'},
        { value: 1, text: 'Dưới 1 tỷ'},
        { value: 2, text: '1 tỷ - 2 tỷ'},
        { value: 2, text: 'Trên 2 tỷ'},
      ],
      items: [
        {
          title: 'Dự án Palace City',
          thumbnail: '/images/house-525x328.jpg',
          desc: 'Dự Án Lakeview City – Khu Đô Thị Đáng Sống Nhất ...',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Khai Sơn',
          thumbnail: '/images/1.jpg',
          desc: 'Dự Án Lakeview City – Khu Đô Thị Đáng Sống Nhất ...',
          price: '2 tỷ'
        },
        {
          title: 'Dự án North Diamond',
          thumbnail: '/images/2.jpg',
          desc: 'Dự Án Lakeview City – Khu Đô Thị Đáng Sống Nhất ...',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Vin City',
          thumbnail: '/images/3.jpg',
          desc: 'Dự Án Lakeview City – Khu Đô Thị Đáng Sống Nhất ...',
          price: '2 tỷ'
        },
        {
          title: 'Dự án The Garden',
          thumbnail: '/images/4.png',
          desc: 'Dự Án Lakeview City – Khu Đô Thị Đáng Sống Nhất ...',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Central Park',
          thumbnail: '/images/5.jpg',
          desc: 'Dự Án Lakeview City – Khu Đô Thị Đáng Sống Nhất ...',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Thảo Nguyên',
          thumbnail: '/images/6.jpg',
          desc: 'Dự Án Lakeview City – Khu Đô Thị Đáng Sống Nhất ...',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Nam Cường',
          thumbnail: '/images/7.jpg',
          desc: 'Dự Án Lakeview City – Khu Đô Thị Đáng Sống Nhất ...',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Bà Nà Hill',
          thumbnail: '/images/8.jpg',
          desc: 'Dự Án Lakeview City – Khu Đô Thị Đáng Sống Nhất ...',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Lotte Park',
          thumbnail: '/images/9.jpg',
          desc: 'Dự Án Lakeview City – Khu Đô Thị Đáng Sống Nhất ...',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Sông Hồng',
          thumbnail: '/images/10.jpg',
          desc: 'Dự Án Lakeview City – Khu Đô Thị Đáng Sống Nhất ...',
          price: '2 tỷ'
        },
        {
          title: 'Dự án Palace City',
          thumbnail: '/images/11.jpg',
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
.featured-properties {
  .mod-content {
    padding-top: 20px;
  }
  .property {

    // padding: 10px;
    margin-bottom: 30px;
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

