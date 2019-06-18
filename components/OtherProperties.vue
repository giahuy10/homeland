<template>
  <div class="featured-properties">
    <div class="container">
      <div class="row">
        <div class="col-20 module-title">
          <h2 v-if="title" class="mod-title">Dự án mới</h2>
        </div>
      </div>
      <div class="mod-content">
        <div class="row">
          <div v-for="(item, index) in items" :key="index" class="property col-20">
            <Property :item="item" />
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Property from '~/components/Property.vue'
export default {
  components: {Property},
  props: ['title'],
  mounted () {
    this.getItems()
  },
  methods: {
    getItems () {
      let userId = this.userDetail ? this.userDetail.id : 0
      this.$axios.get(`/api/property?perPage=5&currentPage=1&userId=${userId}`)
        .then(res => {
          console.log(res)
          this.items = res.data.result
        })
        .catch(err => console.log(err.response))
    }
  },
  computed: {
    userDetail () {
      return this.$store.state.user
    }
  },
  data () {
    return {

      items: [
      ],
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

