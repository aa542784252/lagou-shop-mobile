<template>
  <div class="home-main">
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in swipeData" :key="index">
        <img :src="item.img" alt="" />
      </van-swipe-item>
    </van-swipe>

    <!-- 菜单 -->
    <van-grid icon-size="40">
      <van-grid-item
        v-for="(item, index) in logoData"
        :key="index"
        :icon="item.img"
        :text="item.info[0].value"
      />
    </van-grid>

    <!-- 滚动提示 -->
    <van-notice-bar left-icon="fire-o" :scrollable="false">
      <span>热点资讯公告：</span>
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item
          v-for="(item, index) in newsData"
          :key="index"
          v-text="item.chiild[0].val"
        ></van-swipe-item>
      </van-swipe>
    </van-notice-bar>

    <!-- 商品列表 -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="initProductsData"
    >
      <product-list :products-data="productsData"></product-list>
    </van-list>
  </div>
</template>

<script setup>
import { getDefalutData } from "@/api/home.js";
import { getProductsData } from "@/api/product.js";
import { computed } from "@vue/reactivity";
import ProductList from "@/components/ProductList.vue";
import { ref } from "vue";

let indexData = ref({});
let productsData = ref([]);

const initIndexData = async () => {
  const { data } = await getDefalutData();
  if (data.status !== 200) {
    return;
  }
  indexData.value = data.data;
};

const loading = ref(false);
const finished = ref(false);
let page = 1;
let limit = 4;
const initProductsData = async () => {
  loading.value = true;
  const { data } = await getProductsData({
    limit,
    page,
  });
  if (data.status !== 200) {
    return;
  }
  loading.value = false;
  productsData.value.push(...data.data);
  if (data.data.length < limit) {
    finished.value = true;
  }
  page++;
};

const swipeData = computed(() => {
  return indexData.value.swiperBg?.default.imgList.list;
});

const logoData = computed(() => {
  return indexData.value.menus?.default.imgList.list;
});

const newsData = computed(() => {
  return indexData.value.news?.default.newList.list;
});

initIndexData();
</script>

<style scoped lang="scss">
.my-swipe img {
  width: 100%;
  height: 170px;
}

:deep(.van-notice-bar__content) {
  display: flex;
  align-items: center;
}

.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>
