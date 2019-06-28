<template>
  <div class="comments">
    <Slider/>
    <div class="container">
    <div class="call-to-action text-center">
      <h2>Kinh nghiệm và thông tin bạn biết là vô cùng hữu ích, hãy cùng chia sẻ !</h2>
      <div class="input-group" id="comment-box">
          
                    <input  v-on:keyup.enter="searchProperty" type="text" class="form-control search-pro" v-model="protitle" placeholder="Nhập tên dự án bạn muốn viết bình luận..." >
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
          <div class="write-review">
            <b-button block v-b-modal.modal-1 variant="info" @click="review.proId = item.id"> <i class="fa fa-comment"></i> Viết bình luận</b-button>
            
          </div>
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
        <nuxt-link :to="`/property/detail/${comment.itemId}#comment${comment.id}`">Xem thêm</nuxt-link>
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
    <b-modal ref="my-modal" hide-footer id="modal-2" title="Tìm kiếm nâng cao">
      <p class="my-4">Đang cập nhật</p>
    </b-modal>
    <b-modal id="modal-1" title="Gửi bình luận" size="xl">
                  <div class="review" v-if="userDetail">
                  <b-row>
                    <b-col sm="2">

                      <button type="button" class="btn btn-primary">
                        Vị trí <span class="badge badge-light">{{review.location}}</span>

                      </button>
                    </b-col>
                    <b-col sm="10">
                      <b-form-input v-model="review.location" min="1" max="10" type="range"></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="2">
                      <button type="button" class="btn btn-primary">
                      Giá cả <span class="badge badge-light">{{review.price}}</span>
                      </button>
                    </b-col>
                    <b-col sm="10">
                      <b-form-input v-model="review.price" min="1" max="10" type="range"></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="2">
                      <button type="button" class="btn btn-primary">
                      Tiến độ <span class="badge badge-light">{{review.progress}}</span>
                      </button>
                    </b-col>
                    <b-col sm="10">
                      <b-form-input v-model="review.progress" min="1" max="10" type="range"></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="2">
                      <button type="button" class="btn btn-primary">
                      Chất lượng <span class="badge badge-light">{{review.quality}}</span>
                      </button>
                    </b-col>
                    <b-col sm="10">
                      <b-form-input v-model="review.quality" min="1" max="10" type="range"></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="2">
                      <button type="button" class="btn btn-primary">
                      Thiết kế <span class="badge badge-light">{{review.design}}</span>
                      </button>
                    </b-col>
                    <b-col sm="10">
                      <b-form-input v-model="review.design" min="1" max="10" type="range"></b-form-input>
                    </b-col>
                  </b-row>
                  <br> <br>
                <b-form-input
                  id="input-1"
                  v-model="review.title"

                  required
                  placeholder="Tiêu đề"
                ></b-form-input>
                <br>
                <b-form-textarea
                  id="textarea"
                  v-model="review.text"
                  placeholder="Viết bình luận của bạn..."
                  rows="3"
                  max-rows="6"
                  style="margin-bottom: 10px;"
                ></b-form-textarea>
                <input type="file" class="form-control" placeholder="" ref="file" v-on:change="handleFileUpload()" :disabled="review.images && review.images.length >=5">
          <b-spinner v-if="imageLoading" label="Loading..."></b-spinner>
          <div class="images" v-if="review.images && review.images.length > 0">
          <div class="img" v-for="(image, index) in review.images" :key="index">
            <div class="inner-img">
              <img :src="image.thumbnail" alt="">
              <i class="fa fa-trash" @click="removeImage(index)"></i>
            </div>

          </div>
          <div class="clearfix"></div>
        </div>
                </div>
                <div class="alert alert-warning" v-else>
                  Vui lòng <nuxt-link to="/login">đăng nhập</nuxt-link> để gửi bình luận
                </div>
                
                <br><br>
               <template  slot="modal-footer" slot-scope="{ ok, cancel }">

                  <div v-if="userDetail">

                    <b-spinner v-if="reviewLoading" label="Loading..."></b-spinner>
                    <b-button v-else size="sm" variant="success" @click="submitReview()">
                      Gửi bình luận
                    </b-button>
                    <b-button size="sm" variant="danger" @click="cancel()">
                      Hủy
                    </b-button>
                  </div>
                </template>
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
      imageLoading: false,
      reviewLoading: false,
      searched: false,
      properties: [],
      protitle: '',
      comments: [],
      currentPage: 1,
      rows: 0,
      perPage: 10,
      review: {
        location: 5,
        price:5,
        progress: 5,
        quality: 5,
        design:5,
        proId: 0,
        title: '',
        text: '',
        file: '',
        images: []
      },
    }
  },
  methods: {
     submitReview () {
      let userId = this.$store.state.user ? this.$store.state.user.id : 0
      this.reviewLoading = true
      // this.review.proId = this.detail.id
      this.$axios.post('/api/comments', {
        type: 1,
        itemId: this.review.proId,
        parent: 0,
        noLog: 1,
        text: `<p><b>${this.review.title}</b> <br> ${this.review.text}</p>`,
        images: this.review.images
      })
      .then(res => {
        console.log(res)
        this.getItems()
      })
      .catch(err => console.log(err.response))
      this.$axios.post(`/api/reviews`, this.review)
        .then(res => {
          this.review = {
            location: 5,
            price:5,
            progress: 5,
            quality: 5,
            design:5,
            proId: 0,
            title: '',
            text: '',
            images: []
          }
          this.reviewLoading = false
          this.$bvModal.hide('modal-1')
         
          this.toast('Thông báo', 'Cảm ơn bạn đã gửi đánh giá cho dự án này', 'success')
        })
        .catch(err => console.log(err.response))

      
    },
    handleFileUpload () {
      this.imageLoading = true
      let file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append('file', file);
      this.$axios.post( '/api/file/upload', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'folder': 'properties'
          }
        }
        ).then(res => {
          console.log(res)
          this.imageLoading = false
          this.review.images.push({
            source: res.data.location,
            thumbnail: res.data.thumbnail,
            height: res.data.heightThumb,
            width: res.data.widthThumb
          })
        })
        .catch(err => {
          console.log(err.response)
        })
    },
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
  },
  computed: {
    userDetail () {
      return this.$store.state.user
    }
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
    .comment-content {
            max-height: 72px;
    overflow: hidden;
    
    p {
      margin-bottom: 0;
    }
      }
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
