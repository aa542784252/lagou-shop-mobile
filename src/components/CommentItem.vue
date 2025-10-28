<template>
    <van-cell class="comment-item">
          <div class="user-info">
            <img :src="reply?.avatar" alt="">
            <span class="nickName" v-text="reply?.nickname"></span>
            <van-rate v-model="star" readonly></van-rate>
          </div>
          <p class="time">{{ reply?.add_time }} {{ reply?.sku }}</p>
          <p class="comment-content" v-text="reply?.comment"></p>
          <ul class="pciture">
            <li v-for="(item,index) in pics" :key="index"><img :src="item" alt=""></li>
          </ul>
        </van-cell>
</template>

<script setup>
import { computed } from 'vue'
const { reply } = defineProps({
    reply: {
        type: Object,
        require:true
    }
})

const star = computed(() => Number(reply?.star))
const pics = computed(() => reply?.pics)
</script>

<style scoped lang="scss">
.comment {
  margin-bottom: 10px;
  .comment-item {
    padding: 0 15px 20px;
    .user-info {
      font-size: 13px;
      display: flex;
      align-items: center;
      padding: 7px 0;
      img {
        width: 28px;
        height: 28px;
      }
    }
    .time{
      font-size: 12px;
      color: #82848f;
      padding: 5px 0;
    }
    .comment-content{
      font-size: 13px;
      margin-bottom: 10px;
    }
    .picture{
      li {
        float: left;
        padding-right: 7px;
        img {
          width: 78px;
          height: 78px;
        }
      }
    }
  }
}
</style>
