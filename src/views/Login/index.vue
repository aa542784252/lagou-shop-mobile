<template>
  <van-form @submit="submitHandle">
    <img class="logo" src="" alt="">
    <van-field
      v-model="state.username"
      clearable
      name="用户名"
      label="用户名"
      placeholder="用户名"
    />
    <van-field
      v-model="state.password"
      clearable
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
    />
    <van-field
      v-model="state.captcha"
      center
      clearable
      name="验证码"
      label="短信验证码"
      placeholder="短信验证码"
    >
      <template #button>
        <van-button size="small" type="primary">发送验证码</van-button>
      </template>
    </van-field>
    <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      登录
    </van-button>
    <span class="change-button">快速登录</span>
  </div>
  </van-form>
</template>

<script setup>
import { reactive } from 'vue';

  const submitHandle = () => {
    
  }
  const state = reactive({
    username: '',
    password: '',
    captcha: ''
  })
</script>

<style lang="scss" scoped>
.van-form {
  display: flex;
  flex-direction: column;
}

.logo {
  width: 150px;
  height: 150px;
  align-self: center;
  margin: 30px 0 10px;
}

.change-button {
  display: block;
  text-align: center;
  font-size: 14px;
  color: #999;
  margin-top: 10px;
}
</style>