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

export default {
  mounted () {
    this.getItems()
  },
  components: {Property, Slider},
  data () {
    return {
      items: [],
      currentPage: 1,
      perPage: 20,
      pageOptions: [ 5, 10, 20, 50, 100],
      rows: 0,
      filter: {
        sortBy: 'id'
      }
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
