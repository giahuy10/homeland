<template>
    <div class="gallery-comment">
        <div class="gallery-comment-item" v-for="(item, index) in items" :key="index">
            <img :src="item.thumbnail" alt="" @click="openImg(index)">
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
    props: ['items'],
    data () {
        return {
            currentItem: '',
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
    },
}
</script>

<style lang="scss">
.gallery-comment-item {
    display: inline;
    &:hover {
        cursor: pointer;
    }
    img {
        height: 80px;
        width: auto;
    }
}
</style>

