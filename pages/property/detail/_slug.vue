<template>
  <div class="detail">
    <Slider></Slider>
    <div class="container">

      <div class="top row">
        <div class="col-12 col-md-6">
          <img :src="detail.thumbnail" alt="">
        </div>
        <div class="short-desc col-12 col-md-6">
          <h2>{{detail.title}}</h2>

          <p> {{detail.owner}} <br>
          {{detail.type == 9 ? detail.typeOther : types[detail.type]}}
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
            <li>{{detail.location}}</li>
            <li><b class="text-pink">{{detail.progressText ? detail.progressText : 'Đang cập nhật'}}</b></li> 
            <li><b class="text-pink">{{detail.price == 9 ? detail.priceOther : optionsPrice[detail.price]}}</b></li>
          </ul>
          <div v-if="detail.state == -1 && userDetail && userDetail.level == 2">
            <b-button variant="success" @click="approve">Phê duyệt bài viết</b-button>
          </div>
          <div v-if="userDetail && userDetail.level == 2">
              <b-button variant="info" @click="$router.push({path: `/property/edit/${detail.id}`})">Chỉnh sửa dự án</b-button>
              <b-button variant="warning" @click="removeItem(detail.id)">Xóa dự án</b-button>
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
                <div v-html="detail.overview"></div>
              </div>
              <a href="#" @click.prevent="open=true" v-if="!open">Xem thêm</a>
              <a href="#" @click.prevent="open=false" v-else>Thu gọn</a>
            </div>
            <div class="galleries">
              <h4 id="galleries">Ảnh dự án</h4>
              <Gallery :items="detail.images.filter(item => item.type == 1)" :totalWidth="detail.totalWidth" v-if="detail.images && detail.images.filter(item => item.type == 1).length > 0"/>
                <h5>Sản phẩm</h5>
                <div v-html="detail.product"></div>
                <h5>Tiện tích</h5>
                <div v-html="detail.facilities"></div>
                <h5>Bàn giao</h5>
                <div v-html="detail.handover"></div>
            </div>
            <div class="p-progress">
              <h4 id="p-progress">Tiến độ</h4>
              <Gallery :items="detail.images.filter(item => item.type == 2)" :totalWidth="detail.totalWidth2" v-if="detail.images && detail.images.filter(item => item.type == 2).length > 0"/>
              <div v-html="detail.progress"></div>
            </div>
            <div class="comments" v-if="detail.state == 1">
              <h4 id="comments">Bình luận</h4>
                <div class="list-chat">
                  <div class="chat">
                    <ul class="list-unstyled">

                      <li class="media" :class="comment.parent ? 'child' : ''" v-for="(comment, index) in detail.comments.result" :ref="`comment_${comment.id}`" :key="index" :id="'comment'+comment.id">
                        <img :src="comment.avatar ? comment.avatar : '/images/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg'" class="mr-3 avatar-chat" alt="...">
                        <div class="media-body">
                          <div class="comment-text">
                            <b >
                              <nuxt-link class="text-info" to="#">{{comment.firstName +' '+comment.lastName}}</nuxt-link>
                            </b> <small>{{comment.createdAt | moment("DD/MM/YYYY, h:mm:ss a")}}</small>
                            <div v-html="comment.text"></div>
                          <GalleryComment :items="JSON.parse(comment.images)" v-if="comment.images && JSON.parse(comment.images).length > 0" />

                          </div>
                          <div class="reply" :id="`reply_${comment.id}`">
                            <a href="#" v-if="userDetail" :class="comment.like ? 'liked' : ''" @click.prevent="saveCM(comment, index)">Thích</a> 
                            <a href="#" v-if="userDetail" @click.prevent="openComment(comment)">Thảo luận</a>
                            <a href="#" @click.prevent="removeComment(comment.id, index)" v-if="(userDetail && userDetail.id == comment.createdBy) || (userDetail && userDetail.level == 2)">Xóa</a>
                            <div class="comment-box" :id="`comment-box-${comment.id}`">

                            <form @submit.prevent="sendComment">
                              <div class="input-group"  v-if="userDetail">
                                <input type="text" ref="commentInputText" class="form-control" v-model="commentText" placeholder="Hãy cùng bình luận nhé" >
                                <div class="input-group-append">
                                  <div class="input-group-text"> 
                                    <a href="#" @click.prevent="sendComment">
                                      <i class="fa fa-reply-all" aria-hidden="true"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </form>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- <div class="input-group" id="comment-box" v-if="userDetail && commentParent">
                  <input type="text" class="form-control" v-model="commentText" placeholder="Hãy cùng bình luận nhé" >
                  <div class="input-group-append">
                    <div class="input-group-text"> <a :href="'#comment'+commentParent" @click="sendComment"><i class="fa fa-reply-all" aria-hidden="true"></i></a></div>
                  </div>
                </div> -->
            

            </div>
            <div class="map">
              <h4 id="map">Bản đồ</h4>
              <div v-html="detail.map"></div>
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
                <b-button block v-b-modal.modal-1 variant="info" v-if="detail.state == 1"> <i class="fa fa-comment"></i> Viết bình luận</b-button>
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
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import $ from 'jquery'
import Slider from '~/components/Slider.vue'
import Gallery from '~/components/Gallery.vue';
import GalleryComment from '~/components/GalleryComment.vue';
export default {
  components: {Gallery, Slider, GalleryComment},
  async asyncData({ store, params }) {
    let userId = store.state.user ? store.state.user.id : 0
    await store.dispatch('property/getPropertyDetail', { slug: params.slug, userId })
  },
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
      types: {

          1: 'Căn hộ chung cư',
          2: 'Biệt thự/ liền kề/ shophouse (nhà đất)',
          3: 'Căn hộ - Nhà đất',
          4: 'Tổ hơp thương mại – căn hộ - nhà đất',
          5: 'Khu đô thị',
          6: 'Căn hộ cao cấp'  ,
          7: 'Căn hộ cao cấp và căn hộ dịch vụ',
          8: 'Căn hộ - văn phòng - dịch vụ',
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
    openComment (comment) {
      $('.comment-box').hide()
      $('#comment-box-'+comment.id).show()
      // this.$refs.commentInputText[0].focus()
      this.commentParent = comment.parent ? comment.parent : comment.id
      // <div class="input-group" id="comment-box" v-if="userDetail">
      //   <input type="text" class="form-control" v-model="commentText" placeholder="Hãy cùng bình luận nhé" >
      //   <div class="input-group-append">
      //     <div class="input-group-text"> 
          //   <a :href="'#comment'+commentParent" @click="sendComment">
          //     <i class="fa fa-reply-all" aria-hidden="true"></i>
          //   </a>
          // </div>
      //   </div>
      // </div>
      // $('.comment-box-input').remove();
      // this.commentParent = comment.parent ? comment.parent : comment.id
      // let com_el = this.$refs[`comment_${comment.id}`]

      // let div = document.createElement('div')
      // div.setAttribute("class", "input-group comment-box-input")

      // let input = document.createElement('input')
      // input.setAttribute('class', 'form-control')
      // input.setAttribute('placeholder', 'Hãy cùng bình luận nhé')
      // input.setAttribute('ref', 'commentText')
      // div.appendChild(input)

      // let inputGroupAppend = document.createElement('div')
      // inputGroupAppend.setAttribute('class','input-group-append')

      // let inputGroupText = document.createElement('div')
      // inputGroupText.setAttribute('class','input-group-text')

      // let inputAnchor = document.createElement('a')
      // inputAnchor.setAttribute('href','#')
      // inputAnchor.setAttribute('onClick', 'sendComment()')

      // let icon = document.createElement('i')
      // icon.setAttribute('class', 'fa fa-reply-all')

      // inputAnchor.appendChild(icon)
      // inputGroupText.appendChild(inputAnchor)
      // inputGroupAppend.appendChild(inputGroupText)
      // div.appendChild(inputGroupAppend)
    
      // document.getElementById('reply_'+comment.id).appendChild(div);

    },
    
    removeItem (id) {
      if (confirm('Bạn chắc chắn muốn xóa dự án này?')) {
        this.$axios.delete(`/api/property/${id}`)
          .then(res => {
            this.toast('Thông báo', 'Dự án đã được xóa', 'success')
            this.$router.push({path: '/property'})
          })
          .catch(err => console.log(err))
      }
    },
    save (itemId) {

      this.$axios.post('/api/saved', {
        type: 1,
        itemId: itemId
      })
      .then(res => console.log(res))
      .catch(err=> console.log(err.response))
    },
    getReview () {
      this.$axios.get(`/api/reviews/${this.detail.id}`)
        .then(res => {
          console.log('review', res)
          this.reviewResult = res.data
        })
        .catch(err => console.log(err.response))
    },
    submitReview () {
      let userId = this.$store.state.user ? this.$store.state.user.id : 0
      this.reviewLoading = true
      this.review.proId = this.detail.id
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
          this.$store.dispatch('property/getPropertyDetail', { slug: this.detail.id, userId })
          this.toast('Thông báo', 'Cảm ơn bạn đã gửi đánh giá cho dự án này', 'success')
        })
        .catch(err => console.log(err.response))

      this.$axios.post('/api/comments', {
        type: 1,
        itemId: this.detail.id,
        parent: 0,
        noLog: 1,
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
      this.$axios.get(`/api/property/comment/${this.detail.id}?userId=${userId}`)
        .then(res => {
          console.log('comments', res)
          this.comments = res.data.result
        })
        .catch(err => console.log(err.response))
    },
    getDetail () {
      this.$axios.get(`/api/property/${this.$route.params.slug}`)
        .then(res => {
          console.log('detail', res)
          this.item = res.data
          // this.getDistricts()
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
      let userId = this.$store.state.user ? this.$store.state.user.id : 0
      this.$axios.post('/api/comments', {
        type: 1,
        itemId: this.detail.id,
        parent: this.commentParent,
        text: this.commentText,
        url: `/property/detail/${this.detail.id}`
      })
      .then(res => {
        console.log(res)
        this.getComments()
        this.commentText = ''
        this.commentParent = 0
        this.$store.dispatch('property/getPropertyDetail', { slug: this.detail.id, userId })
        $('.comment-box').hide()
      })
      .catch(err => console.log(err.response))

    },
    saveCM (item, index) {
      let userId = this.$store.state.user ? this.$store.state.user.id : 0
      this.$axios.post('/api/saved', {
        type: 1,
        itemId: item.id,
        title: item.text
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
          this.$store.dispatch('property/getPropertyDetail', { slug: this.detail.id, userId })
        } else{
          // dislike
          title = 'Thành công'
          text = 'Bạn đã hủy thích một bình luận'
          variant = 'warning'
          this.$store.dispatch('property/getPropertyDetail', { slug: this.detail.id, userId })
        }
        this.toast(title, text, variant)
      })
      .catch(err=> console.log(err))
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
    removeComment (id, index) {
      let userId = this.$store.state.user ? this.$store.state.user.id : 0
      this.$axios.delete(`/api/comments/${id}`)
      .then(res=> {
        this.toast('Thông báo', 'Xóa bình luận thành công', 'success')
        this.$store.dispatch('property/getPropertyDetail', { slug: this.detail.id, userId })
      })
      .catch(err=> console.log(err.response))
    },
    approve () {
      this.$axios.put(`/api/property/${this.detail.id}`, {
        state: 1
      }).then(res => {
        console.log(res)
        this.toast('Thông báo', 'Phê duyệt dự án thành công', 'success')
        location.reload()
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
    strigTags (note) {
      return note.replace(/(<([^>]+)>)/ig,"")
    },
  },
  mounted () {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll)
    }
    // this.getDetail()
    // this.getComments()
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
    },
    detail () {
      console.log('detail', this.$store.state.property.propertyDetail)
      return this.$store.state.property.propertyDetail
    }

  },
  head () {
    return {
      title: this.detail.title,
      meta: [
        { hid: 'description', name: 'description', content: this.strigTags(this.detail.overview) },

        {
          hid: 'og:title',
          property: 'og:title',
          content: this.detail.title
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'http://homenland.vn/property/detail/'+this.detail.slug
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'http://homenland.vn'+this.detail.thumbnail
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.strigTags(this.detail.overview)
        }
      ]
    }

  }
}
</script>

<style lang="scss" scoped>
$pink : #ffa800;
.comment-box  {
  display: none;
}
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
  .galleries {
    h5 {
      padding-left: 20px;
      text-decoration: underline;
    }
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
iframe {
    width: 100% !important;
}
</style>

