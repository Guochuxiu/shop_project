<!-- src/components/carousle/index.vue -->
<template>
    <div class="swiper-container" ref="swiperContainer">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousle in list" :key="carousle.id">
                <img :src="carousle.imgUrl" />
            </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.css';

export default {
    name: 'Carousle', // 修正：使用 PascalCase 命名
    props: ['list'],
    data() {
        return {
            swiperInstance: null
        };
    },
    watch: {
        list: {
            immediate: true,
            handler(newList) {
                if (newList && newList.length > 0) {
                    this.$nextTick(() => {
                        this.initSwiper();
                    });
                }
            }
        }
    },
    methods: {
        initSwiper() {
            // 清理之前的实例
            if (this.swiperInstance) {
                this.swiperInstance.destroy();
                this.swiperInstance = null;
            }

            // 初始化新的 Swiper 实例
            const swiperContainer = this.$refs.swiperContainer;
            if (swiperContainer) {
                this.swiperInstance = new Swiper(swiperContainer, {
                    loop: true,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    }
                });
            }
        }
    },
    beforeDestroy() {
        // 组件销毁时清理 Swiper 实例
        if (this.swiperInstance) {
            this.swiperInstance.destroy();
            this.swiperInstance = null;
        }
    }
};
</script>

<style scoped></style>