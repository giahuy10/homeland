<template>
  <div class="account">
    <div class="container">
      <User/>
      <div class="row">
        <div class="col-12 col-md-3">
          <AccountMenu/>
        </div>
        <div class="col-12 col-md-9">
          <div class="row">
            <div class="col-12 col-md-7">
              <b-form-group id="input-group-1" label="" label-for="input-1">
                <input type="file" class="form-control" placeholder="" ref="file" v-on:change="handleFileUpload()" >
                <b-spinner v-if="imageLoading" label="Loading..."></b-spinner>
              </b-form-group>
            </div>
            <div class="col-6 col-md-3">
              <b-form-radio-group
                  id="btn-radios-1"
                  v-model="item.type"
                  :options="stateOptions"
                  buttons
                  name="radios-btn-default"
                  button-variant="outline-primary"
                ></b-form-radio-group>

            </div>
            <div class="col-6 col-md-2">

                <b-spinner v-if="saveLoading" label="Loading..."></b-spinner>

              <b-button @click.prevent="saveMedia" v-else variant="primary">
                Lưu hình ảnh
              </b-button>
            </div>
          </div>

          <b-card no-body >
            <h2>Hình ảnh slideshow</h2>
            <table class="table list-thumb">
              <tr v-for="(img, index) in slider" :key="index">
                <td><img class="" :src="img.thumbnail" alt=""></td>
                <td><a href="#" @click.prevent="remove(img)">Xóa</a></td>
              </tr>
            </table>

          </b-card>
          <br><br>
          <b-card no-body class="">
            <h2>Hình ảnh banner</h2>
            <table class="table list-thumb">
              <tr v-for="(img, index) in banner" :key="index">
                <td><img class="" :src="img.thumbnail" alt=""></td>
                <td><a href="#" @click.prevent="remove(img)">Xóa</a></td>
              </tr>
            </table>
          </b-card>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
import User from '~/components/User'
import AccountMenu from '~/components/AccountMenu'
export default {
  middleware: 'authenticated',
  components: {
    AccountMenu,  User
  },
  mounted () {
    this.getSliders()
    this.getBanners()
  },
  data () {
    return {
      imageLoading: false,
      saveLoading: false,
      item: {
        type: 1,
        proId: 1,
        source: '',
        thumbnail: '',
        height: '',
        width: ''
      },
      banner: [],
      slider: [],
      stateOptions: [
        { text: 'Slideshow', value: 1 },
        { text: 'Banner', value: 2 }
      ],
    }
  },
  methods: {
    handleFileUpload (type) {
      this.imageLoading = true
      let file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append('file', file);
      this.$axios.post( '/api/file/upload', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'folder': 'banner'
          }
        }
        ).then(res => {
          console.log(res)
          this.toast('Thông báo', 'Tải hình ảnh thành công. Vui lòng chọn Slideshow hoặc Banner để lưu hình ảnh', 'success')
             this.imageLoading = false
              this.item.source = res.data.location,
              this.item.thumbnail = res.data.thumbnail,
              this.item.height = res.data.heightThumb,
              this.item.width = res.data.widthThumb
          })

        .catch(err => {
          console.log(err.response)
        })
    },
    getBanners() {
      this.$axios.get('/api/media?type=2&perPage=1&currentPage=1')
        .then(res => this.banner = res.data.result)
        .catch(err => console.log(err.response))
    },

    getSliders() {
      this.$axios.get('/api/media?type=1&perPage=100&currentPage=1')
        .then(res => this.slider = res.data.result)
        .catch(err => console.log(err.response))
    },
  remove (img) {
    if (confirm('Bạn chắc chắn muốn xóa hình ảnh này?')) {
    this.$axios.delete(`/api/media/${img.id}`)
      .then(res => {
        if (img.type == 1) {
          this.getSliders()
        } else {
          this.getBanners()
        }
        
        
        this.toast('Thông báo', 'Đã xóa thành công', 'warning')
      })
      .catch(err=> console.log(err.response))
    }
  },
   toast(title, text, variant) {
      console.log('ok')
        this.$bvToast.toast(text, {
          title: title,
          toaster: 'b-toaster-bottom-right',
          solid: true,
          appendToast: true,
          variant: variant
        })
      },
  saveMedia () {
    this.saveLoading = true
    this.$axios.post('/api/media', this.item)
      .then(res => {
        console.log(res)
        this.saveLoading = false
        if (this.item.type == 1) {
          this.getSliders()
          this.toast('Thông báo', 'Lưu slideshow thành công', 'success')
        } else {
          this.getBanners()
          this.toast('Thông báo', 'Lưu banner thành công. Vui lòng tải lại trang để xem banner', 'success')
        }
        
      })
      .catch(err=> console.log(err.response))
  }
  }

}
</script>

<style lang="scss">
.list-thumb {

  img {
    height: 60px;
    width: auto;
  }

}
</style>



