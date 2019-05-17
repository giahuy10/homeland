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
      <div class="detail-content">
        <b-card no-body>
          <b-tabs pills card vertical>
            <b-tab title="Tổng quan" active>
              <b-card-text>
                <ul>
                  <li>Tổng Diện tích khu đất: 17,101 m2 (diện tích xây dựng: 16,832 m2)</li>
                  <li>Diện tích thương mại: 3,830 m2</li>
                  <li>Đất canh xanh, cảnh quan, TDTT: 2,900 m2</li>
                  <li>Đất giao thông nội bộ: 7,369 m2</li>
                  <li>Mật độ xây dựng: 39,95 %</li>
                  <li>Thiết kế: CT CP tập đoàn BRG/ Tư vấn giám sát: CT Beacons</li>
                </ul>
              </b-card-text>
            </b-tab>
            <b-tab title="Ảnh dự án">
              <b-card-text>
                <div class="list-images">
                  <img src="/images/ha-noi-home-land/9aabe0c3a1f944a71de8.jpg" alt="">
                  <img src="/images/ha-noi-home-land/42ee9860da5a3f04664b.jpg" alt="">
                  <img src="/images/ha-noi-home-land/64a78319c123247d7d32.jpg" alt="">
                  <img src="/images/ha-noi-home-land/996f32ae709495cacc85.jpg" alt="">
                  <img src="/images/ha-noi-home-land/8b9cf202b03855660c29.jpg" alt="">
                </div>
                <h4>Sản phẩm</h4>
                <ul>
                  <li>4 tòa tháp cao 18 tầng, 1224 căn hộ, 18 căn/sàn/tòa (tính trung bình) </li>
                  <li>Tầng 1 – thương mại dịch vu, tầng 2-18 nhà ở</li>
                  <li>1-3 phòng ngủ, diện tích từ 58 m2 – 95 m2</li>
                </ul>
                <h4>Tiện tích</h4>
                <ul>
                  <li>2 tầng hầm gửi xe, bể bơi ngoài trời, phòng khám 27/4, khu vực bán lẻ tầng 1</li>
                </ul>
              </b-card-text>
            </b-tab>
            <b-tab title="Tiến độ">
              <b-card-text>
                <ul>
                  <li>Khởi công: 2017</li>
                  <li>Dự kiến hoàn thành: Quý 3/2019</li>
                </ul>
              </b-card-text>
            </b-tab>
            <b-tab title="Bình luận"><b-card-text>Tab Contents 3</b-card-text></b-tab>
          </b-tabs>
        </b-card>
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
  padding-top: 40px;
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

