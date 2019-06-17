<template>
  <div class="layout">
    <div class="header">
      <div class="container">
        <div class="banner">
          <img src="/images/foody-1170x60-gdn2-636854719078673787.jpg" alt="" style="width: 100%">
        </div>
        <div class="navigation">
          <b-navbar toggleable="lg" type="light" variant="light">
            <b-navbar-brand to="/"><img style="height: 50px;" src="/images/homenland-logo.png"></b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav class="ml-auto">
                <b-nav-item to="/property">Dự án và tiến độ</b-nav-item>
                <b-nav-item to="/comment">Bình luận</b-nav-item>
                <b-nav-item to="/news/camera">Camera nhà đất</b-nav-item>
                <b-button variant="brown" @click="$router.push({path: '/comment'})" style="margin-right: 10px; margin-left: 100px;"> <i class="fa fa-comment"></i> Viết bình luận</b-button>

                <b-button v-if="!$store.state.auth" variant="orange" @click="$router.push({path: '/login'})"> <i class="fa fa-user"></i> Đăng nhập</b-button>


                <b-nav-item-dropdown v-else right>
                  <!-- Using 'button-content' slot -->
                  <template slot="button-content">
                    <img :src="userDetail ? userDetail.avatar : ''" alt="" class="menu-avatar">
                    <em>{{userDetail ? userDetail.lastName : ''}}</em>
                  </template>
                  <b-dropdown-item to="/account"><i class="fa fa-plus-square" aria-hidden="true"></i> Hoạt động</b-dropdown-item>
                  <b-dropdown-item to="/account/saved"><i class="fa fa-heart" aria-hidden="true"></i> Lưu trữ</b-dropdown-item>
                  <b-dropdown-item to="/account/update"><i class="fa fa-plus-square" aria-hidden="true"></i> Thông tin cá nhân</b-dropdown-item>
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
                <a>Viết bình luận</a>
              </li>
              <li>
                <a>Thêm dự án</a>
              </li>
              <li>
                <a>Trợ giúp và câu hỏi thường gặp</a>
              </li>
              <li>
                <a>Quy định</a>
              </li>
            </ul>
          </div>
          <div class="col-xs-12 col-md-4">
            <h3>Công ty</h3>
            <ul>
              <li>
                <a>Giới thiệu</a>
              </li>
              <li>
                <a>Quy chế hoạt động</a>
              </li>
              <li>
                <a>Bảo mật thông tin</a>
              </li>
              <li>
                <a>Góp ý</a>
              </li>
            </ul>
          </div>
          <div class="col-xs-12 col-md-4">

            <h3>Liên hệ</h3>
            <ul>
              <li>
                <a>Facebook</a>
              </li>
              <li>
                <a>Youtube</a>
              </li>
              <li>
                <a>Email: info@homenland.vn</a>
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

    }
  },
  computed: {
    userDetail () {
      return this.$store.state.user
    }
  },
  methods: {
    logOut() {
      Cookie.remove('auth')
      this.$store.commit('setAuth', null)
      this.$router.push({path: '/'})
      localStorage.clear()
    }
  }
}
</script>

<style lang="scss">
$pink : #e7005a;
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
}

</style>
