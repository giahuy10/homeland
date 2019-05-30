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
              <b-navbar-nav class="mx-auto">
                <b-nav-item to="/property">Dự án và tiến độ</b-nav-item>
                <b-nav-item to="/comment">Bình luận</b-nav-item>
                <b-nav-item to="/news">Camera nhà đất</b-nav-item>
      
              </b-navbar-nav>

              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto">
                <b-button variant="success" style="margin-right: 10px;"> <i class="fa fa-comment"></i> Viết bình luận</b-button> 
                <b-button variant="info"> <i class="fa fa-user"></i> Đăng nhập</b-button>
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
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">
$pink : #e7005a;
.navigation {
  .logo {
    width: 20%;
  }
  .menu {
    width: 55%;
    ul {
      list-style: none;
      text-align: center;
      li {
        display: inline-block;
        a {
          display: block;
          padding: 10px;
          color: $pink;
          font-size: 20px;
          text-decoration: none;
          text-transform: uppercase;
        }
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
  background: #eee;
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
