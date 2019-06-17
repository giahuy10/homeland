<template>
  <div class="inner-news">
    <div class="row">
        <div class="col-12 ">
            <nuxt-link :to="`/news/detail/${item.slug}`">
            <img :src="item.thumbnail" alt="">
            </nuxt-link>
            <p class="news-title"><nuxt-link :to="`/news/detail/${item.slug}`">{{item.title}}</nuxt-link></p>
            <div class="share">
            <div class="float-left">
                {{item.hits}} <i class="fa fa-eye" aria-hidden="true"></i>
            </div>
            <div class="float-right save-item" @click="save(item.id)">
                <i class="fa fa-heart" aria-hidden="true"></i>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    save (itemId) {

      this.$axios.post('/api/saved', {
        type: 2,
        itemId: itemId
      })
      .then(res => console.log(res))
      .catch(err=> console.log(err.response))
    }
  }
}
</script>
<style lang="scss">
$pink : #ffa800;
.save-item {
  &:hover {
    cursor: pointer;
    color: $pink;
  }
}
.share {
  color: #ae5e6c;
}
.news-title {
  margin-bottom: 5px;
  margin-top: 5px;
  a {
    color: $pink;
  }
}
</style>
