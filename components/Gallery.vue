<template>
  <div class="featured-photo">
    <div class="container-inner">
      <div class="scroller-wrap">
        <div class="scroller" ref="scroller">
          <div class="scroller-inner" ref="scroller_inner" :style="'left:'+scroller.left+'px; width: '+totalWidth+'px'">
            <div class="scroller-item" v-for="(item, index) in items" :key="index" ref="scroller_items">
              <img :src="item.thumbnail" alt="" @click="openImg(index)">
            </div>
          </div>
        </div>
        <a href="#" class="scroller-button next" v-if="scroller.next" @click.prevent="scroll(1)"><i class="fa fa-angle-double-right" aria-hidden="true"></i></a>

        <a href="#" class="scroller-button prev" v-if="scroller.prev" @click.prevent="scroll(2)"><i class="fa fa-angle-double-left" aria-hidden="true"></i></a>
      </div>
    </div>
    <b-modal id="galleryModal" size="xl" ref="myModalRef" centered hide-header hide-footer hide-title>
      <div class="d-block text-center img-modal">


        <img :src="items[currentItem] ? items[currentItem].source : ''" alt="">


        <a href="#" class="img-button next" @click.prevent="change(1)"><i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
        <a href="#" class="img-button prev" @click.prevent="change(2)"><i class="fa fa-angle-double-left" aria-hidden="true"></i></a>

      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentItem: '',

      scroller: {
        full: 0,
        screen: 0,
        max: 0,
        left: 0,
        next: true,
        prev: false,
        step: 250
      }
    }
  },
  props: ['totalWidth', 'items'],
  mounted () {
    if (this.items && this.items.length > 0) {
      this.scroller.full = this.totalWidth // this.$refs.scroller_inner.clientWidth
      this.scroller.screen = this.$refs.scroller.clientWidth
      this.scroller.max = this.scroller.full - this.scroller.screen
    }
  },
  methods: {

    openImg (index) {
      this.currentItem = index
      this.$refs.myModalRef.show()
    },
    change (type) {
      if (type === 1) {
        // prev
        if (this.currentItem === 0) {
          this.currentItem = this.items.length - 1
        } else {
          this.currentItem--
        }
      } else {
        // next
        if (this.currentItem + 1 === this.items.length) {
          this.currentItem = 0
        } else {
          this.currentItem++
        }
      }
    },
    scroll (type) {
      if (type === 1) {
        // next
        console.log('left: ', this.scroller.left)
        console.log('step: ', this.scroller.step)
        console.log('max: ', this.scroller.max)
        console.log('screen: ', this.scroller.screen)
        console.log('full: ', this.scroller.full)
        if (this.scroller.left - this.scroller.step * 2 < 0 - this.scroller.max) {
          this.scroller.left = 0 - this.scroller.max
        } else {
          this.scroller.left -=  this.scroller.step
        }
      } else {
        // prev
        if (this.scroller.left +  this.scroller.step * 2 > 0) {
          this.scroller.left = 0
        } else {
          this.scroller.left +=  this.scroller.step
        }
      }
      if (this.scroller.left < 0) {
        this.scroller.prev = true
      } else {
        this.scroller.prev = false
      }
      if (this.scroller.left > 0 - this.scroller.max) {
        this.scroller.next = true
      } else {
        this.scroller.next = false
      }
    }
  }
}
</script>

<style lang="scss">
.featured-photo {
  padding-bottom: 20px;
  h2 {
    cursor: pointer;
    text-transform: uppercase;
    margin-bottom: 20px;
    color: #e4111d;
    font-weight: bold;
  }
  .btn-galleries {
    margin-top: 40px;
    background: #000;
    color: #fff;
  }
}
.scroller-wrap {
  position: relative;
  width: 100%;
  .scroller {
    height: 300px;
    overflow: hidden;
    .scroller-inner {

      position: relative;
      left: 0;
      transition: all 0.5s;
      .scroller-item {
        display: inline;
        // border-right: 2px solid #fff;
        &:hover {
          cursor: pointer;
        }
        img {
          height: 300px;
          width: auto;
        }
      }
    }
  }
  .scroller-button {
    position: absolute;
    top: 45%;
    &.next {
      right: -20px;
      @media screen and (max-width: 767px){
        right: -15px;
      }
    }
    &.prev {
      left: -20px;
      @media screen and (max-width: 767px){
        left: -15px;
      }
      img {
        transform: rotate(180deg)
      }
    }
  }
}
#galleryModal {
  .modal-content {
    background: none;
    border: 0;
    .img-modal {
      position: relative;
      .img-button {
        position: absolute;
        top: 45%;
        img {
          border: 0;
        }
        &.next {
          right: 0;
        }
        &.prev {
          left: 0;
          img {
            transform: rotate(180deg);
          }
        }
      }
    }
    img {
      border: 2px solid #ccc;
    }
  }
}
</style>
