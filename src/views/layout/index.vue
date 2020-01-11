<template>
  <div class="conter">
    <van-nav-bar title="黑马头条" right-text="搜索"></van-nav-bar>
    <div><router-view></router-view></div>
    <div class="footer">
      <van-tabbar route>
  <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
  <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
  <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
</van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
</style>
