<template>
  <div class="layout">
    <div class="header">
      <div class="container">
        <div class="banner">
          <img src="/images/foody-1170x60-gdn2-636854719078673787.jpg" alt="" style="width: 100%">
        </div>
        <div class="navigation">
          <div class="logo float-left">
            <nuxt-link to="/">
              <img src="http://www.homeland-realestate.com/img/Asset%202@4x.png" alt="">
            </nuxt-link>
          </div>
          <div class="menu float-left">
            <ul>
              <li>
                <nuxt-link to="/property/detail">Thông tin dự án</nuxt-link>
              </li>
              <li>
                <a href="">Bình luận</a>
              </li>
              <li>
                <a href="">Tin tức</a>
              </li>
            </ul>
          </div>
          <div class="search float-left">
            <input type="text" placeholder="search">
          </div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="content">
      <nuxt />
    </div>
    <div class="footer">
      <div class="container">
        <div class="float-left about">
          <h3>Sàn giao dịch dự án HomeLand</h3>
          <p>
            Địa chỉ: 54 Lieu Giai - Ba Dinh - Ha Noi <br>
            Điện thoại: 024 3333 6602 - Phone: 0906147557 <br>
            Email: info@homeland.com <br>
            Copyright © 2019 HomeLand
          </p>
        </div>
        <div class="float-left fanpage">

        </div>
        <div class="float-left subscribe">
          <h3>Đăng ký nhận thông tin dự án</h3>
          <input type="text" placeholder="Nhập email của bạn">
          <button>Đăng ký</button>
        </div>
        <div class="clear"></div>
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
  margin-top: 40px;
  background: #eee;
  h3 {
    margin-bottom: 20px;
  }
  .about, .fanpage, .subscribe {
    padding: 20px 10px;
    width: 33%;
    box-sizing: border-box;
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
