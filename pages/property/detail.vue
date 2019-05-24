<template>
  <div class="detail">
    <div class="container">
      <div class="top row">
        <div class="col-12 col-md-6">
          <img src="/images/ha-noi-home-land/main.jpg" alt="">
        </div>
        <div class="short-desc col-12 col-md-6">
          <h2>Hà Nội HomeLand</h2>

          <p> Công ty cổ phần đầu tư Hải Phát Thủ Đô <br>
          Căn hộ chung cư và dịch vụ
          </p>

          <table>
            <tr>
              <td>
                <span class="score">9</span>
                <span class="name">Vị trí</span>
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
                <span class="name">Chất lượng</span>
              </td>
              <td>
                <span class="score">8</span>
                <span class="name">Thiết kế</span>
              </td>
            </tr>
          </table>
          <ul>
            <li>Phường Thượng Thanh, Long Biên, Hà Nội (đoạn cầu Chui – cầu Đông trù)</li>
            <li>Đang xây dựng</li>
            <li><b class="text-pink">1 tỷ 2 - 2 tỷ 2</b></li>
          </ul>

        </div>
      </div>
      <div class="clear"></div>
      <div class="detail-content">
        <b-card no-body>
          <b-tabs pills card vertical>
            <b-tab title="Trang chủ" active>

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
                <Gallery/>
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
            <b-tab title="Bình luận">
              <b-card-text>
                <h4>Gửi bình luận</h4>
                <b-form-textarea
                  id="textarea"
                  placeholder="Viết bình luận của bạn..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
                <div class="list-chat">
                  <div class="chat">
                    <div class="message">
                      <div class="row">
                        <div class="col-1 text-right ">
                          <img src="/images/main-thumb-282821662-100-krruoowyyretxlddfvilxlmqdpnczfqg.jpeg" alt="">
                        </div>
                        <div class="col-11">
                          <b class="username">Eddy Nguyen</b> <br> Bất động sản này rất tốt
                        </div>
                      </div>


                    </div>
                    <div class="sub-chat">
                      <div class="message">

                        <div class="row">
                          <div class="col-1 text-right">
                            <img src="/images/photo.jpg" alt="">
                          </div>
                          <div class="col-11">
                            <b class="username">Henry</b> <br> Bất động sản này rất tốt
                          </div>
                        </div>
                      </div>
                      <div class="message">

                        <div class="row">
                          <div class="col-1 text-right">
                            <img src="/images/unnamed.jpg" alt="">
                          </div>
                          <div class="col-11">
                            <b class="username">Lou Hoang</b> <br> Bất động sản này rất tốt
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab title="Bản đồ">
              <b-card-text>
                <ul>
                  <li>Khởi công: 2017</li>
                  <li>Dự kiến hoàn thành: Quý 3/2019</li>
                </ul>
              </b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>

  </div>
</template>
<script>

import Gallery from '~/components/Gallery.vue';
export default {
  components: {Gallery},
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
                background: $pink;
                color: #fff;
                font-size: 30px;
                font-weight: bold;
                margin-bottom: 10px;
                border: 1px solid;
                border-radius: 100%;
                width: 50px;
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
.list-chat {
  margin-top: 20px;
  .chat {
    .message {
      .row {
        > div {
          padding: 5px 5px;
        }
      }
      .username {
        // display: block;
      }
      img {
        width: 40px;
        border-radius: 100%;
      }
    }
    .sub-chat{
      padding-left: 40px;
    }
  }
}
</style>

