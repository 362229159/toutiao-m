<template>
  <div class="article-item">
    <!-- 单元格 -->
    <van-cell>
      <!-- 自定义左侧内容 -->
      <div slot="title" class="title">{{article.title}}</div>
      <!-- 自定义标题下方的label内容 -->
      <div slot="label">
        <!-- 判断图片的数量 -->
        <div v-if="article.cover.type === 3" class="cover-wrap">
          <div v-for="(item,index) in article.cover.images" :key="index" class="cover-item">
            <van-image :src="item" class="cover-item-img" />
          </div>
        </div>
        <div class="label-info-wrap">
          <span>{{article.aut_name}}</span>
          <span>{{article.comm_count}}评论</span>
          <span>{{article.pubdate|relativeTime}}</span>
        </div>
      </div>
      <!-- 一张图片右侧显示 -->
      <van-image
        v-if="article.cover.type === 1"
        :src="article.cover.images[0]"
        width="100"
        height="100"
        slot="default"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'ArticleItem',
  // 组件参数 接收来自父组件的数据
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {}
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {},
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
.article-item {
  // 标题
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  // 一张右侧图片
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  // 右侧图片大小
  .right-cover {
    width: 100%;
  }
  // 下方文字大小
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  // 三张图片样式
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        margin-right: 4px;
      }
      .cover-item-img {
        width: 100%;
      }
    }
  }
}
</style>
