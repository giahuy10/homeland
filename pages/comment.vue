<template>
  <div class="container">
    <div class="list-comments row">
      <div class="comment col-6" v-for="(comment, index) in comments" :key="index">
        <div class="row">
          <div class="col-2 col-md-1">
            <div class="avatar">
              <img src="/images/main-thumb-282821662-100-krruoowyyretxlddfvilxlmqdpnczfqg.jpeg" alt="">
            </div>
          </div>
          <div class="col-10 col-md-11">
            <p>
              <b>Huy Nguyễn</b>
              <br> <a href="">Dự án homeland Hà Nội</a>
              <br> <small>18:30 21-05-2019</small>
            </p>
          </div>
        </div>
        <div class="comment-content">
          <p>Curabitur tincidunt erat sapien, eu finibus augue blandit et. Nam tincidunt consectetur massa, non sagittis massa ultricies at. Sed eu lorem dui. Donec magna leo, fringilla ut tellus in, luctus laoreet nibh. Sed ut elementum lectus. Integer facilisis elit nulla, quis ornare sapien cursus eget. Suspendisse sem ligula, feugiat sed vehicula sed, malesuada et est. Donec id egestas tellus. Vivamus tincidunt, enim at luctus ultricies, est justo ultricies odio, eget posuere metus dui fermentum dolor. Donec congue lobortis laoreet. Vestibulum in metus lobortis, semper odio quis, pulvinar magna. Sed quis sapien non nisl mollis blandit.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: [1, 2, 3, 4, 5, 6]
    }
  }
}
</script>

<style lang="scss">
.list-comments {
  .comment {
    padding: 20px 20px 0 20px;
    border: 1px solid #ccc;
    margin-top: 20px;
    border-radius: 5px;
  }
}
</style>
