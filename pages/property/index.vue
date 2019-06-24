<template>
  <div class="list-properties">
    <Slider/>
    <div class="container">

      <div class="row">
        <div class="col-12 col-md-2">
          <div class="sidebar">
            <ul>

              <li><a href="#" :class="filter.sortBy == 'id' ? 'active' : ''" @click.prevent="filter.sortBy = 'id' , getItems()">Mua nhà ở đâu</a></li>
              <li><a href="#" :class="filter.sortBy == 'hits' ? 'active' : ''" @click.prevent="filter.sortBy = 'hits', getItems()">Dự án nào</a></li>
              <li><a href="#">Nhà đất TV</a></li>

              <li><a href="#" @click.prevent="$router.push({path: '/property/edit/0'})">Gửi thông tin</a></li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-10">
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
              <Property :item="item"/>
            </div>
            <div class="clear"></div>
          </div>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            @change="changePage"
            limit="10"
            class="float-left"
          ></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Property from '~/components/Property.vue'
import Slider from '~/components/Slider.vue'
import location from '~/static/local.json'

export default {
  mounted () {
    this.getItems()
  },
  components: {Property, Slider},
  data () {
    return {
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
        { value: 1, text: 'Căn hộ/ chung cư'},
        { value: 2, text: 'Biệt thự/ liền kề'},
        { value: 3, text: 'Shophouse'},
        { value: 4, text: 'Nghỉ dưỡng'},
        // { value: 5, text: 'Khu đô thị'},
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
      items: [],
      currentPage: 1,
      perPage: 20,
      pageOptions: [ 5, 10, 20, 50, 100],
      rows: 0,

    }
  },
  computed: {
    userDetail () {
      return this.$store.state.user
    }
  },
  methods: {
    getItems () {
       var str = "";
      for (var key in this.filter) {
          if (str != "") {
              str += "&";
          }
          str += key + "=" + encodeURIComponent(this.filter[key]);
      }
      let userId = this.userDetail ? this.userDetail.id : 0
      this.$axios.get(`/api/property?currentPage=${this.currentPage}&perPage=${this.perPage}&${str}&userId=${userId}`)
        .then(res => {
          console.log(res)
          this.items = res.data.result
          this.rows = res.data.count
        })
        .catch(err => console.log(err.response))
    },
    changePage (page) {
      this.currentPage = page
      this.getItems()
    },
  }
}
</script>

<style lang="scss">
$pink : #ffa800;

.list-properties {

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
            background: $pink;
            color: #fff;
          }
        }
      }
    }
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


}

</style>
