<template>
  <!-- 这里注意 这个div设置了滚动条 目的是 给后面做 阅读记忆 留下伏笔 -->
  <!-- 阅读记忆 => 看文章看到一半 滑到中部 去了别的页面 当你回来时 文章还在你看的位置 -->
  <div class="scroll-wrapper">
       <!-- 放置list组件list组件可以实现 上拉加载 -->
       <van-pull-refresh v-model="downloading" @refresh="onrefresh" :success-text="successtext">
         <van-list v-model="upLoading" :finished="finished"  finished-text="没有了" @load="onLoad">
       <!-- <van-cell v-for="item in articles" :key="item" :title="item"></van-cell> -->
            <van-cell v-for="article in articles" :key="article.art_id.toString()">
          <div class="article_item">
            <!-- <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3> -->
            <h3 class="van-ellipsis">{{article.title}}</h3>
            <!-- 三图模式 -->
            <div class="img_box" v-if="article.cover.type===3">
              <van-image class="w33" fit="cover" :src="article.cover.images[0]" />
              <van-image class="w33" fit="cover" :src="article.cover.images[1]" />
              <van-image class="w33" fit="cover" :src="article.cover.images[2]" />
            </div>
            <!-- 单图模式 -->
            <div class="img_box" v-if="article.cover.type===1">
              <van-image class="w100" fit="cover" :src="article.cover.images[0]" />
            </div>
            <div class="info_box">
              <span>{{article.aut_name}}</span>
              <span>{{article.commm_count}}评论</span>
              <span>{{article.pubdate}}</span>
              <span class="close">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
       </van-list>
       </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'article-list',
  data () {
    return {
      upLoading: false, // 是否开启上拉加载
      finished: false, // 是否已经完成全部的数据加载
      articles: [],
      downloading: false,
      successtext: '更新成功',
      timestamp: null
    }
  },
  props: {
    channel_id: {
      type: Number,
      required: true,
      default: null
    }
  },
  methods: {
    //   上拉加载方法
    // onLoad () {
    // console.log('开始加载数据')
    // setTimeout(() => {
    //   //   给数据设置一个上限  不超过50条 如果50 条
    //   if (this.articles.length < 50) {
    //     let arr = Array.from(Array(10), (value, index) => this.articles.length + index + 1)
    //     this.articles.push(...arr)
    //     //   关掉状态
    //     this.upLoading = false
    //   } else {
    //     this.finished = true // 告诉list组件  我已经加载完了 不要再去触发onLoad事件了
    //   }
    // }, 1000)
    async onLoad () {
      const data = await getArticles({ channel_id: this.channel_id, timestamp: this.timestamp || Date.now() })
      this.articles.push(...data.results)
      this.upLoading = false
      if (data.pre_timestamp) {
        this.timestamp = data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    onrefresh () {
      console.log('下拉刷新')
      // setTimeout(() => {
      //   let arr = Array.from(Array(10), (value, index) => ('追加' + (index + 1)))
      //   this.articles.unshift(...arr)
      //   this.downloading = false
      //   this.successtext = `更新了${arr.length}条数据`
      // }, 1000)
    }
  }
}

</script>

<style lang='less' scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
