<template>
    <van-cell-group class="comment">
        <van-cell title="商品评价" :value="`好评率:${ state.replyChance }%`"></van-cell>
        <van-cell class="tags">
            <van-button size="small" @click="tagHandle('0')" :class="{ active:state.isSum }">全部({{ state.sumCount }})</van-button>  
            <van-button size="small" @click="tagHandle('1')" :class="{ active:state.isGood }">好评({{ state.goodCount }})</van-button>  
            <van-button size="small" @click="tagHandle('2')" :class="{ active:state.isIn }">中评({{ state.inCount }})</van-button>  
            <van-button size="small" @click="tagHandle('3')" :class="{ active:state.isPoor }">差评({{ state.poorCount }})</van-button>  
        </van-cell>
        <div v-if="state.hasComment">
            <comment-item v-for="item in state.commentList" :key="item.id" :reply="item"></comment-item>
        </div>
        <van-empty v-else description="暂无评论"></van-empty>
    </van-cell-group>
</template>

<script setup>
import CommentItem from '../../components/CommentItem.vue';

const { productId } = defineProps({
  productId: {
    type: String,
    required: true
  }
})

import { getCommentCount, getCommentByTag } from '@/api/product'
import { computed, reactive } from 'vue';

const state = reactive({
    commentCounts: {},
    goodCount: computed(() => state.commentCounts?.good_count || 0),
    poorCount: computed(() => state.commentCounts?.poor_count || 0),
    inCount: computed(() => state.commentCounts?.in_count || 0),
    sumCount: computed(() => state.commentCounts?.sum_count || 0),
    replyChance: computed(() => state.commentCounts?.reply_chance),
    commentList: [],
    active: '0',
    isSum: computed(() => state.active === '0'),
    isGood: computed(() => state.active === '1'),
    isIn: computed(() => state.active === '2'),
    isPoor: computed(() => state.active === '3'),
    hasComment: computed(() => state.commentList.length || 0)
})

async function initReplyData() {
    const { data } = await getCommentCount(productId)
    if (data.status !== 200) {return}
    state.commentCounts = data.data
}
initReplyData()

async function initCommentByTag(type) {
    const {data} = await getCommentByTag(productId, {type})
    if (data.status !==200) {return}
    state.commentList = data.data
}

initCommentByTag('0')

function tagHandle(tagKey) {
    state.active = tagKey
    initCommentByTag(tagKey)
}
</script>

<style scoped lang="scss">
.tags {
    .van-button {
        border-radius: 15px;
        margin-right: 10px;
    }
    .active {
        background-color: #FBC546;
    }
}
</style>
