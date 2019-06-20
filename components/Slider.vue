<template>
  <div class="slider container">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide v-for="(image, index) in images" :key="index" :img-src="image.source"></b-carousel-slide>




    </b-carousel>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null,
        images: []
      }
    },
    mounted () {
      this.getItems()
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      },
      getItems() {
        this.$axios.get('/api/media?type=1')
          .then(res => this.images = res.data.result)
          .catch(err => console.log(err.response))
      }
    }
  }
</script>

<style lang="scss">
.slider {
  margin-bottom: 30px;
}
</style>
