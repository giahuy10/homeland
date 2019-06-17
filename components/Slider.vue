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
      <b-carousel-slide img-src="/images/banner/1.jpg"></b-carousel-slide>
      <b-carousel-slide img-src="/images/banner/2.jpg"></b-carousel-slide>
      <b-carousel-slide img-src="/images/banner/3.jpg"></b-carousel-slide>
      <b-carousel-slide img-src="/images/banner/4.jpg"></b-carousel-slide>
      <b-carousel-slide img-src="/images/banner/5.jpg"></b-carousel-slide>



    </b-carousel>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>

<style lang="scss">
.slider {
  margin-bottom: 30px;
}
</style>
