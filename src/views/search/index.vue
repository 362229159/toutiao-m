<template>
  <div class="search-container">
    <!-- 搜索区域 -->
    <!-- van-search 外层添加form，并且action不为空，则iso输入法可以显示按钮 -->
    <form action="/">
      <van-search
        v-model="searchText"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :searchText="searchText" />

    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :searchText="searchText" @search="onSearch" />

    <!-- 搜索历史记录 -->
    <search-history v-else :searchHistories="searchHistories" @search="onSearch" />
  </div>
</template>

<script>
// 导入子组件
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'
import { setItem, getItem } from '@/utils/storage.js'

export default {
  // 组件名称
  name: 'SearchPage',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  // 组件状态值
  data () {
    return {
      // 搜索内容
      searchText: '',
      // 控制搜索结果的显示状态
      isResultShow: false,
      // 搜索的历史记录
      searchHistories: getItem('search-histories') || []
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    // 将搜索的历史记录存到本地
    searchHistories (val) {
      setItem('search-histories', val)
    }
  },
  // 组件方法
  methods: {
    // 搜索时触发
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val

      // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)

      // 渲染搜索结果
      this.isResultShow = true
    },
    // 取消时触发
    onCancel () {
      this.$router.back()
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
.van-search__action {
  color: #ffffff;
}
</style>
