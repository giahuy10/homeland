<template>
  <div class="layout">
    <div class="header">
      <div class="container">
        <div class="banner">
          <img src="/images/foody-1170x60-gdn2-636854719078673787.jpg" alt="" style="width: 100%">
        </div>
        <div class="navigation">
          <b-navbar toggleable="lg" type="light" variant="light">
            <b-navbar-brand href="#">Homeland</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav>
                <b-nav-item href="#">Thông tin dự án</b-nav-item>
                <b-nav-item href="#">Bình luận</b-nav-item>
                <b-nav-item href="#">Tin tức</b-nav-item>
                <b-nav-item href="#">Gửi thông tin dự án</b-nav-item>
                <b-nav-item href="#">Thành viên</b-nav-item>
              </b-navbar-nav>

              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto">
                <b-nav-form>
                  <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                  <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>
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
            <h3>Sàn giao dịch dự án HomeLand</h3>
            <p>
              Địa chỉ: 54 Lieu Giai - Ba Dinh - Ha Noi <br>
              Điện thoại: 024 3333 6602 - Phone: 0906147557 <br>
              Email: info@homeland.com <br>
              Copyright © 2019 HomeLand
            </p>
          </div>
          <div class="col-xs-12 col-md-4">

          </div>
          <div class="col-xs-12 col-md-4">
            <div class="subscribe">
              <h3>Đăng ký nhận thông tin dự án</h3>
              <input type="text" placeholder="Nhập email của bạn">
              <button>Đăng ký</button>
            </div>
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
