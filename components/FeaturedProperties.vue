<template>
  <div class="featured-properties">
    <div class="container">
      <div class="row">
        <div class="col-20">
          <h2 class="mod-title">Tổng hợp dự án</h2>
        </div>
        <div class="col-20 filter-item">
          <b-form-select v-model="filter.city" @change="getDistricts(), getItems()">
            <option value="">Chọn thành phố</option>
            <option v-for="(city, index) in cities" :key="index" :value="city.id"> {{city.name}}</option>
          </b-form-select>
        </div>
        <div class="col-10 filter-item">
          <b-form-select v-model="filter.type" @change="getItems" :options="optionsType"></b-form-select>
        </div>
        <div class="col-25 filter-item">
          <b-form-input @change="getItems" v-model="filter.title" placeholder="Tên dự án, loại nhà, địa điểm..."></b-form-input>
        </div>
        <div class="col-15 filter-item">
          <b-form-select v-model="filter.district" @change="getItems">
            <option value="">Quận/huyện</option>
            <option v-for="(district, index) in districts" :key="index" :value="district.id"> {{district.name}}</option>
          </b-form-select>
        </div>
        <div class="col-10 filter-item">
          <b-form-select v-model="filter.price" :options="optionsPrice" @change="getItems"></b-form-select>
        </div>
      </div>
      <div class="mod-content">
        <div class="row">
          <div class="col-20">
            <div class="sidebar" :class="navClass">
            <ul>
              <li><a href="#" :class="filter.sortBy == 'id' ? 'active' : ''" @click.prevent="filter.sortBy = 'id' , getItems()">Mua nhà ở đâu</a></li>
              <li><a href="#" :class="filter.sortBy == 'hits' ? 'active' : ''" @click.prevent="filter.sortBy = 'hits', getItems()">Dự án nào</a></li>
              <li><a href="#">Nhà đất TV</a></li>
            </ul>
          </div>
          </div>
          <div class="col-80">
             <div class="row">
              <div v-for="(item, index) in items" :key="index" class="property col-6 col-sm-4 col-md-3">
                <Property :item="item" />
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
import Property from '~/components/Property.vue'
import location from '~/static/local.json'

export default {
  components: {Property},
  data () {
    return {
      navClass: '',
      filter: {
        city: '',
        district:  '',
        type: '',
        price: '',
        sortBy: 'id',
        title: ''
      },
      cities: location,
      districts: [],
      optionsType: [
        { value: '', text: '-- Loại --'},
        { value: 1, text: 'Căn hộ chung cư'},
        { value: 2, text: 'Biệt thự, liền kề'},
        { value: 3, text: 'Shophouse'},
        { value: 4, text: 'Nghỉ dưỡng'},
      ],
      optionsPrice: [
        { value: '', text: '-- Giá --'},
        { value: 1, text: '600tr - 1 tỷ'},
        { value: 2, text: '1 tỷ - 3 tỷ'},
        { value: 3, text: '3 tỷ - 5 tỷ'},
        { value: 4, text: '5 tỷ - 7 tỷ'},
        { value: 5, text: '7 tỷ - 10 tỷ'},
        { value: 6, text: '10 tỷ - 20 tỷ'},
        { value: 7, text: '20 tỷ - 30 tỷ'},
        { value: 8, text: 'Trên 30 tỷ'},
      ],
      items: []
    }
  },
  methods: {
    handleScroll (event) {
      // Any code to be executed when the window is scrolled
      if (window.scrollY > 900) {
        this.navClass = 'sticky'
      } else {
        this.navClass = ''
      }
    },
    getDistricts () {
      this.districts = location[this.filter.city - 1].districts
    },
    getItems () {
      var str = "";
      for (var key in this.filter) {
          if (str != "") {
              str += "&";
          }
          str += key + "=" + encodeURIComponent(this.filter[key]);
      }
      console.log(str)
      this.$axios.get(`/api/property?${str}`)
        .then(res => {
          this.items = res.data.result
        })
        .catch(err => console.log(err.response))
    }
  },
  mounted () {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll)
    }
    this.getItems()
  }
}
</script>

<style lang="scss" >
$pink : #ffa800;
.featured-properties {
  .filter-item {
    padding: 0 5px;
  }
  .mod-content {
    padding-top: 20px;
  }
  .property {
    margin-bottom: 30px;
    @media screen and (max-width: 767px) {
      padding: 0 5px;
    }
    .pro-inner {
      border: 1px solid #ccc;
      box-shadow: 0 0 1px 0px #e3e3e3;
      .pro-img {
        position: relative;
        .price {
          position: absolute;
          right: 0;
          bottom: 0;
          background: #ffa800a6;
          padding: 5px 10px;
          color: #fff;
        }
      }
      .pro-info {
        padding: 10px 20px;
      }
    }
  }
  .pro-title {
    font-size: 18px;
    a {
      color: #17a2b8;
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
  &.sticky {
    position: fixed;
    top: 0;
    width: 210px;
  }
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
          background: $pink;
          color: #fff;
        }
        &.active {
          text-decoration: none;
          background: $pink;
          color: #fff;
        }
      }
    }
  }
}
</style>

