<template>
  <!-- 这里注意 这个div设置了滚动条 目的是 给后面做 阅读记忆 留下伏笔 -->
  <!-- 阅读记忆 => 看文章看到一半 滑到中部 去了别的页面 当你回来时 文章还在你看的位置 -->
  <div class="scroll-wrapper">
       <!-- 放置list组件list组件可以实现 上拉加载 -->
       <van-pull-refresh v-model="downloading" @refresh="onrefresh" :success="successtext">
         <van-list v-model="upLoading" :finished="finished"  finished-text="没有了" @load="onLoad">
       <van-cell v-for="item in articles" :key="item" :title="item"></van-cell>
       </van-list>
       </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      upLoading: false, // 是否开启上拉加载
      finished: false, // 是否已经完成全部的数据加载
      articles: [],
      downloading: false,
      successtext: '更新成功'
    }
  },
  methods: {
    //   上拉加载方法
    onLoad () {
      console.log('开始加载数据')
      setTimeout(() => {
        //   给数据设置一个上限  不超过50条 如果50 条
        if (this.articles.length < 50) {
          let arr = Array.from(Array(10), (value, index) => this.articles.length + index + 1)
          this.articles.push(...arr)
          //   关掉状态
          this.upLoading = false
        } else {
          this.finished = true // 告诉list组件  我已经加载完了 不要再去触发onLoad事件了
        }
      }, 1000)
    },
    onrefresh () {
      console.log('下拉刷新')
      setTimeout(() => {
        let arr = Array.from(Array(10), (value, index) => ('追加' + (index + 1)))
        this.articles.unshift(...arr)
        this.downloading = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
</style>
