<template>
  <div class="detail">
    <Slider></Slider>
    <div class="container">

      <div class="top row">
        <div class="col-12 col-md-6">
          <img src="/images/ha-noi-home-land/main.jpg" alt="">
        </div>
        <div class="short-desc col-12 col-md-6">
          <h2>{{item.title}}</h2>

          <p> {{item.owner}} <br>
          Căn hộ chung cư và dịch vụ
          </p>

          <table>
            <tbody>
              <tr>
                <td>
                  <span class="score">{{Math.ceil(reviewResult.location_avg) }}</span>
                  <span class="name">Vị trí</span>
                </td>

                <td>
                  <span class="score">{{Math.ceil(reviewResult.price_avg) }}</span>
                  <span class="name">Giá cả</span>
                </td>
                <td>
                  <span class="score">{{Math.ceil(reviewResult.progress_avg) }}</span>
                  <span class="name">Tiến độ</span>
                </td>
                <td>
                  <span class="score">{{Math.ceil(reviewResult.quality_avg) }}</span>
                  <span class="name">Chất lượng</span>
                </td>
                <td>
                  <span class="score">{{Math.ceil(reviewResult.design_avg) }}</span>
                  <span class="name">Thiết kế</span>
                </td>
              </tr>
            </tbody>

          </table>
          <ul>
            <li>{{item.location}}</li>
            <li><b class="text-pink">Đang xây dựng</b></li>
            <li><b class="text-pink">{{optionsPrice[item.price]}}</b></li>
          </ul>
          <div v-if="item.state == -1 && userDetail && userDetail.level == 2">
            <b-button variant="success" @click="approve">Phê duyệt bài viết</b-button>
          </div>
          <div v-if="userDetail && userDetail.level == 2">
              <b-button variant="info" @click="$router.push({path: `/property/edit/${item.id}`})">Chỉnh sửa dự án</b-button>
            </div>

        </div>
      </div>
      <div class="clear"></div>
      <div class="detail-content">
        <div class="row">
          <div class="col-12 col-md-2">
            <ul class="nav-scroll" :class="navClass">
              <li>
                <a href="#overview" @click="activeMenu='overview'" :class="activeMenu == 'overview' ? 'active' : ''">Trang chủ</a>
              </li>
              <li>
                <a href="#galleries" @click="activeMenu='galleries'" :class="activeMenu == 'galleries' ? 'active' : ''">Ảnh dự án</a>
              </li>
              <li>
                <a href="#p-progress" @click="activeMenu='p-progress'" :class="activeMenu == 'p-progress' ? 'active' : ''">Tiến độ</a>
              </li>
              <li>
                <a href="#comments" @click="activeMenu='comments'" :class="activeMenu == 'comments' ? 'active' : ''">Bình luận</a>
              </li>
              <li>
                <a href="#map" @click="activeMenu='map'" :class="activeMenu == 'map' ? 'active' : ''">Bản đồ</a>
              </li>
            </ul>
          </div>
          <div class="col-12 col-md-7">
            <div class="overview">
              <h4 id="overview">Trang chủ</h4>
              <div class="inner-overview" :class="open ? 'open' : ''">
                <div v-html="item.overview"></div>
              </div>
              <a href="#" @click.prevent="open=true" v-if="!open">Xem thêm</a>
              <a href="#" @click.prevent="open=false" v-else>Thu gọn</a>
            </div>
            <div class="galleries">
              <h4 id="galleries">Ảnh dự án</h4>
              <Gallery :items="item.images" :totalWidth="item.totalWidth" v-if="item.images && item.images.length > 0"/>
                <h5>Sản phẩm</h5>
                <div v-html="item.product"></div>
                <h5>Tiện tích</h5>
                <div v-html="item.facilities"></div>
            </div>
            <div class="p-progress">
              <h4 id="p-progress">Tiến độ</h4>
              <div v-html="item.progress"></div>
            </div>
            <div class="comments" v-if="item.state == 1">
              <h4 id="comments">Bình luận</h4>
                <div class="list-chat">
                  <div class="chat">
                    <ul class="list-unstyled">

                      <li class="media" :class="comment.parent ? 'child' : ''" v-for="(comment, index) in comments" :key="index">
                        <img :src="comment.avatar" class="mr-3" alt="...">
                        <div class="media-body">
                          <div class="comment-text">
                            <b>
                              <nuxt-link to="#">{{comment.firstName +' '+comment.lastName}}</nuxt-link>
                            </b> <small>{{comment.createdAt | moment("DD/MM/YYYY, h:mm:ss a")}}</small>
                            <div v-html="comment.text"></div>
                          </div>
                          <div class="reply"><a href="#" :class="comment.like ? 'liked' : ''" @click.prevent="saveCM(comment.id, index)">Thích</a> <a href="#comment-box" @click="commentParent = comment.parent, commentText = '@'+comment.user.lastName+' '">Thảo luận</a></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="input-group" id="comment-box" v-if="userDetail">
                  <input type="text" class="form-control" v-model="commentText" placeholder="Hãy cho mọi người biết suy nghĩ của bạn về dự án này" >
                  <div class="input-group-append">
                    <div class="input-group-text" @click="sendComment"><i class="fa fa-reply-all" aria-hidden="true"></i></div>
                  </div>
                </div>
                <div class="alert alert-warning" v-else>
                  Vui lòng <nuxt-link to="/login">đăng nhập</nuxt-link> để gửi bình luận
                </div>

            </div>
            <div class="map">
              <h4 id="map">Bản đồ</h4>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59593.520278147014!2d105.93197290008044!3d21.00886500208229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb760f3c179e923f!2zVsSDbiBwaMOybmcgYsOhbiBow6BuZyBk4buxIMOhbiBIYW5vaSBIb21lbGFuZCBOZ3V54buFbiBWxINuIEPhu6s!5e0!3m2!1svi!2s!4v1559171088529!5m2!1svi!2s" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="right-bar" :class="navClass">

              <div class="lending-module">
                 <h4>Công cụ tính khoản vay</h4>
                <table class="table">
                  <tbody>


                  <tr>

                    <td><b-form-input v-model="price" placeholder="Số tiền vay"></b-form-input>


                    </td>
                    <td>VNĐ</td>

                  </tr>
                  <tr>

                    <td><b-form-input v-model="loan.months" placeholder="Thời gian vay"></b-form-input></td>
                    <td>tháng</td>
                  </tr>
                  <tr>

                    <td><b-form-input v-model="loan.interest_rate" placeholder="Lãi suất"></b-form-input></td>
                    <td>%/năm</td>
                  </tr>
                  <tr>
                    <td colspan="2" class="text-center">
                      <b-button variant="info" @click.prevent="calculateLoan">Tính</b-button>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <table class="table result" v-if="loan.result">
                  <tbody>


                  <tr>
                    <td style="width: 50%;">Số tiền trả tháng đầu</td>
                    <td>{{formatNumber(loan.monthlyPayment)}}</td>
                  </tr>
                  <tr>
                    <td>Tổng lãi phải trả</td>
                    <td>{{formatNumber(loan.totalInterest)}}</td>
                  </tr>
                  <tr>
                    <td>Tổng số tiền gốc và lãi phải trả</td>
                    <td>{{formatNumber(loan.loanPayment)}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="write-review">
                <b-button block v-b-modal.modal-1 variant="info" v-if="item.state == 1"> <i class="fa fa-comment"></i> Gửi bình luận</b-button>
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

                </div>
                <div class="alert alert-warning" v-else>
                  Vui lòng <nuxt-link to="/login">đăng nhập</nuxt-link> để gửi bình luận
                </div>
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
                <br><br>
               <template slot="modal-footer" slot-scope="{ ok, cancel }">

                  <!-- Emulate built in modal footer ok and cancel button actions -->

                  <b-spinner v-if="reviewLoading" label="Loading..."></b-spinner>
                  <b-button v-else size="sm" variant="success" @click="submitReview()">
                    Gửi bình luận
                  </b-button>
                  <b-button size="sm" variant="danger" @click="cancel()">
                    Hủy
                  </b-button>

                </template>
                </b-modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Slider from '~/components/Slider.vue'
import Gallery from '~/components/Gallery.vue';
export default {
  components: {Gallery, Slider},

  data () {

    return {
      reviewLoading: false,
      imageLoading: false,
      commentParent: 0,
      commentText: '',
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

      price: 0,
      comments: [],
      item: {},
      activeMenu: 'overview',
      file: '',
      loan: {
        total: 0,
        months: 12,
        interest_rate: 0,
        monthlyPayment: 0,
        loanPayment: 0,
        totalInterest: 0,
        result: false
      },
      images: [
        '/images/1.jpg',
        '/images/2.jpg',
        '/images/3.jpg',
        '/images/4.png',
        '/images/5.jpg',
      ],
      open: false,
      openReply: false,
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
      navClass: '',
      reviewResult: {
        location_avg: 0,
        price_avg:0,
        progress_avg: 0,
        quality_avg: 0,
        design_avg:0,
      }
    }
  },
  methods: {
    save (itemId) {

      this.$axios.post('/api/saved', {
        type: 1,
        itemId: itemId
      })
      .then(res => console.log(res))
      .catch(err=> console.log(err.response))
    },
    getReview () {
      this.$axios.get(`/api/reviews/${this.$route.params.slug}`)
        .then(res => {
          console.log('review', res)
          this.reviewResult = res.data
        })
        .catch(err => console.log(err.response))
    },
    submitReview () {
      this.reviewLoading = true
      this.review.proId = this.item.id
      this.$axios.post(`/api/reviews`, this.review)
        .then(res => {
          this.review = {
            location: 5,
            price:5,
            progress: 5,
            quality: 5,
            design:5,
            proId: 0
          }
          this.reviewLoading = false
          this.$bvModal.hide('modal-1')
          this.getReview()
          this.toast('Thông báo', 'Cảm ơn bạn đã gửi đánh giá cho dự án này', 'success')
        })
        .catch(err => console.log(err.response))

      this.$axios.post('/api/comments', {
        type: 1,
        itemId: this.item.id,
        parent: 0,
        text: `<p><b>${this.review.title}</b> <br> ${this.review.text}</p>`,
        images: this.review.images
      })
      .then(res => {
        console.log(res)
        this.getComments()
      })
      .catch(err => console.log(err.response))
    },
    getComments () {
      let userId = this.userDetail ? this.userDetail.id : 0
      this.$axios.get(`/api/property/comment/${this.$route.params.slug}?userId=${userId}`)
        .then(res => {
          console.log(res)
          this.comments = res.data.result
        })
        .catch(err => console.log(err.response))
    },
    getDetail () {
      this.$axios.get(`/api/property/${this.$route.params.slug}`)
        .then(res => {
          console.log('detail', res)
          this.item = res.data
          this.getDistricts()
        })
        .catch(err => console.log(err))
    },
    calculateLoan () {
      let total = this.price
      total = total.replace(/,/g, '')

      console.log(total)
      total = parseInt(total)
      console.log(total)
      this.loan.monthlyPayment = ((this.loan.interest_rate/(100 * 12)) * total) / ( 1 - Math.pow(1 + this.loan.interest_rate / 1200, ( 0 - this.loan.months)))
      this.loan.loanPayment = Math.round(this.loan.monthlyPayment * this.loan.months)
      this.loan.totalInterest = Math.round(this.loan.monthlyPayment * this.loan.months - total)
      this.loan.monthlyPayment = Math.round(this.loan.monthlyPayment)
      this.loan.result = true
    },
    handleScroll (event) {
      // Any code to be executed when the window is scrolled
      if (window.scrollY > 800) {
        this.navClass = 'sticky'
      } else {
        this.navClass = ''
      }
    },
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
    sendComment () {
      this.$axios.post('/api/comments', {
        type: 1,
        itemId: this.item.id,
        parent: this.commentParent,
        text: this.commentText
      })
      .then(res => {
        console.log(res)
        this.getComments()
        this.commentText = ''
      })
      .catch(err => console.log(err.response))

    },
    saveCM (id, index) {
      this.$axios.post('/api/saved', {
        type: 1,
        itemId: id
      })
      .then(res => {
        let title = ''
        let text = ''
        let variant = ''
        if(res.data.id) {
          // Like
          title = 'Thành công'
          text = 'Bạn đã thích một bình luận'
          variant = 'success'
          this.comments[index].like = 1
        } else{
          // dislike
          title = 'Thành công'
          text = 'Bạn đã hủy thích một bình luận'
          variant = 'warning'
          this.comments[index].like = null
        }
        this.toast(title, text, variant)
      })
      .catch(err=> console.log(err.response))
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
    approve () {
      this.$axios.put(`/api/property/${this.item.id}`, {
        state: 1
      }).then(res => {
        console.log(res)
        this.toast('Thông báo', 'Phê duyệt dự án thành công', 'success')
        this.getDetail()
      })
      .catch(err => console.log(err))
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

  },
  mounted () {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll)
    }
    this.getDetail()
    this.getComments()
    this.getReview()
  },
  watch: {
    price: function(newValue) {
      const result = newValue.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.$nextTick(() => this.price = result);
    }
  },
  computed: {
    userDetail () {
      return this.$store.state.user
    }
  },
}
</script>

<style lang="scss" scoped>
$pink : #ffa800;
.detail {
  .top {
    .short-desc {
      table {
        tr {
          td {
            padding: 15px;
            text-align: center;
            span {
              display: block;
              &.total {
                background: $pink;
                color: #fff;
                font-size: 20px;
                border-radius: 100%;
                padding: 15px;
              }
              &.score {
                background: $pink;
                color: #fff;
                font-size: 30px;
                font-weight: bold;
                margin-bottom: 10px;
                border: 1px solid;
                border-radius: 100%;
                width: 50px;
              }
            }
          }
        }
      }
    }
  }
  .list-images {
    border: 10px solid #f5f5f5;
    > div.item-img {
      width: 20%;
      float: left;
    }
  }
  .detail {
    margin-top: 40px;
    .sidebar {
      width: 20%;
      ul {
        list-style: none;
        padding-left: 0;
        li {
          padding: 5px 10px;
          border-bottom: 1px solid #f5f5f5;
          a {
            color: $pink;

          }
        }
      }
    }
    .content {
      width: 80%;

    }
  }
}

.detail-content {
  iframe {
    width: 100%;
  }
  .overview {
    .inner-overview {
      height: 50px;
      overflow: hidden;
      &.open {
        height: auto;
      }
    }
  }
  h4 {
    margin: 20px 0;
    background: #ececec;
    padding: 10px;
  }
}
.nav-scroll {
  list-style: none;
  padding-left: 0;
  padding-top: 20px;
  &.sticky {
    position: fixed;
    top: 0;
    width: 190px;
    @media screen and (max-width: 767px) {
      position: relative;
      width: auto;
    }
  }
  li {
    a {
      display: block;
      background: #ececec;
      color: #000;
      padding: 10px;
      border-bottom: 1px solid #ffffff;
      &:hover, &.active  {
        text-decoration: none;
        background: $pink;
        color: #fff;
      }

    }
  }
}
.review {
  .row {
    margin-bottom: 10px;
  }
}
.right-bar {
      padding-top: 20px;

  &.sticky {
    position: fixed;
    top: 0;
    @media screen and (max-width: 767px) {
      position: relative;
    }
  }
  .lending-module {
    border: 1px solid #ccc;
    margin-bottom: 30px;
    background: #f8f9fa;
    h4 {
      padding: 10px;
      margin: 0;
    }
    .table {
      tr {
        td {
          border: 0;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>

