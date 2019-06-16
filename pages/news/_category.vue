<template>
    <div class="category">
        <div class="container">
            <img src="/images/StockSnap_KWRZNZ6DC6.jpg" alt="">
            <br><br>
            <div class="row">
                <div class="col-12 col-md-3">
                    <ul class="news-menu">
                        <li v-for="(menu, index) in categories" :key="index">
                            <nuxt-link :to="`/news/${menu.slug}`">{{menu.title}}</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/news/edit/0">Gửi bài viết</nuxt-link>
                        </li>
                       
                    </ul>
                </div>
                <div class="col-12 col-md-6">
                    <div class="row">
                    <div class="col-6 col-md-6" v-for="(item, index) in items" :key="index">
                        <div class="inner-news">
                            <div class="row">
                                <div class="col-12 ">
                                    <nuxt-link :to="`/news/detail/${item.slug}`">
                                    <img :src="item.thumbnail" alt="">
                                    </nuxt-link>
                                    <p><nuxt-link :to="`/news/detail/${item.slug}`">{{item.title}}</nuxt-link></p>
                                    <div class="share">
                                    <div class="float-left">
                                        {{item.hits}} <i class="fa fa-eye" aria-hidden="true"></i>
                                    </div>
                                    <div class="float-right save-item">
                                        Lưu <i class="fa fa-heart" aria-hidden="true"></i>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <br><br>
                <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table"
                    ></b-pagination>
                </div>
                <div class="col-12 col-md-3">
                    <div class="module popular">
                    <h4 class="module-title">Xem nhiều</h4>
                    <div class="inner-mod">
                    <div class="mod-content">
                        <ul>
                            <li v-for="(item,index) in populars" :key="index">
                                <nuxt-link :to="`/news/detail/${item.slug}`">{{item.title}}</nuxt-link>
                            </li>
                        
                        </ul>
                    </div>
                    </div>
                </div>
                <div class="module facebook">
                    <h4 class="module-title">Follow us</h4>
                    <div class="inner-mod">
                    <div class="mod-content">
                        <iframe src="/facebook.html" frameborder="0"></iframe>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            currentPage: 1,
            rows: 0,
            perPage: 10,
            items: [],
            populars: [],
            categories: [
                { title: 'Camera nhà đất', slug: 'camera' },
                { title: 'Sự kiện xung quanh', slug: 'event' },
                { title: 'Blog nhà nhất', slug: 'blog' },
            ]
        }
    },
    mounted () {
        this.getItems()
        this.getPopulars()
    },
    methods: {
        getItems () {
            this.$axios.get(`/api/news?category=${this.$route.params.category}&currentPage=${this.currentPage}&perPage=${this.perPage}`)
                .then(res => {
                    console.log(res)
                    this.items = res.data.result
                    this.rows = res.data.count
                })
                .catch(err => console.log(err))
        },
        getPopulars () {
            this.$axios.get(`/api/news?orderBy=hits&perPage=5`)
                .then(res => {
                    console.log(res)
                    this.populars = res.data.result
                })
                .catch(err => console.log(err))
        }
    }

}
</script>

<style lang="scss">
$pink : #ffa800;
.news {
  .news {
    padding-top: 0;
  }
}

.popular, .facebook {
    margin-bottom: 20px;
    border: 1px solid #ccc;
    .module-title {
        text-align: center;
    margin: 0;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    }
  ul {
    list-style: none;
    padding-left: 0px;
    li {
      border-bottom: 1px dotted #ccc;
      padding: 5px 0 5px 10px;
    }
  }
}
.facebook {
    iframe {
        width: 100%;
        height: 400px;
        overflow: hidden;
    }
}
</style>
