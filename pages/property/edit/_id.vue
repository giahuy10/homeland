<template>
  <div class="edit-property">
    <div class="container">
      <h3>Thêm dự án</h3>
      <p>Những dự án tốt mà bạn biết chưa có trên homenland.vn, chia sẻ với cộng đồng ngay!</p>
      <b-form @submit.prevent="onSubmit">
        <div class="row">
          <div class="col-12 col-md-6">
            <b-form-group id="input-group-1" label="" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="item.title"
                type="text"
                required
                placeholder="Nhập tên dự án"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-12 col-md-6">
            <b-form-group id="input-group-1" label="" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="item.owner"
                type="text"
                required
                placeholder="Chủ đầu tư:"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-3">
            <b-form-group id="input-group-2" label="" label-for="input-2">
              <b-form-select v-model="item.city" @change="getDistricts">
                <option value="">Chọn thành phố</option>
                <option v-for="(city, index) in cities" :key="index" :value="city.id"> {{city.name}}</option>
              </b-form-select>
            </b-form-group>
          </div>
          <div class="col-12 col-md-3">
            <b-form-group id="input-group-2" label="" label-for="input-2">
              <b-form-select v-model="item.district">
                <option value="">Chọn quận/huyện</option>
                <option v-for="(district, index) in districts" :key="index" :value="district.id"> {{district.name}}</option>
              </b-form-select>
            </b-form-group>

          </div>
          <div class="col-12 col-md-6">
            <b-form-group id="input-group-2" label="" label-for="input-2">
              <b-form-input
                id="input-2"
                type="text"
                v-model="item.location"
                required
                placeholder="Địa chỉ chi tiết"
              ></b-form-input>
            </b-form-group>
          </div>

        </div>
        <div class="row">
          <div class="col-12 col-md-6">
            <b-form-group id="input-group-2" label="" label-for="input-2">
              <b-form-select v-model="item.type">
                <option v-for="(type, index) in types" :key="index" :value="type.value"> {{type.text}}</option>
              </b-form-select>
            </b-form-group>
          </div>
          <div class="col-12 col-md-6">
            <b-form-group id="input-group-2" label="" label-for="input-2">
              <b-form-select v-model="item.price">
                <option v-for="(price, index) in optionsPrice" :key="index" :value="price.value"> {{price.text}}</option>
              </b-form-select>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-6">
            <b-form-group id="input-group-2" label="Tổng quan" label-for="input-2">
              <b-form-textarea v-if="user.level == 1" v-model="item.overview" rows="3" placeholder="Vd: Diện tích đất dự án, diện tích xây dựng, mật độ xây dựng, vi trị đẹp ngay khu vực trung tậm thành phố,...."></b-form-textarea>
              <editor v-model="item.overview" v-else :toolbar="toolbar" api-key="lxzv6h8kur0syil9hllrjlm94wtumcz3fy6ea2jc0inlsmnb" :init="init"></editor>
            </b-form-group>
          </div>
          <div class="col-12 col-md-6">
            <b-form-group id="input-group-2" label="Sản phẩm" label-for="input-2">
              <b-form-textarea v-if="user.level == 1" v-model="item.product" rows="3" placeholder="Vd: Mô tả chi tiết
Vd: 2 tòa căn hộ ( 450 căn hộ ), 100 căn biệt thự, 1 tòa văn phòng (từ tầng 6 – tầng 25 và trung tâm thương mại (5 tầng khối đế)….."></b-form-textarea>
              <editor v-model="item.product" v-else :toolbar="toolbar" api-key="lxzv6h8kur0syil9hllrjlm94wtumcz3fy6ea2jc0inlsmnb" :init="init"></editor>
            </b-form-group>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-6">
            <b-form-group id="input-group-2" label="Tiện ích" label-for="input-2">
              <b-form-textarea v-if="user.level == 1" v-model="item.facilities" rows="3"></b-form-textarea>
              <editor v-model="item.facilities" v-else :toolbar="toolbar" api-key="lxzv6h8kur0syil9hllrjlm94wtumcz3fy6ea2jc0inlsmnb" :init="init"></editor>
            </b-form-group>
          </div>
          <div class="col-12 col-md-6">
            <b-form-group id="input-group-2" label="Bàn giao" label-for="input-2">
              <b-form-textarea v-if="user.level == 1" v-model="item.handover" rows="3" placeholder="Vd: Bàn giao thô, nội thất cơ bản, đầy đủ nội thất...."></b-form-textarea>
              <editor v-model="item.handover" v-else :toolbar="toolbar" api-key="lxzv6h8kur0syil9hllrjlm94wtumcz3fy6ea2jc0inlsmnb" :init="init"></editor>
            </b-form-group>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-6">
            <b-form-group id="input-group-2" label="Tiến độ" label-for="input-2">
              <b-form-textarea v-if="user.level == 1" v-model="item.progress" rows="3" placeholder="Vd: ngày khởi công, dự kiến hoàn thành, đang xây tới tầng 16...."></b-form-textarea>
              <editor v-model="item.progress" v-else :toolbar="toolbar" api-key="lxzv6h8kur0syil9hllrjlm94wtumcz3fy6ea2jc0inlsmnb" :init="init"></editor>
            </b-form-group>
          </div>
          <div class="col-12 col-md-6">
            <b-form-group id="input-group-1" label="Link google map:" label-for="input-1">
              <b-form-textarea id="textarea" v-model="item.map" rows="3"></b-form-textarea>
            </b-form-group>
          </div>

        </div>

        <div class="row">
          <div class="col-12 col-md-4">
            <b-form-group id="input-group-1" label="Ảnh phối cảnh:" label-for="input-1">
              <input type="file" class="form-control" placeholder="" ref="thumbnail" v-on:change="handleThumbnailUpload()" >
              <b-spinner v-if="thumbnailLoading" label="Loading..."></b-spinner>
              <img class="thumbnail" v-if="item.thumbnail" :src="item.thumbnail" alt="">
            </b-form-group>
          </div>
          <div class="col-12 col-md-4">
            <b-form-group id="input-group-1" label="Ảnh dự án chi tiết:" label-for="input-1">
              <input type="file" class="form-control" placeholder="" ref="file" v-on:change="handleFileUpload(1)" :disabled="item.images && item.images.length >=5">
              <b-spinner v-if="imageLoading" label="Loading..."></b-spinner>
            </b-form-group>
            <div class="images" v-if="item.images && item.images.length > 0">
              <div class="img" v-for="(image, index) in item.images.filter(item => item.type == 1)" :key="index">
                <div class="inner-img">
                  <img :src="image.thumbnail" alt="">
                  <i class="fa fa-trash" @click="removeImage(image, index, 1)"></i>
                </div>

              </div>
              <div class="clearfix"></div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <b-form-group id="input-group-1" label="Ảnh tiến độ:" label-for="input-1">
              <input type="file" class="form-control" placeholder="" ref="file2" v-on:change="handleFileUpload(2)" :disabled="item.images2 && item.images2.length >=5">
              <b-spinner v-if="imageLoading2" label="Loading..."></b-spinner>
            </b-form-group>

            <div class="images" v-if="item.images && item.images.length > 0">
              <div class="img" v-for="(image, index) in item.images.filter(item => item.type == 2)" :key="index">
                <div class="inner-img">
                  <img :src="image.thumbnail" alt="">
                  <i class="fa fa-trash" @click="removeImage(image, index, 2)"></i>
                </div>

              </div>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-6">
            <b-form-group label="" v-if="user.level == 2">
              <b-form-radio-group
                id="btn-radios-1"
                v-model="item.state"
                :options="stateOptions"
                buttons
                name="radios-btn-default"
                button-variant="outline-primary"
              ></b-form-radio-group>
            </b-form-group>
          </div>
          <div class="col-12 col-md-6">
            <b-spinner v-if="saveLoading" label="Loading..."></b-spinner>

            <b-button v-else type="submit" variant="primary">
                {{item.id ? 'Cập nhật dự án' : 'Tạo dự án'}}
            </b-button>
          </div>
        </div>

      </b-form>
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import location from '~/static/local.json'
export default {
  middleware: ['authenticated'],
  components: {
    'editor': Editor
  },
  mounted () {

    if (this.$route.params.id > 0) {
      this.getDetail()
    }
    this.user = this.$store.state.user

  },
  data () {
    return {
      user: {},
      saveLoading: false,
      imageLoading: false,
      imageLoading2: false,
      thumbnailLoading: false,
      item: {
        title: '',
        location: '',
        city: '',
        district: '',
        type: '',
        owner: '',
        price: '',
        progress: '',
        overview: '',
        product: '',
        facilities: '',
        map: '',
        state: 0,
        thumbnail: '',
        images: [],
        images2: [],
        state: -1,
        hits: 0,
        saved: 0,
        totalComments: 0,
        totalWidth: 0,
        totalWidth2: 0,
        totalImages: 0,
        totalImages2: 0
      },
      cities: location,
      districts: [],
      types: [
        { value: '', text: '-- Chọn loại bất động sản --'},
        { value: 1, text: 'Căn hộ'},
        { value: 2, text: 'Biệt thự/ liền kề/ shophouse (nhà đất)'},
        { value: 3, text: 'Căn hộ - Nhà đất'},
        { value: 4, text: 'Tổ hơp thương mại – căn hộ - nhà đất'},
        { value: 5, text: 'Khu đô thị'},
      ],
      stateOptions: [
        { text: 'Publish', value: 1 },
        { text: 'Draft', value: -1 }
      ],
      optionsPrice: [
        { value: '', text: '-- Chọn khoảng giá --'},
        { value: 1, text: '600tr - 1 tỷ'},
        { value: 2, text: '1 tỷ - 3 tỷ'},
        { value: 3, text: '3 tỷ - 5 tỷ'},
        { value: 4, text: '5 tỷ - 7 tỷ'},
        { value: 5, text: '7 tỷ - 10 tỷ'},
        { value: 6, text: '10 tỷ - 20 tỷ'},
        { value: 7, text: '20 tỷ - 30 tỷ'},
        { value: 8, text: 'Trên 30 tỷ'},
      ],
      init: {
        plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help',
        images_upload_url: '/api/events/upload?editor=true',

      },
      toolbar: 'formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter | link image media pageembed | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment'
    }
  },
  methods: {
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
    getDetail () {
      this.$axios.get(`/api/property/${this.$route.params.id}`)
        .then(res => {
          console.log(res)
          this.item = res.data
          this.getDistricts()
        })
        .catch(err => console.log(err.response))
    },
    onSubmit () {
      console.log(this.item)
      this.saveLoading = true
      if (this.item.id) {
        this.$axios.put(`/api/property/${this.item.id}`, this.item)
        .then(res => {
          console.log(res)
          this.toast('Thông báo', 'Cập nhật dự án thành công', 'success')
          this.saveLoading = false
        })
        .catch(err => {
          console.log(err.response)
        })
      } else {
        this.$axios.post('/api/property', this.item)
        .then(res => {
          console.log(res)
          this.saveLoading = false
          if (this.user.level == 1) {
            this.toast('Thông báo', 'Tạo dự án thành công. Dự án sẽ được admin kiểm duyệt trong 48 giờ.', 'success')
          } else {
            this.toast('Thông báo', 'Tạo dự thành công', 'success')
          }
          setTimeout(() => { // we simulate the async request with timeout.
            this.$router.push({path: `/property/edit/${res.data.id}`})
          }, 4000)
        })
        .catch(err => {
          this.saveLoading = false
          console.log(err.response)
        })
      }


    },
    getDistricts () {
      this.districts = location[this.item.city - 1].districts
    },
    removeImage (image, index, type) {
      console.log('image', image)
      for (var i = 0; i < this.item.images.length; i++) {
          var obj = this.item.images[i];
          if (obj.thumbnail == image.thumbnail && obj.type == image.type) {
            this.item.images.splice(i, 1)
          }
      }
      if (type == 1) {
        this.item.totalImages--
        this.item.totalWidth -= image.width
      } else {
        this.item.totalImages2--
        this.item.totalWidth2 -= image.width
      }

    },
    handleFileUpload (type) {
      let file = ''
      if (type == 1) {
        this.imageLoading = true
         file = this.$refs.file.files[0];
      } else {
        this.imageLoading2 = true
         file = this.$refs.file2.files[0];
      }


      let formData = new FormData();
      formData.append('file', file);
      this.$axios.post( '/api/file/upload', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'folder': 'properties'
          }
        }
        ).then(res => {
          console.log(res)

          if (type == 1) {
             this.imageLoading = false
             this.item.totalWidth += res.data.widthThumb
             this.item.totalImages++

          } else {
             this.imageLoading2 = false
             this.item.totalWidth2 += res.data.widthThumb
             this.item.totalImages2++

          }
          this.item.images.push({
              source: res.data.location,
              thumbnail: res.data.thumbnail,
              height: res.data.heightThumb,
              width: res.data.widthThumb,
              type: type
            })


        })
        .catch(err => {
          console.log(err.response)
        })
    },
    handleThumbnailUpload () {
      this.thumbnailLoading = true
      let file = this.$refs.thumbnail.files[0];
      let formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'poster')
      this.$axios.post( '/api/file/upload', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'folder': 'properties'
          }
        }
        ).then(res => {
          console.log(res)
          this.thumbnailLoading = false
          this.item.thumbnail = res.data.thumbnail
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }
}
</script>

<style lang="scss">
.images {
  .img {

    width: 25%;
    float: left;
    padding: 10px;
    box-sizing: border-box;
    .inner-img {
      border: 1px solid #ccc;
    }
  }
}
</style>
