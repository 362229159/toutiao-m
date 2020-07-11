<template>
  <div class="my-container">
    <!-- 头部区域 -->
    <div class="hearder">
      <!-- 登录头部 -->
      <div class="hearder user-info" v-if="user">
        <!-- 基本信息模块 -->
        <div class="base-info">
          <div class="left">
            <van-image class="avatar" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <span class="name">俗人</span>
          </div>
          <div class="right">
            <van-button round size="mini" class="text">编辑资料</van-button>
          </div>
        </div>
        <!-- 状态 -->
        <div class="data-stats">
          <div class="data-item">
            <span class="count">8</span>
            <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">8</span>
            <span class="text">关注</span>
          </div>
          <div class="data-item">
            <span class="count">8</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">8</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>
      <!-- 未登录头部 -->
      <div class="not-login" v-else>
        <div class="login-btn">
          <img src="~@/assets/mobile.png" class="mobile-img" />
          <span class="text" @click="goLogin">登录 / 注册</span>
        </div>
      </div>
    </div>
    <!-- 宫格区域 -->
    <van-grid :column-num="2" clickable class="grid-nav">
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 列表信息 -->
    <van-cell-group class="cell-list">
      <van-cell title="消息通知" is-link />
      <van-cell title="小爱同学" is-link />
    </van-cell-group>

    <!-- 退出按钮，只有登录才显示 -->
    <van-button type="default" block v-if="user" class="logout-cell" @click="logout">退出登录</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  // 组件名称
  name: 'my',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {}
  },
  // 计算属性
  computed: {
    // 映射user
    ...mapState(['user'])
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    goLogin () {
      this.$router.push('/login')
    },
    // 退出登录
    logout () {
      this.$dialog
        .confirm({
          message: '确认退出吗？'
        })
        .then(() => {
          // 退出,清除登录状态
          this.$store.commit('setUser', null)
          this.$router.push('/login')
        })
        .catch(() => {
          console.log('取消退出')
        })
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
.hearder {
  height: 361px;
  background: url("~@/assets/banner.png") no-repeat;
  background-size: cover;
}
// 未登录盒子
.not-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .login-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .mobile-img {
      width: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #ffffff;
    }
  }
}

// 登录盒子
.base-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 231px;
  padding: 76px 32px 23px;
  box-sizing: border-box;
  .left {
    display: flex;
    align-items: center;
    .avatar {
      width: 132px;
      height: 132px;
      margin-right: 23px;
      border: 4px solid #fff;
    }
    .name {
      font-size: 30px;
      color: #fff;
    }
  }
  .right {
    .text {
      padding: 0 15px;
    }
  }
}
.data-stats {
  display: flex;
  .data-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 130px;
    color: #fff;
    .count {
      font-size: 36px;
    }
    .text {
      font-size: 23px;
    }
  }
}

// 宫格区域
.grid-nav {
  .grid-item {
    i.toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    span.text {
      font-size: 28px;
    }
  }
}

// 列表区域
.cell-list {
  margin: 15px 0;
}

// 退出登录按钮
.logout-cell {
  color: pink;
}
</style>
