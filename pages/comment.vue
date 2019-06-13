<template>
  <div class="container">
    <img src="/images/StockSnap_KWRZNZ6DC6.jpg" alt="">
    <div class="call-to-action text-center">
      <h2>Kinh nghiệm và thông tin bạn biết là vô cùng hữu ích, hãy cùng chia sẻ !</h2>
      <b-form-input type="text" style="height: 70px; margin-bottom: 15px;" placeholder="Nhập tên dự án bạn muốn viết bình luận"></b-form-input>
      <p>Nếu bạn không tìm thấy, hãy sử dụng công cụ tìm kiếm thông minh hơn <a href="#" @click.prevent="showModal">tại đây</a></p>
    </div>
    <div class="list-comments row">
      <div class="comment col-6" v-for="(comment, index) in comments" :key="index">
        <div class="inner-comment">
        <b-media>
          <img slot="aside" src="/images/main-thumb-282821662-100-krruoowyyretxlddfvilxlmqdpnczfqg.jpeg" alt="Media Aside">
          <p>
            <b>Huy Nguyễn</b>
            <br> <a href="">Dự án homeland Hà Nội</a>
            <br> <small>18:30 21-05-2019</small>
          </p>
          <!-- b-[Optional: add media children here for nesting] -->
        </b-media>
        <div class="comment-content">
          <p>Curabitur tincidunt erat sapien, eu finibus augue blandit et. Nam tincidunt consectetur massa, non sagittis massa ultricies at. Sed eu lorem dui. Donec magna leo, fringilla ut tellus in, luctus laoreet nibh. Sed ut elementum lectus. Integer facilisis elit nulla, quis ornare sapien cursus eget. Suspendisse sem ligula, feugiat sed vehicula sed, malesuada et est. Donec id egestas tellus. Vivamus tincidunt, enim at luctus ultricies, est justo ultricies odio, eget posuere metus dui fermentum dolor. Donec congue lobortis laoreet. Vestibulum in metus lobortis, semper odio quis, pulvinar magna. Sed quis sapien non nisl mollis blandit.</p>
        </div>
        </div>
      </div>
    </div>
    <b-modal ref="my-modal" hide-footer id="modal-1" title="Tìm kiếm nâng cao">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: [1, 2, 3, 4, 5, 6]
    }
  },
  methods: {
    openSearch () {

    },
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
  }
}
</script>

<style lang="scss">
$pink : #e7005a;
.list-comments {
  .comment {
    .inner-comment {


    padding: 20px 20px 0 20px;
    border: 1px solid #ccc;
    margin-top: 30px;
    border-radius: 5px;
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
</style>
