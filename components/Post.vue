<template>
  <div class="inner-news">
    <div class="row">
        <div class="col-12 ">
            <nuxt-link :to="`/news/detail/${item.slug}`">
            <img class="news-thumb" :src="item.thumbnail" alt="">
            </nuxt-link>
            <p class="news-title"><nuxt-link :to="`/news/detail/${item.slug}`">{{item.title}}</nuxt-link></p>
            <div class="share">
            <div class="float-left">
                {{item.hits}} <i class="fa fa-eye" aria-hidden="true"></i>
            </div>
            <div class="float-right save-item" @click="save(item)">
                <i class="fa fa-heart" :class="item.like ? 'saved' : ''" aria-hidden="true"></i>
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
    save (item) {
      if (this.$store.state.user) {
      this.$axios.post('/api/saved', {
        type: 2,
        itemId: item.id,
        title: item.title,
        url: `/news/detail/${item.slug}`
      })
      .then(res => {
        let title = ''
        let text = ''
        let variant = ''
        if(res.data.id) {
          // Like
          title = 'Thành công'
          text = 'Bạn đã lưu bài viết thành công'
          variant = 'success'
          this.item.like = 1
        } else{
          // dislike
          title = 'Thành công'
          text = 'Bạn đã hủy lưu bài viết'
          variant = 'warning'
          this.item.like = null
        }
        this.toast(title, text, variant)
      })
      .catch(err=> console.log(err.response))
      } else {
        this.toast('Thông báo', 'Vui lòng đăng nhập trước để lưu bài viết', 'warning')
      }
    },
    toast(title, text, variant) {
      console.log('ok')
        this.$bvToast.toast(text, {
          title: title,
          toaster: 'b-toaster-bottom-right',
          solid: true,
          appendToast: true,
          variant: variant
        })
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
  color: #8f8f8f;
}

.news-title {
  margin-bottom: 5px;
  margin-top: 5px;
  max-height: 24px;
    overflow: hidden;
  a {
    color: #2a5a7c;
  }
}
img.news-thumb {
    width: 100%;
    height: 200px;
}
</style>
