<template>
  <div class="saved">
    <b-tabs content-class="mt-3">
      <b-tab title="Dự án" active>
        <div class="row">
          <div class="col-12 col-md-3" v-for="(item, index) in properties" :key="index">
            <Property :item="item"/>
          </div>
        </div>
      </b-tab>
      <b-tab title="Bài viết">
        <div class="row">
          <div class="col-12 col-md-3" v-for="(item, index) in news" :key="index">
            <Post :item="item"/>
          </div>
        </div>
      </b-tab>

    </b-tabs>
  </div>
</template>

<script>
import Post from '~/components/Post.vue'
import Property from '~/components/Property.vue'
export default {
  components: {
    Post,
    Property
  },
  data () {
    return {
      properties: [],
      news: []
    }
  },
  mounted () {
    this.getProperties()
    this.getNews()
  },
  methods: {
    getProperties() {
      this.$axios.get('/api/saved/3')
        .then(res => {
          console.log(res)
          this.properties = res.data
        })
        .catch(err => console.log(err.response))
    },
    getNews() {
      this.$axios.get('/api/saved/2')
        .then(res => {
          console.log(res)
          this.news = res.data
        })
        .catch(err => console.log(err.response))
    }
  }
}
</script>
