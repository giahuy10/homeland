<template>
    <div class="edit-news">
        <div class="container">
            <b-form @submit.prevent="onSubmit">
            <b-form-group id="input-group-2" label="Tiêu đề:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="item.title"
                required
                placeholder="Enter name"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Chuyên mục:" label-for="input-3">
                <b-form-select
                id="input-3"
                v-model="item.category"
                :options="categories"
                required
                ></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-2" label="Nội dung" label-for="input-2">
          <editor v-model="item.description" :toolbar="toolbar" api-key="lxzv6h8kur0syil9hllrjlm94wtumcz3fy6ea2jc0inlsmnb" :init="init"></editor>
        </b-form-group>

         <b-form-group id="input-group-1" label="Ảnh đại diện:" label-for="input-1">
          <input type="file" class="form-control" placeholder="" ref="thumbnail" v-on:change="handleThumbnailUpload()" >
          <b-spinner v-if="thumbnailLoading" label="Loading..."></b-spinner>
          <img class="thumbnail" v-if="item.thumbnail" :src="item.thumbnail" alt="">
        </b-form-group>

            <b-spinner v-if="saveLoading" label="Loading..."></b-spinner>
            <b-button v-else type="submit" variant="primary">
                {{item.id ? 'Cập nhật nội dung' : 'Tạo nội dung'}}
            </b-button>
           
            </b-form>
        </div>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
export default {
    mounted () {
        this.getDetail()
    },
    components: {
    'editor': Editor
    },
    data () {
        return {
            categories: [
        { value: 'camera', text: 'Camera nhà đất'},
        { value: 'event', text: 'Sự kiện xung quanh'},
        { value: 'blog', text: 'Blog nhà nhất'},
       
      ],
      saveLoading: false,
            thumbnailLoading: false,
            item: {
                title: '',
                category: 'blog',
                description: '',
                thumbnail: ''
            },
            init: {
        plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help',
        images_upload_url: '/api/events/upload?editor=true',

      },
      toolbar: 'formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter | link image media pageembed | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment'
        }
    },
    methods: {
        getDetail () {
            this.$axios.get(`/api/news/${this.$route.params.id}`)
        .then(res => {
          console.log(res)
          this.item = res.data
         
        })
        .catch(err => console.log(err.response))
        },
        onSubmit () {
            this.saveLoading = true
            
            if (this.item.id) {
                this.$axios.put(`/api/news/${this.item.id}`, this.item)
                .then(res => {
                console.log(res)
                this.saveLoading = false
                })
                .catch(err => {
                console.log(err.response)
                })
            } else {
                this.$axios.post('/api/news', this.item)
                .then(res => {
                console.log(res)
                this.saveLoading = false
                this.$router.push({path: `/news/edit/${res.data.id}`})
                })
                .catch(err => {
                console.log(err.response)
                })
            }
        },
        handleThumbnailUpload () {
        this.thumbnailLoading = true
        let file = this.$refs.thumbnail.files[0];
        let formData = new FormData();
        formData.append('file', file);
     
        this.$axios.post( '/api/file/upload', formData,
            {
            headers: {
                'Content-Type': 'multipart/form-data',
                'folder': 'news'
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