<template>
    <div class="news-detail">
        <div class="container">
          <img src="/images/StockSnap_KWRZNZ6DC6.jpg" alt="">
          <br><br>
        <div class="row">
            <div class="col-12 col-md-9">
                <div class="detail-content">
                    <h2>{{item.title}}</h2>
                    <div class="addthis_native_toolbox"></div>
                    <div class="created-date">
                        {{item.createdAt | moment("DD/MM/YYYY")}} | {{item.hits}} lượt xem
                    </div>
                    <div class="description-news" v-html="item.description">

                    </div>
                </div>
                <div class="addthis_native_toolbox"></div>
                <div class="fb-comments" data-href="https://developers.facebook.com/docs/plugins/comments#configurator" data-width="" data-numposts="5"></div>
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

export default {

  components: {
    AddThis,
  },
  data () {
    return {
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
      items: []
    }
  },
  mounted () {
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
    this.getDetail()
    this.getItems()
  },
  methods: {
      getDetail () {
      this.$axios.get(`/api/news/${this.$route.params.slug}`)
        .then(res => {
          console.log(res)
          this.item = res.data
          this.getUserDetail()
        })
        .catch(err => console.log(err.response))
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
  }
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
</style>
