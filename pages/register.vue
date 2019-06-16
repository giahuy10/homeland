<template>
    <div class="container">
        <div class="login-page">
            <h1>Đăng ký tài khoản</h1>
            <b-form @submit.prevent="onSubmit">
            <b-form-group id="input-group-1" label="Địa chỉ email:" label-for="input-1">
                <b-form-input
                id="input-1"
                v-model="register.email"
                type="email"
                required
               
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Họ:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="register.firstName"
               
          
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Tên:" label-for="input-2">
                <b-form-input
                id="input-3"
                v-model="register.lastName"
                required
          
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Password:" label-for="input-2">
                <b-form-input
                id="input-4"
                v-model="register.password"
                required
                type="password"
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-5" label="Ngày sinh:" label-for="input-2">
                <b-form-input
                id="input-5"
                v-model="register.dob"
                required
                type="date"
          
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-3" label="Giới tính:" label-for="input-3">
                <b-form-select
                id="input-6"
                v-model="register.gender"
                :options="genders"
                required
                ></b-form-select>
            </b-form-group>
            <b-form-group id="input-group-3" label="Tình trạng hôn nhân:" label-for="input-3">
                <b-form-select
                id="input-7"
                v-model="register.status"
                :options="status"
                required
                ></b-form-select>
            </b-form-group>
            <b-form-group id="input-group-3" label="Avatar:" label-for="input-3">
                <input type="file" class="form-control" placeholder="" ref="thumbnail" v-on:change="handleThumbnailUpload()" >
                <b-spinner v-if="thumbnailLoading" label="Loading..."></b-spinner>
                <div v-if="register.avatar">
                    <img :src="register.avatar" class="avatar" alt="">
                </div>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
         
            </b-form>
        </div>
    </div>
</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    mounted () {
        if( localStorage.getItem('googleUserData')) {
            let googleUserData = JSON.parse(localStorage.getItem('googleUserData'))
            console.log(googleUserData)
            this.register.lastName = googleUserData.displayName
            this.register.email = googleUserData.email
            this.register.avatar = googleUserData.photoURL
        }
        if( localStorage.getItem('facebookUserData')) {
            let facebookUserData = JSON.parse(localStorage.getItem('facebookUserData'))
            console.log(facebookUserData)
            this.register.lastName = facebookUserData.displayName
            this.register.email = facebookUserData.email
            this.register.avatar = facebookUserData.photoURL
        }
    },
    data () {
        return {
            thumbnailLoading: false,
            register: {
                firstName: '',
                lastName:'',
                password: '',
                email: '',
                dob: '',
                gender: '',
                status: '',
                avatar: '',
                gender: 1
            },
            status: [
                { text: 'Chưa kết hôn', value: 1 },
                { text: 'Sắp kết hôn', value: 2 },
                { text: 'Đã kết hôn', value: 3 }
            ],
            genders: [
                { text: 'Nam', value: 1 },
                { text: 'Nữ', value: 2 }
            ]
        }
    },
    methods: {
        onSubmit () {
            this.$axios.post('/api/user', this.register)
                .then(res => {
                    console.log(res)
                    const auth = {
                        accessToken: res.data.token
                    }
                    this.$store.commit('setAuth', auth) // mutating to store for client rendering
                    Cookie.set('auth', auth) // saving token in cookie for server rendering
                    this.$store.commit('setUser', res.data.user) // mutating to store for client rendering
                    Cookie.set('user', res.data.user) // saving token in cookie for server rendering
                    this.$router.push('/account')
                })
                .catch(err => console.log(err))
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
                'folder': 'avatar'
            }
            }
            ).then(res => {
                console.log(res)
                this.thumbnailLoading = false
                this.item.avatar = res.data.avatar
            })
            .catch(err => {
                console.log(err.response)
            })
        }
    }
}
</script>

<style lang="scss">
.avatar {
    width:60px;
    height: 60px;
    
}
</style>
