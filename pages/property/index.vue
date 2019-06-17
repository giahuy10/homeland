<template>
  <div class="list-properties">
    <div class="container">
      <div class="row">
        <div class="col-2">
          <div class="sidebar">
            <ul>
              <li><a href="#" @click.prevent="sortBy('createdAt')">Mua nhà ở đâu</a></li>
              <li><a href="#" @click.prevent="sortBy('hits')">Dự án nào</a></li>
              <li><a href="#" @click.prevent="sortBy('createdAt')">Nhà đất TV</a></li>
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

export default {
  mounted () {
    this.getItems()
  },
  components: {Property},
  data () {
    return {
      items: [],
      currentPage: 1,
      perPage: 20,
      pageOptions: [ 5, 10, 20, 50, 100],
      rows: 0,
    }
  },
  methods: {
    getItems () {

      this.$axios.get(`/api/property?currentPage=${this.currentPage}&perPage=${this.perPage}`)
        .then(res => {
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
