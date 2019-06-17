<template>
  <div class="activities">
    <b-list-group>
      <b-list-group-item href="#" v-for="(item, index) in items" :key="index"  class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">Bạn đã {{item.type | typeText}} một {{item.typeItem | typeName}}</h5>
          <small>{{ item.createdAt | moment("DD/MM/YYYY, h:mm:ss a") }}</small>
        </div>
        <small>Dự án này rất đẹp...</small>
      </b-list-group-item>
      <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            ></b-pagination>
    </b-list-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      currentPage: 1,
      rows: 0,
      perPage: 10,
    }
  },
  mounted () {
    this.getItems()
  },
  methods: {
    getItems () {
      this.$axios.get(`/api/activities?currentPage=${this.currentPage}&perPage=${this.perPage}`)
      .then(res => {
          console.log(res)
          this.items = res.data.result
          this.rows = res.data.count
      })
      .catch(err => console.log(err))
    }
  },
  filters: {
    typeName (value) {
      switch(value) {
        case 1:
          return 'bình luận'
          break;
        case 2:
          return 'bài viết'
          break;
        case 3:
          return 'dự án'
          break;
        case 4:
          return 'đánh giá'
          break;
        default:
          return 'bình luận'
      }
    },
    typeText (value) {
      switch(value) {
        case 1:
          return 'đăng'
          break;
        case 2:
          return 'thích'
          break;
        case 3:
          return 'bỏ thích'
          break;
        default:
          return 'đăng'
      }
    }
  }
}
</script>