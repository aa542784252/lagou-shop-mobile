<template>
  <van-nav-bar
    fixed
    left-arrow
  />
  <van-tabs scrollspy color="#FBC546" v-model:active="active">
    <van-tab title="商品">
      <van-swipe :autoplay="3000" width="375" height="375">
        <van-swipe-item v-for="(item,index) in sliderImage" :key="index">
          <img :src="item"/>
        </van-swipe-item>
      </van-swipe>
        <van-cell class="productHeader" :border="false">
          <template #title>
            <div class="price">
              <span>￥{{ storeInfo?.price }}</span>
              <van-icon name="share-o" size="20" class="share"></van-icon>
            </div>
            <div class="title" v-text="storeInfo?.store_name"></div>
          </template>
          <template #label>
            <span>原价：￥{{ storeInfo?.ot_price }}</span>
            <span>库存：{{ storeInfo?.stock + storeInfo?.unit_name }}</span>
            <span>销量：{{ storeInfo?.fsales }}</span>
          </template>
        </van-cell> 

        <van-cell class="sku_window" is-link @click="handlePopUp">
          <template #title>
            <span>已选择: {{ sku }}</span>
          </template>
        </van-cell>
        <van-popup v-model:show="specState.show" position="bottom" class="popup">
          <van-cell-group>
            <van-cell class="popup-header">
              <img :src="specDetail?.image" alt="">
              <div class="info">
                <p class="title" v-text="storeInfo?.store_name"></p>
                <p class="price">￥{{ specDetail?.price }}</p>
                <p class="stock">库存: {{ specDetail?.stock }}</p>
              </div>
              <van-cell v-for="(attr,specIndex) in productAttr" :key="attr.id" class="spec">
                <p v-text="attr.attr_name"></p>
                <span v-for="tag in attr.attr_values" :key="tag" :class="{tag, active: specState.spec[specIndex] === tag}" v-text="tag" @click="handleTagChange(tag,specIndex)"></span>
              </van-cell>
              <van-cell title="数量">
                <van-stepper v-model="specState.buyCount" :max="specDetail?.stock"></van-stepper>
              </van-cell>
            </van-cell>
          </van-cell-group>
        </van-popup> 
    </van-tab>
    <van-tab title="评价">
      <van-cell-group>
        <van-cell 
          is-link
          :title="replyInfo"
          :value="replyRate"
          :to="{
            name:'comment',
            params: {
              productId: storeInfo?.id
            }
          }">
        </van-cell>
        <comment-item v-if="replyCount !== 0" :reply="reply"></comment-item>    
      </van-cell-group>
    </van-tab>
    <van-tab title="推荐">
      <van-cell class="recommend">
        <p class="title">推荐商品</p>
        <van-grid :border="false" :column-num="3">
          <van-grid-item v-for="item in goodList" :key="item.id" :to="{
            name:'product',
            params: {
              productId:item.id
            }
          }">
            <van-image :src="item.image"></van-image>
            <p v-text="item.store_name"></p>
            <span>${{ item.price }}</span>
          </van-grid-item>
        </van-grid>
      </van-cell>
    </van-tab>
    <van-tab title="详情">
      <div class="description" v-html="storeInfo?.description"></div>
    </van-tab>
  </van-tabs>

</template>

<script setup>
import CommentItem from '../../components/CommentItem.vue';
import { onBeforeRouteUpdate,useRouter } from 'vue-router'
const router = useRouter()
import { getProductsDetail } from '@/api/product'
import { computed, reactive, ref } from "vue";

const { productId } = defineProps({
  productId: {
    type: String,
    required: true
  }
})
const productDetails = ref({});
const initSpec = (spec) => {
  specState.spec = spec.map(item => item.attr_values[0])
}
const initProductsDetail = async (productId) => {
  const { data } = await getProductsDetail(productId)
  if (data.status !== 200) { 
    return router.push({name: 'home'})
  }
  productDetails.value = data.data
  initSpec(data.data.productAttr)
}

initProductsDetail(productId)
// 商品详细信息
const storeInfo = computed(() => productDetails.value.storeInfo)
const sliderImage = computed(() => storeInfo.value?.slider_image)

const replyCount = computed(()=> productDetails?.value.replyCount || 0)
const replyInfo = computed(()=>`用户评价(${ replyCount.value })`)

const replyChance = computed(() => productDetails?.value.replyChance || 0)
const replyRate = computed(() => replyChance.value + '%好评率')
const reply = computed(() => productDetails.value.reply)
// 推荐商品信息
const goodList = computed(() => productDetails.value.good_list)
// 通过导航守卫监听路由变化，并请求对应商品数据
onBeforeRouteUpdate((to) => {
  productDetails.value = {}
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  initProductsDetail(to.params.productId)
})

// 规格弹出层处理
const specState = reactive({
  show:false,
  spec: [],
})

const sku = computed(() => specState.spec.toString())

const handlePopUp = () => {
  specState.show = !specState.show
}

const productAttr = computed(() => productDetails.value.productAttr)
const productValue = computed(() => productDetails.value.productValue)

const specDetail = computed(() => productValue.value?.[sku.value])

const handleTagChange = (tag, specIndex) => {
  specState.spec[specIndex] = tag
}
</script>

<style scoped lang="scss">
:deep(.van-tabs__wrap) {
  width: 80%;
  position: fixed;
  top: 0;
  z-index: 999;
  left: 50%;
  transform: translateX(-50%);
}
:deep(.van-tabs__content) {
  padding-top: 46px;
}
.van-swipe-item img {
  width: 375px;
}

:deep(.productHeader) {
  margin-bottom: 10px;
  .van-cell__title {
    .price{
      span {
        font-size: 24px;
        font-weight: 700;
      }
    }
    .share {
      float: right;
    }
    .title{
      font-size: 16px;
      font-weight: 700;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin: 5px 0 10px;
    }
  }
  .van-cell__label {
    display: flex;
    justify-content: space-between;
  }
}

.sku_window {
  margin-bottom: 10px;
}

:deep.recommend {
  margin-bottom: 10px;
  .title {
    font-size: 16px;
    font-weight: 700;
    padding: 5px 0;
  }
  .van-grid-item__content {
    padding: 0;
  }
  .van-grid-item {
    img {
      width: 107px;
      height: 107px;
    }
    p {
      padding: 0 3px;
      font-size: 14px;
      font-weight: 700;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 2;
    }
    span {
      color: #F2270C;
      font-size: 12px;
      font-weight: 700;
      align-self: flex-start;
    }
  }
}

.description {
  width: 100%;
  :deep(img) {
    width: 100%;
  }
}

:deep(.van-popup) {
  border-radius: 10px 10px 0 0;
  max-height: 70%;
  margin-bottom: 50px;
  .popup-header {
    .van-cell_value {
      display: flex;
      img {
        width: 75px;
        height: 75px;
        align-self: center;
      }
      .info {
        padding: 10px;
        .title {
          font-size: 16px;
          font-weight: 700;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          -webkit-line-clamp: 1;
          margin-bottom: 10px;
        }
        .price {
          font-size: 16px;
          color: #F2270C;
        }
        .stock {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
  .spec {
    p {
      margin-bottom: 5px;
    }
    .tag {
      display: inline-block;
      min-width: 25px;
      padding: 0 12px;
      border: 1px solid #ccc;
      border-radius: 20px;
      text-align: center;
      background-color: #F2F2F2;
      margin-right: 7px;
    }
    .active {
      border-color: #F2270C;
      color: #F2270C;
      background-color: #fcedeb;
    }
  }
}
</style>
