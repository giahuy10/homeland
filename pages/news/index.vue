<template>
    <div class="news container">
      <img src="/images/StockSnap_KWRZNZ6DC6.jpg" alt="">
      <br><br>
      <div class="row">
        <div class="col-3">

          <ul class="news-menu">
            <li><a href="#">Camera nhà đất</a></li>
            <li><a href="#">Sự kiện</a></li>
            <li><a href="#">Blogs nhà đất</a></li>
          </ul>
          <div class="module popular">
            <h4 class="module-title">Xem nhiều</h4>
            <div class="inner-mod">
              <div class="mod-content">
                <ul>
                  <li>
                    <a href="">Khởi công song hành với tuyến đường cao tốc tphcm</a>
                  </li>
                  <li>
                    <a href="">Nghịch lý nhà tái định cư bỏ hoang giữa lòng Thủ đô</a>
                  </li>
                  <li>
                    <a href="">Nghịch lý nhà tái định cư bỏ hoang giữa lòng Thủ đô</a>
                  </li>
                  <li>
                    <a href="">Đất nền Long Thành, cơ hội còn rất lớn</a>
                  </li>
                  <li>
                    <a href="">Đất nền quận 9 vẫn chưa giảm độ "hot"</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="module facebook">
            <h4 class="module-title">Follow us</h4>
            <div class="inner-mod">
              <div class="mod-content">
                <div id="fb-root"></div>
                <div class="fb-page" data-href="https://www.facebook.com/Homenland.vn" data-tabs="timeline" data-width="" data-height="" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/facebook" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/facebook">Facebook</a></blockquote></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-9">
          <News title="Tin tức dự án"/>

        </div>

      </div>

    </div>
</template>
<script>
import News from '~/components/News.vue'
export default {
    components: { News },
    mounted () {
      if (process.browser) {
        const el2 = document.createElement('script');
        el2.setAttribute('id', 'facebook-comment')
        el2.setAttribute('src', 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v3.3&appId=2103468729977241&autoLogAppEvents=1')
        document.body.appendChild(el2);
      }
    }
}
</script>

<style lang="scss">

</style>


