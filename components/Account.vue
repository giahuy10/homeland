<template>
  <div class="account">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Họ tên:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          type="text"
          required
          placeholder="Nhập đầy đủ họ và tên"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Email:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="email"
          required
          placeholder="Nhập địa chỉ email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Giới tính:" label-for="input-3">
        <b-form-select
          id="input-3"
          :options="genders"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-3" label="Tình trạng hôn nhân:" label-for="input-3">
        <b-form-select
          id="input-3"
          :options="status"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-2" label="Ngày sinh:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="date"
          required

        ></b-form-input>
      </b-form-group>


      <b-form-group id="input-group-3" label="Mật khẩu:" label-for="input-3">
        <b-form-input
          id="input-2"
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Ảnh đại diện:" label-for="input-3">
        <b-form-file
          v-model="file"
          placeholder="Chọn ảnh..."
          drop-placeholder="Kéo và thả ảnh vào đây..."
        ></b-form-file>
      </b-form-group>

      <b-button type="submit" variant="primary">Lưu</b-button>

    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      genders: ['Nam', 'Nữ'],
      status: ['Đã kết hôn', 'Sắp kết hôn', 'Độc thân'],
      file: null,
    }
  }
}
</script>
