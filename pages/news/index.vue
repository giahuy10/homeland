<template>
    <div class="news container">
      <div class="row">
        <div class="col-2">
          <h3></h3>
          <ul>
            <li>TIn tức (Highlight)</li>
            <li>Sự kiện</li>
            <li> Blogs nhà đất</li>
          </ul>
          Xem nhiều nhất <br>
          Facebook
        </div>
        <div class="col-10">
          <News title="Tin tức dự án"/>
          <News title="Tin tức khác"/>
        </div>

      </div>

    </div>
</template>

<script>
import News from '~/components/News.vue'
export default {
    components: { News }
}
</script>
