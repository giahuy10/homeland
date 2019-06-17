<template>
  <div class="background">
        <div class="row">
            <div class="col-12 col-md-3">
                <div class="user-detail text-center">
                    <div class="avatar ">
                        <img :src="userDetail.avatar" alt="">
                    </div>
                    <h3>{{userDetail.lastName}}</h3>
                </div>
            </div>
            <div class="col-12 col-md-9">

            </div>
        </div>
     </div>
</template>

<script>
export default {
  computed: {
    userDetail () {
      return this.$store.state.user
    }
  },
}
</script>


<style lang="scss">
.user-detail {
  padding: 40px 0;
      background: rgba(0, 0, 0, 0.5);
    color: #fff;
}
.background {
  background: url('/banner-profile.png');
  background-size: cover;
  margin-bottom: 30px;
}
</style>
