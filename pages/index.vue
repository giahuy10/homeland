<template>
  <div class="homepage">
    <Slider/>
    <OtherProperties/>
    <FeaturedProperties/>

    <TopComments/>
  </div>
</template>

<script>
import Slider from '~/components/Slider.vue'
import FeaturedProperties from '~/components/FeaturedProperties.vue'
import OtherProperties from '~/components/OtherProperties.vue'
import TopComments from '~/components/TopComments.vue'
export default {
  components: {
    Slider,
    FeaturedProperties,
    OtherProperties,
    TopComments
  }
}
</script>
