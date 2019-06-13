<template>
  <input type="file" class="form-control" placeholder="" ref="file" v-on:change="handleFileUpload()">
</template>

<script>
export default {
  methods: {
    handleFileUpload () {

      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('folder', 'avatar')
      console.log(formData)
      this.$axios.post( '/api/file/upload', formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data',
              'folder': 'avatar',
              'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJodXkiLCJsYXN0TmFtZSI6Ik5ndXllbiIsImVtYWlsIjoiYW5qYWthaHV5QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoic2hhMSRkYWUyNzQwMCQxJDgxYjJlODI2ZTRiOWE0YjFlNGM2MjYwNzZmYmE3Mjc1NGU3ZDYwMjEiLCJkb2IiOiIyMDE5LTEyLTEyIiwiZ2VuZGVyIjoxLCJzdGF0dXMiOjEsInN0YXRlIjowLCJsZXZlbCI6MSwiYXZhdGFyIjoiaW1hZ2UuanBnIiwidG9rZW4iOm51bGwsImNyZWF0ZWRBdCI6IjIwMTktMDYtMTJUMTA6NDk6MzYuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMTktMDYtMTJUMTA6NDk6MzYuMDAwWiJ9LCJpYXQiOjE1NjA0MTA4Mzh9.OY2D8sReKzHsCOzsOf0AiVvZoX2wSxNylby1O1ihUpg'
          }
        }
        ).then(res => {
          console.log(res)

        })
        .catch(err => {

          console.log(err.response)
        })
    },
  }
}
</script>
