<template>
  <div class="layout">
    <div class="header">
      <div class="container">
        <div class="banner">
          <img :src="image && image.source" alt="" style="width: 100%">
        </div>
        <div class="navigation">
          <b-navbar toggleable="lg" type="light" variant="light">
            <b-navbar-brand to="/"><img src="/logo-new.jpg"></b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav class="ml-auto">
                <b-nav-item to="/property">Dự án và tiến độ</b-nav-item>
                <b-nav-item to="/comment">Bình luận</b-nav-item>
                <b-nav-item to="/news/camera">Camera nhà đất</b-nav-item>
                <b-button variant="brown" @click="$router.push({path: '/comment'})" style="margin-right: 10px; margin-left: 100px;"> <i class="fa fa-comment"></i> Viết bình luận</b-button>

                <b-button v-if="!$store.state.auth" variant="info" @click="$router.push({path: '/login'})"> <i class="fa fa-user"></i> Đăng nhập</b-button>


                <b-nav-item-dropdown v-else right>
                  <!-- Using 'button-content' slot -->
                  <template slot="button-content">
                    <img :src="userDetail ? userDetail.avatar : '/images/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg'" alt="" class="menu-avatar">
                    <em>{{userDetail ? userDetail.lastName : ''}}</em>
                  </template>
                  <b-dropdown-item to="/property/edit/0"><i class="fa fa-file" aria-hidden="true"></i> Tạo dự án</b-dropdown-item>
                  <b-dropdown-item to="/news/edit/0"><i class="fa fa-file" aria-hidden="true"></i> Gui bai viet</b-dropdown-item>
                  <b-dropdown-item to="/account"><i class="fa fa-plus-square" aria-hidden="true"></i> Hoạt động</b-dropdown-item>
                  <b-dropdown-item to="/account/saved"><i class="fa fa-heart" aria-hidden="true"></i> Lưu trữ</b-dropdown-item>
                  <b-dropdown-item to="/account/update"><i class="fa fa-user" aria-hidden="true"></i> Thông tin cá nhân</b-dropdown-item>
                  <template v-if="userDetail && userDetail.level == 2">
                    <b-dropdown-item to="/account/verifypro"><i class="fa fa-check" aria-hidden="true"></i> Phê duyệt dự án</b-dropdown-item>
                    <b-dropdown-item to="/account/verifynews"><i class="fa fa-check" aria-hidden="true"></i> Phê duyệt tin tức</b-dropdown-item>
                    <b-dropdown-item to="/account/banner"><i class="fa fa-image" aria-hidden="true"></i> Quản lý banner</b-dropdown-item>
                  </template>
                  
                  <b-dropdown-item href="#" @click.prevent="logOut"><i class="fa fa-sign-out" aria-hidden="true"></i> Đăng xuất</b-dropdown-item>
                </b-nav-item-dropdown>

              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="content">
      <nuxt />
    </div>
    <div class="footer">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-4">
            <h3>Hoạt động</h3>
            <ul>
              <li>

                <nuxt-link to="/comment">Viết bình luận</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/property/edit/0">Thêm dự án</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/news/detail/Tro-giup-va-cau-hoi-thuong-gap">Trợ giúp và câu hỏi thường gặp</nuxt-link>

              </li>
              <li>
                <nuxt-link to="/news/detail/Quy-dinh-su-dung">Quy định</nuxt-link>

              </li>
            </ul>
          </div>
          <div class="col-xs-12 col-md-4">
            <h3>Công ty</h3>
            <ul>
              <li>
                <nuxt-link to="/news/detail/Gioi-thieu-ve-Homenlandvn">Giới thiệu</nuxt-link>

              </li>
              <li>

                <nuxt-link to="/news/detail/Quy-che-hoat-dong">Quy chế hoạt động</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/news/detail/Bao-mat-thong-tin">Bảo mật thông tin</nuxt-link>

              </li>
              <li>
                <nuxt-link to="/news/detail/Gop-y-xay-dung-website">Góp ý</nuxt-link>

              </li>
            </ul>
          </div>
          <div class="col-xs-12 col-md-4">

            <h3>Liên hệ</h3>
            <ul>
              <li>
                <a href=" https://www.facebook.com/Homenland.vn/" target="_blank">Facebook</a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCxWd4GzCvjeOiOIt-LH-9_Q?view_as=subscriber" target="_blank" >Youtube</a>
              </li>
              <li>
                <a href="https://www.instagram.com/homenland.vn/" target="_blank">Instagram</a>
              </li>
              <li>
                <a href="mailto:info@homenland.vn">Email: info@homenland.vn</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  data() {
    return {
      image: {}
    }
  },
  computed: {
    userDetail () {
      return this.$store.state.user
    }
  },
  mounted () {
    this.getItems()
  },
  methods: {
    logOut() {
      Cookie.remove('auth')
      Cookie.remove('user')
      this.$store.commit('setAuth', null)
      this.$store.commit('setUser', null)
      this.$router.push({path: '/'})
      localStorage.clear()
    },
    getItems() {
        this.$axios.get('/api/media?type=2&perPage=1&currentPage=1')
          .then(res => this.image = res.data.result[0])
          .catch(err => console.log(err.response))
      }
  }
}
</script>

<style lang="scss">
$pink : #e7005a;
.navbar-nav {
  .btn-brown {
    @media screen and (max-width: 767px) {
      margin: 5px 0 !important;
    }
  }
}
nav.navbar {
  @media screen and (max-width: 767px) {
    padding-top: 0;
    padding-bottom: 0;
  }
}
a.navbar-brand {
    position: absolute;
    top: -10px; 
    left: 0;
    padding: 0;
    width: 118px;
    z-index: 9999;
    border: 1px solid #f7a600;
    box-shadow: 0 0 1px 0px #fee8c4;
    @media screen and (max-width: 767px) {
      width: 87px;
      position: initial;
    }
}
.navigation {
  .menu-avatar {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }
  .logo {
    width: 20%;
  }
  ul.navbar-nav {
    li {
      a.nav-link {
        display: block;
        padding: 10px;
        color: #824915;
        font-size: 20px;
        text-decoration: none;
      }
    }

  }
  .search {
    width: 25%;
    input {
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      box-shadow: none;
      box-sizing: border-box;
    }
  }
}
.footer {
  padding: 40px 0;
  margin-top: 40px;
  background: #98693e;
  color: white;
  font-size: 14px;
  h3 {
    margin-bottom: 20px;
    font-size: 20px;
  }
  .subscribe {
    text-align:right;
    input {
      padding: 10px;
      border-radius: 5px;
      width: 100%;
      box-sizing: border-box;
    }
    button {
      background: $pink;
      color: #fff;
      padding: 10px 20px;
      border: 0;
      margin-top: 10px;
    }
  }
  a {
    color:#fff;
    font-size: 17px;
  }
}

</style>
