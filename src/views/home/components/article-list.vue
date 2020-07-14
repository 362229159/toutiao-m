<template>
  <div class="article-list">
    <!-- 列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :success-text="refreshSuccessText">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
        <article-item v-for="(article,index) in list" :key="index" :article="article"></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article.js'
// 引入列表项组件
import ArticleItem from '@/components/article-item'
export default {
  // 组件名称
  name: 'ArticleList',
  // 组件参数 接收来自父组件的数据
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  // 局部注册的组件
  components: {
    // 列表项组件
    ArticleItem
  },
  // 组件状态值
  data () {
    return {
      // 存储列表数据的数组
      list: [],
      // 控制加载中的loading状态
      loading: false,
      // 控制数据加载结束的状态
      finished: false,
      // 上次加载完成返回的时间
      timestamp: null,
      // 是否处于加载中状态
      refreshing: false,
      // 刷新成功的文本
      refreshSuccessText: '',
      // 控制错误提示
      error: false
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // 初始化或
    async onLoad () {
      console.log('onload')
      try {
        // 获取列表数据
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })

        // 测试请求失败情况
        if (Math.random() > 0.5) {
          this.error = true
        }

        // console.log(data)
        // 解构数据
        const { results } = data.data
        // console.log(results)
        // 由于是滚动加载，不能直接赋值，需要添加。
        this.list.push(...results)
        // this.list = this.list.concat(results)
        // 本次加载完成，设置加载状态
        this.loading = false
        // 判断resulet的长度
        if (results.length) {
          // 有数据， 获取下一次的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据，结束
          this.finished = true
        }
      } catch (err) {
        // 关闭loading
        this.loading = false
      }
    },
    // 下拉刷新
    async onRefresh () {
      try {
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const { results } = data.data
        // 向列表前面插入数据
        this.list.unshift(...results)
        // 关闭下拉刷新loading
        this.refreshing = false
        // 更新成功信息
        this.refreshSuccessText = `更新了${results.length}条数据`
      } catch (err) {
        console.log(err)
        this.refreshing = false
      }
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created () {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted () {}
}
</script>

<style scoped lang="less">
// 文章列表高度、
// .article-list {
//   height: 80vh;
//   overflow-y: auto;
// }
</style>
