<template>
  <div class="account">
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Họ "
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          type="text"
          v-model="item.firstName"

        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Tên "
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          type="text"
          v-model="item.lastName"

        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Email:" label-for="input-2">
        <b-form-input
          id="input-3"
          type="email"
          required
          placeholder="Nhập địa chỉ email"
          v-model="item.email"
          readonly
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Giới tính:" label-for="input-4">
        <b-form-select
          id="input-4"
          v-model="item.gender"
          :options="genders"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-5" label="Tình trạng hôn nhân:" label-for="input-5">
        <b-form-select
          id="input-5"
          :options="status"
          v-model="item.status"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-6" label="Ngày sinh:" label-for="input-6">
        <b-form-input
          id="input-6"
          type="date"
          required
          v-model="item.dob"
        ></b-form-input>
      </b-form-group>


      <b-form-group id="input-group-7" label="Mật khẩu:" label-for="input-7">
        <b-form-input
          id="input-7"
          type="password"
          v-model="item.updatePassword"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-8" label="Avatar:" label-for="input-8">
          <input type="file" class="form-control" placeholder="" ref="thumbnail" v-on:change="handleThumbnailUpload()" >
          <b-spinner v-if="thumbnailLoading" label="Loading..."></b-spinner>
          <div v-if="item.avatar">
              <img :src="item.avatar" class="avatar" alt="">
          </div>
      </b-form-group>

      <b-spinner v-if="updateLoading" label="Loading..."></b-spinner>
      <b-button v-else type="submit" variant="primary">Cập nhật</b-button>

    </b-form>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  mounted () {

    this.item = JSON.parse(Cookie.get('user'))
  },
  data () {
    return {
      item: {},
      thumbnailLoading: false,
      updateLoading: false,
      status: [
                { text: 'Chưa kết hôn', value: 1 },
                { text: 'Sắp kết hôn', value: 2 },
                { text: 'Đã kết hôn', value: 3 }
            ],
            genders: [
                { text: 'Nam', value: 1 },
                { text: 'Nữ', value: 2 }
            ],
      file: null,
    }
  },
  methods: {
    handleThumbnailUpload () {
        this.thumbnailLoading = true
        let file = this.$refs.thumbnail.files[0];
        let formData = new FormData();
        formData.append('file', file);
        this.$axios.post( '/api/file/upload', formData,
            {
            headers: {
                'Content-Type': 'multipart/form-data',
                'folder': 'avatar'
            }
            }
            ).then(res => {
                console.log(res)
                this.thumbnailLoading = false
                this.item.avatar = res.data.thumbnail
            })
            .catch(err => {
                console.log(err.response)
            })
        },
    onSubmit () {
      this.updateLoading = true
      this.$axios.put(`/api/user/${this.item.id}`, this.item)
        .then(res => {
          console.log(res)
          this.updateLoading = false
          Cookie.set('user', this.item)
        })
        .catch(err => {
            console.log(err.response)
        })
    }
  }
}
</script>
