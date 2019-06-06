<template>
    <div class="news">
        <!-- <h3 class="cat-title mod-title">{{title}}</h3> -->
        <div class="row">
            <div class="col-6 col-md-4" v-for="(item, index) in items" :key="index">
                <div class="inner-news">
                    <div class="row">
                        <div class="col-12 ">
                            <nuxt-link to="/news/detail">
                            <img src="/images/news/Rockwell-Partners.jpg" alt="">
                            </nuxt-link>
                            <p><nuxt-link to="/news/detail">Khởi công song hành với tuyến đường cao tốc tphcm</nuxt-link></p>
                            <div class="share">
                              <div class="float-left">
                                200 <i class="fa fa-eye" aria-hidden="true"></i>
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
    </div>
</template>

<script>
export default {
    props: ['title'],
    data () {
        return {
            items: [1, 2, 3, 4, 5, 6,7 , 8, 9,10,11,12]
        }
    }
}
</script>

<style lang="scss">
.news {
    padding-top: 20px;
    .cat-title {
        display: inline-block;
    }
    .inner-news {
        padding-bottom: 30px;
        img {
            margin-bottom: 20px;
        }
        p {
            margin-bottom: 5px;
            &.date {
                font-size: 14px;
                color:#8e8e8e;
            }
        }
        a {

        }
        .share {
          color: #85878a;
          .save-item {
            &:hover {
              cursor: pointer;
            }
          }
        }
    }
}
</style>
