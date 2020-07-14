<template>
  <div class="home-container">
    <!-- 头部搜索模块 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        type="info"
        slot="title"
        size="mini"
        round
        icon="search"
        class="search-btn"
        @click="goSearch"
      >搜索</van-button>
    </van-nav-bar>

    <!-- 标签页导航 -->
    <!-- animated转场动画  swipeable开启手势滑动切换-->
    <!-- :lazy-render="false" 不开启延迟渲染（首次切换到标签时才触发内容渲染） -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <!-- 频道 -->
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <!-- 频道的文章列表 -->
        <article-list :channel="channel"></article-list>
      </van-tab>
      <!-- 定义汉堡插槽 -->
      <!-- <div slot="nav-right" class="placeholder"></div> -->
      <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow=true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 弹出层,频道编辑 -->
    <van-popup
      class="edit-channel-popup"
      v-model="isChannelEditShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      style="height:100%"
    >
      <!-- 编辑组件 -->
      <channel-edit
        :user-channels="channels"
        :active-index.sync="active"
        @close-popup="isChannelEditShow = false"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
// 导入子组件
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  // 组件名称
  name: 'home',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
    ArticleList,
    ChannelEdit
  },
  // 组件状态值
  data () {
    return {
      // 当前选中的tab栏
      active: 0,
      // 用户频道列表
      channels: [],
      // 控制弹出层的显示隐藏
      isChannelEditShow: false
    }
  },
  // 计算属性
  computed: {
    ...mapState(['user'])
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // 获取频道
    async loadChannels () {
      // try {
      //   var { data } = await getUserChannels()
      //   console.log(data)
      //   this.channels = data.data.channels
      // } catch (err) {
      //   this.$toast.fail('获取频道失败')
      // }

      try {
        if (this.user) {
          // 用户登录了,获取线上的频道列表数据
          const { data } = await getUserChannels()
          this.channels = data.data.channels
        } else {
          // 用户未登录
          var localChannels = getItem('channels')
          if (localChannels) {
            // 本地有存储
            this.channels = localChannels
          } else {
            // 本地没有存贮,获取推荐.服务器会根据token返回不同的数据
            const { data } = await getUserChannels()
            this.channels = data.data.channels
          }
        }
      } catch (err) {
        this.$toast.fail('获取失败')
        console.log(err)
      }
    },
    goSearch () {
      this.$router.push('/search')
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created () {
    this.loadChannels()
  },
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted () {}
}
</script>

<style scoped lang="less">
// 搜索模块
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }

  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
  }
}

// 标签导航
// scoped中不能给子组件设置样式，需要添加/deep/
/deep/.channel-tabs {
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    right: 0;
    left: 0;
    height: 82px;
    z-index: 1;
    padding-right: 66px;
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 31px !important;
      bottom: 8px;
      height: 6px;
      background-color: pink;
    }
    // .placeholder {
    //   flex-shrink: 0; //此元素不参与flex的
    //   width: 66px;
    //   height: 82px;
    // }
    // 汉堡按钮
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      // background-color: #fff;
      // opacity: 0.8;
      // 使用rgba，子元素不受影响
      background-color: rgba(255, 255, 255,.8);
      i.toutiao {
        font-size: 33px;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        width: 2px;
        height: 58px;
        background: url("~@/assets/gradient-gray-line.png");
        background-size: contain;
      }
    }
  }
}
/deep/.van-list {
  height: 80vh;
  overflow-y: auto;
}
// 弹出层样式
.edit-channel-popup {
  padding-top: 100px;
  box-sizing: border-box;
}
</style>
