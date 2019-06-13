<template>
  <div class="saved">
    <b-tabs content-class="mt-3">
      <b-tab title="Dự án" active>
        <OtherProperties/>
      </b-tab>
      <b-tab title="Bài viết">
        <News/>
      </b-tab>

    </b-tabs>
  </div>
</template>

<script>
import News from '~/components/News.vue'
import OtherProperties from '~/components/OtherProperties.vue'
export default {
  components: {
    News,
    OtherProperties
  }
}
</script>
