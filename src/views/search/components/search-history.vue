<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="searchHistories=[]">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow=true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item,index) in searchHistories"
      :key="index"
      @click="onHistoryClick(item,index)"
    >
      <van-icon name="close" @click="searchHistories.splice(index, 1)" v-if="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'SearchHistory',
  // 组件参数 接收来自父组件的数据
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
      // 控制删除相关元素的显示与隐藏
      isDeleteShow: false
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    onHistoryClick (item, index) {
      if (this.isDeleteShow) {
        // 删除操作
        this.searchHistories.splice(index, 1)
      } else {
        // 搜索操作
        this.$emit('search', item)
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
