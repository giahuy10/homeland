<template>
  <div class="featured-properties">
    <div class="container">

      <div class="mod-content">
        <div class="row">
          <div class="col-20 side">

            <div class="sidebar" :class="navClass">
              <div class="module-title">
                <h2 class="mod-title">Tổng hợp dự án</h2>
            </div>
            <ul class="d-none d-md-block">
              <li><a href="#" :class="filter.sortBy == 'id' ? 'active' : ''" @click.prevent="filter.sortBy = 'id' , getItems()">Mua nhà ở đâu</a></li>
              <li><a href="#" :class="filter.sortBy == 'hits' ? 'active' : ''" @click.prevent="filter.sortBy = 'hits', getItems()">Dự án nào</a></li>
              <li><a href="#" :class="filter.sortBy == 'tv' ? 'active' : ''" @click.prevent="filter.sortBy = 'tv', getItems()">Nhà đất TV</a></li>

            </ul>
          </div>
          </div>
          <div class="col-80 main">
            <div class="row filer-row">
              <div class="col-20 filter-item">
                <b-form-select v-model="filter.city" @change="getDistricts(), getItems()">
                  <option value="">Chọn thành phố</option>
                  <option v-for="(city, index) in cities" :key="index" :value="city.id"> {{city.name}}</option>
                </b-form-select>
              </div>
              <div class="col-15 filter-item">
                <b-form-select v-model="filter.type" @change="getItems" :options="optionsType"></b-form-select>
              </div>
              <div class="col-30 filter-item filter-title">
                <b-form-input @change="getItems" v-model="filter.title" placeholder="Tên dự án, loại nhà, địa điểm..."></b-form-input>
              </div>
              <div class="col-20 filter-item">
                <b-form-select v-model="filter.district" @change="getItems">
                  <option value="">Quận/huyện</option>
                  <option v-for="(district, index) in districts" :key="index" :value="district.id"> {{district.name}}</option>
                </b-form-select>
              </div>
              <div class="col-15 filter-item">
                <b-form-select v-model="filter.price" :options="optionsPrice" @change="getItems"></b-form-select>
              </div>
            </div>

             <div class="row">
              <div v-for="(item, index) in items" :key="index" class="property col-6 col-sm-4 col-md-3">
                <Property v-if="filter.sortBy !='tv'" :item="item" />
                <Post v-else :item="item" />
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
import Post from '~/components/Post.vue'
import location from '~/static/local.json'

export default {
  components: {Property, Post},
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
        { value: 6, text: 'Căn hộ cao cấp'},
        { value: 7, text: 'Căn hộ cao cấp và căn hộ dịch vụ'},
        { value: 8, text: 'Căn hộ - văn phòng - dịch vụ'},
        { value: 2, text: 'Biệt thự/ liền kề'},
        { value: 3, text: 'Shophouse'},
        { value: 4, text: 'Nghỉ dưỡng'},
        { value: 5, text: 'Khu đô thị'}
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
      if (this.filter.city >= 1) {
        this.districts = location[this.filter.city - 1].districts
      } else{
        this.districts = []
      }
      
    },
    getItems () {
      let userId = this.userDetail ? this.userDetail.id : 0
      if (this.filter.sortBy != 'tv') {
        var str = "";
        for (var key in this.filter) {
            if (str != "") {
                str += "&";
            }
            str += key + "=" + encodeURIComponent(this.filter[key]);
        }
      
        this.$axios.get(`/api/property?${str}&userId=${userId}`)
          .then(res => {
            console.log('items', res)
            this.items = res.data.result
          })
          .catch(err => console.log(err.response))
      } else {
        this.$axios.get(`/api/news?category=tv&currentPage=1&perPage=20&userId=${userId}`)
          .then(res => {
              console.log(res)
              this.items = res.data.result
            
          })
          .catch(err => console.log(err))
      }
    }
  },
  mounted () {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll)
    }
    this.getItems()
  },
  computed: {
    userDetail () {
      return this.$store.state.user
    }
  },
}
</script>

<style lang="scss" >
$pink : #ffa800;
.featured-properties {
  .filter-item {
    // padding: 0 5px;
  }
  .mod-content {
    padding-top: 20px;
  }
  .property {
    margin-bottom: 30px;
    @media screen and (max-width: 767px) {
      padding: 0 5px;
    }
  }

}
.sidebar {
  &.sticky {
    position: fixed;
    top: 0;
    width: 210px;
    @media screen and (max-width: 767px) {
      position: relative;
      width: auto;
    }
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

        &.active, &:hover {
          text-decoration: none;
          color: #b65800;
        font-weight: bold
        }
      }
    }
  }
}
</style>

