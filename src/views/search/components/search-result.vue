<template>
  <div class="search-result">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getResult } from '@/api/search'
export default {
  // 组件名称
  name: 'SearchResult',
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
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      // 搜索结果
      list: []
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async onLoad () {
      try {
        const { data } = await getResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        console.log(data)
        var res = data.data.results
        this.list.push(...res)
        // 获取成功，关闭loading状态
        this.loading = false
        // 判断数据是否加载完毕，
        if (res.length) {
          // 未加载完毕
          this.page++
        } else {
          // 加载完毕，结束
          this.finished = true
        }
      } catch (err) {
        this.$toast.fail('获取数据失败')
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
</style>
