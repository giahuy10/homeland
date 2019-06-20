<template>
  <div class="comments">
    <Slider/>
    <div class="container">
    <div class="call-to-action text-center">
      <h2>Kinh nghiệm và thông tin bạn biết là vô cùng hữu ích, hãy cùng chia sẻ !</h2>
      <div class="input-group" id="comment-box">
                    <input type="text" class="form-control search-pro" v-model="protitle" placeholder="Nhập tên dự án bạn muốn viết bình luận" >
                    <div class="input-group-append">
                      <div class="input-group-text" @click="searchProperty"><i class="fa fa-search" aria-hidden="true"></i></div>
                    </div>
                  </div>

    <br>
      <p>Nếu bạn không tìm thấy, hãy sử dụng công cụ tìm kiếm thông minh hơn <a href="#" class="advanced" @click.prevent="showModal">tại đây</a></p>
    </div>
    <div class="search-result" v-if="properties && properties.length > 0">
      <div class="row">
        <div class="col-12 col-md-3" v-for="(item, index) in properties" :key="index">
          <Property :item="item"></Property>
        </div>
      </div>
    </div>
    <div class="list-comments row">
      <div class="comment col-6" v-for="(comment, index) in comments" :key="index">
        <div class="inner-comment">
        <b-media>
          <img slot="aside" :src="comment.user ? comment.user.avatar : ''" alt="Media Aside">
          <p>
            <b>{{comment.user ? comment.user.firstName+' '+comment.user.lastName : ''}}</b>
            <br> <nuxt-link :to="`/property/detail/${comment.itemId}`">{{comment.property.title}}</nuxt-link>
            <br> <small>{{comment.createdAt | moment("DD/MM/YYYY, h:mm:ss a")}}</small>
          </p>
          <!-- b-[Optional: add media children here for nesting] -->
        </b-media>
        <div class="comment-content" v-html="comment.text">

        </div>
        <GalleryComment :items="JSON.parse(comment.images)" v-if="comment.images && JSON.parse(comment.images).length > 0" />
        </div>
      </div>
    </div>
    <br><br>
    <b-pagination
    @change="changePage"
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table"
                    ></b-pagination>
    <b-modal ref="my-modal" hide-footer id="modal-1" title="Tìm kiếm nâng cao">
      <p class="my-4">Đang cập nhật</p>
    </b-modal>
  </div>
  </div>
</template>

<script>
import GalleryComment from '~/components/GalleryComment.vue';

import Property from '~/components/Property.vue'
import Slider from '~/components/Slider.vue'
export default {
   components: {Slider, Property, GalleryComment},
  data () {
    return {
      searched: false,
      properties: [],
      protitle: '',
      comments: [],
      currentPage: 1,
            rows: 0,
            perPage: 10,

    }
  },
  methods: {
    changePage (page) {
      this.currentPage = page
      this.getItems()
    },
    searchProperty () {
      this.searched = true
      this.$axios.get(`/api/property?title=${this.protitle}`)
        .then(res => {
          console.log(res)
          this.properties = res.data.result
          if (this.properties.length <= 0) {
            this.toast('Kết quả','Không tìm thấy dự án nào phù hợp', 'warning')
          } else {
            this.toast('Kết quả','Tìm thấy '+this.properties.length+' dự án', 'success')
          }
        })
        .catch(err => console.log(err.response))
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
      },
    openSearch () {

    },
    getItems() {
this.$axios.get(`/api/comments?currentPage=${this.currentPage}&perPage=${this.perPage}`)
                .then(res => {
                    console.log(res)
                    this.comments = res.data.result
                    this.rows = res.data.count
                })
                .catch(err => console.log(err))
    },
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
  },
  mounted () {
    this.getItems()
  }
}
</script>

<style lang="scss">
a.advanced {
  text-decoration: underline;
}
$pink : #e7005a;
.list-comments {
  .comment {
    .inner-comment {


    padding: 20px;
    border: 1px solid #ccc;
    margin-top: 30px;
    border-radius: 5px;
    .media {
      img {
        width: 70px;
        height: 70px;
      }
    }
    }
  }
}
.call-to-action {
  h2 {
    color: $pink;
    font-size: 25px;
    margin-top: 20px;
  }
}
.search-pro {
  height: 70px;


    border-color: #80bdff;

    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);

}
</style>
