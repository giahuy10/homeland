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
                        </div>
                        <div class="col-12 ">
                            <p>Khởi công song hành với tuyến đường cao tốc tphcm</p>
                            <p class="date">21/05/2019 | by Admin</p>

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
    }
}
</style>
