<template>
  <div class="search-suggestion">
    <van-cell v-for="(item, index) in list" :key="index" icon="search" @click="$emit('search',item)">
      <div slot="title" v-html="highlight(item,searchText)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
// 引入lodash防抖功能
import { debounce } from 'lodash'
export default {
  // 组件名称
  name: 'SearchSuggestion',
  // 组件参数 接收来自父组件的数据
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
      // 建议的数组
      list: []
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // 获取联想数据
    // async loadSuggestion () {
    //   try {
    //     const { data } = await getSuggestion(this.searchText)
    //     console.log(data)
    //     this.list = data.data.options
    //   } catch (err) {
    //     this.$toast.fail('获取数据失败')
    //   }
    // }
    loadSuggestion: debounce(async function () {
      if (!this.searchText) return
      try {
        const { data } = await getSuggestion(this.searchText)
        console.log(data)
        this.list = data.data.options
      } catch (err) {
        this.$toast.fail('获取数据失败')
      }
    }, 200),
    // 封装关键字高亮函数
    highlight (source, keyword) {
      var reg = new RegExp(keyword, 'gi')
      return source.replace(
        reg,
        `<span style="color: #3296fa">${keyword}</span>`
      )
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created () {
    this.loadSuggestion()
  },
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted () {}
}
</script>

<style scoped lang="less">
.van-icon {
  margin-right: 5px;
  font-size: 15px;
  vertical-align: middle;
}
</style>
