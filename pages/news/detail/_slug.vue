<template>
    <div class="news-detail">
      <Slider/>
        <div class="container">

        <div class="row">
            <div class="col-12 col-md-9">
                <div class="detail-content">
                    <h2>{{item.title}}</h2>
                    <div class="addthis_native_toolbox"></div>
                    <div class="created-date">
                        {{item.createdAt | moment("DD/MM/YYYY")}} | {{item.hits}} lượt xem  <a class="saveItem" href="" @click.prevent="save" >Lưu bài viết</a>
                    </div>
                    <div class="description-news" v-html="item.description">

                    </div>
                </div>
                <div class="addthis_native_toolbox"></div>
                <div v-if="item.state == -1 && userDetail && userDetail.level == 2">
                  <b-button variant="success" @click="approve">Phê duyệt bài viết</b-button>
                </div>

                <div v-if="userDetail && userDetail.level == 2">
                  <b-button variant="info" @click="$router.push({path: `/news/edit/${item.id}`})">Chỉnh sửa bài viết</b-button>
                </div>

                <!-- <div class="fb-comments" data-href="https://developers.facebook.com/docs/plugins/comments#configurator" data-width="" data-numposts="5"></div> -->
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
                              </b>
                              {{comment.text}}
                            </div>
                            <div class="reply"><a href="#" :class="comment.like? 'liked' : ''" @click.prevent="saveCM(comment.id, index)">Thích</a> <a href="#comment-box" @click=" setParent(comment), commentText = '@'+comment.lastName+' '">Thảo luận</a></div>


                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="input-group" id="comment-box" v-if="userDetail">
                    <input type="text" class="form-control" v-model="commentText" placeholder="Hãy cho mọi người biết suy nghĩ của bạn về bài viết này" >
                    <div class="input-group-append">
                      <div class="input-group-text" @click="sendComment"><i class="fa fa-reply-all" aria-hidden="true"></i></div>
                    </div>
                  </div>
                  <div class="alert alert-warning" v-else>
                  Vui lòng <nuxt-link to="/login">đăng nhập</nuxt-link> để gửi bình luận
                </div>

              </div>
            </div>
            <div class="col-12 col-md-3">
                <div class="side-bar-right">
                    <div class="author">
                        <h3 class="text-center">Tác giả</h3>
                        <b-media>
                        <img slot="aside" :src="author.avatar" alt="Media Aside">

                        <p><b>{{author.lastName}}</b> <br>Hiện có {{author && author.news && author.news.length}} bài</p>

                        <!-- b-[Optional: add media children here for nesting] -->
                    </b-media>
                    </div>
                    <div class="latest">
                        <h3 class="text-center">Mới nhất</h3>
                        <ul>
                            <li v-for="(item, index) in items" :key="index">
                                <nuxt-link :to="`/news/detail/${item.slug}`">{{item.title}}</nuxt-link>
                            </li>

                            </ul>
                    </div>
                    <div class="youtube">
                        <iframe width="560" height="215" src="https://www.youtube.com/embed/kxQTySnMGUI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import AddThis from 'vue-simple-addthis-share'
import Slider from '~/components/Slider'
export default {

  components: {
    AddThis, Slider
  },
  data () {
    return {
      commentParent: 0,
      commentText: '',
      publicId: {
        type: String,
        required: true
      },
      cdn: {
        type: String,
        default: '//s7.addthis.com/js/300/addthis_widget.js'
      },
      item: {
          title: '',
          description: '',
          createdBy: '',
          createdAt: '',
          hits: 1
      },
      author: {},
      items: [],
      comments: []
    }
  },
  mounted () {
    this.getDetail()
    this.getItems()

    // (function(d, s, id) {
    //       var js, fjs = d.getElementsByTagName(s)[0];
    //       if (d.getElementById(id)) return;
    //       js = d.createElement(s); js.id = id;
    //       js.src = `https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v3.2&appId=600848023607130&autoLogAppEvents=1`;
    //       fjs.parentNode.insertBefore(js, fjs);
    //     }(document, 'script', 'facebook-jssdk'));
    if (process.browser) {
        if (document.getElementById('addthis-share') !== null) {
          return window.addthis.layers.refresh();
        }

        const el = document.createElement('script');
        el.setAttribute('id', 'addthis-share')
        el.setAttribute('src', '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-51c907fe054c4829')
        document.body.appendChild(el);

        const el2 = document.createElement('script');
        el2.setAttribute('id', 'facebook-comment')
        el2.setAttribute('src', 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v3.3&appId=2103468729977241&autoLogAppEvents=1')
        document.body.appendChild(el2);
      }

  },
  methods: {
    setParent (comment) {
      if (comment.parent) {
        this.commentParent = comment.parent
      } else {
        this.commentParent = comment.id
      }
    },
    sendComment () {
      this.$axios.post('/api/comments', {
        type: 2,
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

    getComments () {
      let userId = this.userDetail ? this.userDetail.id : 0
      this.$axios.get(`/api/news/comment/${this.item.id}?userId=${userId}`)
        .then(res => {
          console.log('comments',res)
          this.comments = res.data.result
        })
        .catch(err => console.log(err.response))
    },
    save () {

      this.$axios.post('/api/saved', {
        type: 2,
        itemId: this.item.id
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
        } else{
          // dislike
          title = 'Thành công'
          text = 'Bạn đã hủy lưu bài viết'
          variant = 'warning'
        }
        this.toast(title, text, variant)
      })
      .catch(err=> console.log(err.response))
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
      getDetail () {
      this.$axios.get(`/api/news/${this.$route.params.slug}`)
        .then(res => {
          console.log('item', res)
          this.item = res.data
          this.getUserDetail()
          this.getComments()
        })
        .catch(err => console.log(err))
    },
    getUserDetail () {
        this.$axios.get(`/api/user/stat/news/${this.item.createdBy}`)
        .then(res => {
            console.log(res)
            this.author = res.data
        })
        .catch(err => console.log(err.response))
    },
    getItems () {
            this.$axios.get(`/api/news?currentPage=1&perPage=5`)
                .then(res => {
                    console.log(res)
                    this.items = res.data.result

                })
                .catch(err => console.log(err))
        },
    approve () {
      this.$axios.put(`/api/news/${this.item.id}`, {
        state: 1
      }).then(res => {
        console.log(res)
        this.toast('Thông báo', 'Phê duyệt bài viết thành công', 'success')
        this.getDetail()
      })
      .catch(err => console.log(err))
    }
  },
  computed: {
    userDetail () {
      return this.$store.state.user
    }
  },
}
</script>


<style lang="scss">
$pink : #ffa800;
.detail-content {
    padding-top: 20px;
}
.author {
    margin: 20px 0;
    border: 1px solid #ccc;
    .media {
        padding: 0 10px;
    }
    h3 {
        color:#fff;
        background: $pink;

        font-size: 18px;
        // font-weight: normal;
        padding: 5px;
    }
    img {
        width:50px;
        height: 50px;
    }
}
.latest {
    border: 1px solid #ccc;
    margin-bottom: 20px;
    h3 {

        border-bottom: 1px solid #ccc;
        font-size: 18px;
        // font-weight: normal;
        padding: 5px;
    }
}
.youtube {
    iframe {
        max-width: 100%;
    }
}
.saveItem {
  background: $pink;
  color: #ffff;
  padding: 5px 10px;
  float: right;
  &:hover {
    color: #fff;
  }
}
.description-news {
  margin-top: 20px;
}

</style>
