<template>
  <div class="edit-property">
    <div class="container">
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="input-group-1" label="Tên dự án:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="item.title"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label="Chủ đầu tư:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="item.owner"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Thành phố" label-for="input-2">
          <b-form-select v-model="item.city" @change="getDistricts">
            <option value="">Chọn thành phố</option>
            <option v-for="(city, index) in cities" :key="index" :value="city.id"> {{city.name}}</option>
          </b-form-select>
        </b-form-group>

        <b-form-group id="input-group-2" label="Quận/Huyện" label-for="input-2">
          <b-form-select v-model="item.district">
            <option value="">Chọn quận/huyện</option>
            <option v-for="(district, index) in districts" :key="index" :value="district.id"> {{district.name}}</option>
          </b-form-select>
        </b-form-group>

        <b-form-group id="input-group-2" label="Địa chỉ" label-for="input-2">
          <b-form-input
            id="input-2"
            type="text"
            v-model="item.location"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Loại" label-for="input-2">
          <b-form-select v-model="item.type">
            <option v-for="(type, index) in types" :key="index" :value="type.value"> {{type.text}}</option>
          </b-form-select>
        </b-form-group>

        <b-form-group id="input-group-2" label="Loại" label-for="input-2">
          <b-form-select v-model="item.price">
            <option v-for="(price, index) in optionsPrice" :key="index" :value="price.value"> {{price.text}}</option>
          </b-form-select>
        </b-form-group>

        <b-form-group id="input-group-2" label="Trang chủ" label-for="input-2">
          <editor v-model="item.overview" :toolbar="toolbar" api-key="lxzv6h8kur0syil9hllrjlm94wtumcz3fy6ea2jc0inlsmnb" :init="init"></editor>
        </b-form-group>

        <b-form-group id="input-group-2" label="Sản phẩm" label-for="input-2">
          <editor v-model="item.product" :toolbar="toolbar" api-key="lxzv6h8kur0syil9hllrjlm94wtumcz3fy6ea2jc0inlsmnb" :init="init"></editor>
        </b-form-group>

        <b-form-group id="input-group-2" label="Tiện ích" label-for="input-2">
          <editor v-model="item.facilities" :toolbar="toolbar" api-key="lxzv6h8kur0syil9hllrjlm94wtumcz3fy6ea2jc0inlsmnb" :init="init"></editor>
        </b-form-group>

        <b-form-group id="input-group-2" label="Tiến độ" label-for="input-2">
          <editor v-model="item.progress" :toolbar="toolbar" api-key="lxzv6h8kur0syil9hllrjlm94wtumcz3fy6ea2jc0inlsmnb" :init="init"></editor>
        </b-form-group>

        <b-form-group id="input-group-1" label="Link google map:" label-for="input-1">
          <b-form-textarea
            id="textarea"
            v-model="item.map"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group id="input-group-1" label="Ảnh đại diện:" label-for="input-1">
          <input type="file" class="form-control" placeholder="" ref="thumbnail" v-on:change="handleThumbnailUpload()" >
          <b-spinner v-if="thumbnailLoading" label="Loading..."></b-spinner>
          <img class="thumbnail" v-if="item.thumbnail" :src="item.thumbnail" alt="">
        </b-form-group>

        <b-form-group id="input-group-1" label="Ảnh dự án:" label-for="input-1">
          <input type="file" class="form-control" placeholder="" ref="file" v-on:change="handleFileUpload()" :disabled="item.images && item.images.length >=5">
          <b-spinner v-if="imageLoading" label="Loading..."></b-spinner>
        </b-form-group>

        <div class="images" v-if="item.images && item.images.length > 0">
          <div class="img" v-for="(image, index) in item.images" :key="index">
            <div class="inner-img">
              <img :src="image.thumbnail" alt="">
              <i class="fa fa-trash" @click="removeImage(index)"></i>
            </div>

          </div>
          <div class="clearfix"></div>
        </div>

        <b-spinner v-if="saveLoading" label="Loading..."></b-spinner>

        <b-button v-else type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import location from '~/static/local.json'
export default {
  middleware: ['checkRightProperty'],
  components: {
    'editor': Editor
  },
  mounted () {

    if (this.$route.params.id > 0) {
      this.getDetail()
    }

  },
  data () {
    return {
      saveLoading: false,
      imageLoading: false,
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
        images: []
      },
      cities: location,
      districts: [],
      types: [
        { value: '', text: '-- Chọn loại bất động sản --'},
        { value: 1, text: 'Căn hộ chung cư'},
        { value: 2, text: 'Biệt thự, liền kề'},
        { value: 3, text: 'Shophouse'},
        { value: 4, text: 'Nghỉ dưỡng'},
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
      this.saveLoading = true
      if (this.item.id) {
        this.$axios.put(`/api/property/${this.item.id}`, this.item)
        .then(res => {
          console.log(res)
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
          this.$router.push({path: `/property/edit/${res.data.id}`})
        })
        .catch(err => {
          console.log(err.response)
        })
      }


    },
    getDistricts () {
      this.districts = location[this.item.city - 1].districts
    },
    removeImage (index) {
      this.item.images.splice(index, 1)
    },
    handleFileUpload () {
      this.imageLoading = true
      let file = this.$refs.file.files[0];
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
          this.imageLoading = false
          this.item.images.push({
            source: res.data.location,
            thumbnail: res.data.thumbnail,
            height: res.data.heightThumb,
            width: res.data.widthThumb
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

    width: 20%;
    float: left;
    padding: 10px;
    box-sizing: border-box;
    .inner-img {
      border: 1px solid #ccc;
    }
  }
}
</style>
