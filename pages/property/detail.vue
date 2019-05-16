<template>
  <div class="detail">
    <div class="container">
      <div class="top row">
        <div class="col-12 col-md-6">
          <img src="/images/ha-noi-home-land/main.jpg" alt="">
        </div>
        <div class="short-desc col-12 col-md-6">
          <h2>Thông tin dự án Hà Nội HomeLand</h2>
          <p><img src="/images/location.png" alt="" width="16" height="16">Phường Thượng Thanh, Long Biên, Hà Nội (đoạn cầu Chui – cầu Đông trù)</p>
          <p><b>Chủ đầu tư</b>: Công ty cổ phần đầu tư Hải Phát Thủ Đô</p>
          <p><b>Tiến độ</b>: Đang xây dựng</p>
          <p><b>Giá</b>: 1 tỷ 2 đến 2 tỷ 2</p>
          <table>
            <tr>
              <td>
                <span class="total">8.3</span>
              </td>
              <td>
                <span class="score">9</span>
                <span class="name">Vị trí</span>
              </td>
              <td>
                <span class="score">8</span>
                <span class="name">Chất lượng</span>
              </td>
              <td>
                <span class="score">8</span>
                <span class="name">Giá cả</span>
              </td>
              <td>
                <span class="score">8</span>
                <span class="name">Tiến độ</span>
              </td>
              <td>
                <span class="score">8</span>
                <span class="name">Thiết kế</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="clear"></div>
      <div class="detail">
        <div class="sidebar float-left">
          <ul>
            <li>
              <a href="">Tổng quan</a>
            </li>
            <li>
              <a href="">Ảnh dự án</a>
            </li>
            <li>
              <a href="">Tiến độ</a>
            </li>
            <li>
              <a href="">Bình luận</a>
            </li>
          </ul>
        </div>
        <div class="content float-left">
          <h3>Nội dung dự án sẽ ở đây</h3>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      images: [
        '/images/1.jpg',
        '/images/2.jpg',
        '/images/3.jpg',
        '/images/4.png',
        '/images/5.jpg',
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$pink : #e7005a;
.detail {
  .top {
    .short-desc {
      table {
        tr {
          td {
            padding: 15px;
            text-align: center;
            span {
              display: block;
              &.total {
                background: $pink;
                color: #fff;
                font-size: 20px;
                border-radius: 100%;
                padding: 15px;
              }
              &.score {
                color: $pink;
                font-size: 30px;
                font-weight: bold;
                margin-bottom: 10px;
              }
            }
          }
        }
      }
    }
  }
  .list-images {
    border: 10px solid #f5f5f5;
    > div.item-img {
      width: 20%;
      float: left;
    }
  }
  .detail {
    margin-top: 40px;
    .sidebar {
      width: 20%;
      ul {
        list-style: none;
        padding-left: 0;
        li {
          padding: 5px 10px;
          border-bottom: 1px solid #f5f5f5;
          a {
            color: $pink;
          }
        }
      }
    }
    .content {
      width: 80%;
    }
  }
}
</style>

