<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell title="我的频道" :border="false">
      <van-button
        type="danger"
        round
        size="mini"
        plain
        @click="isEditShow=!isEditShow"
      >{{isEditShow ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <!-- 宫格布局-->
    <van-grid :gutter="10" clickable>
      <van-grid-item
        class="channel-item"
        v-for="(item,index) in userChannels"
        :key="item.id"
        @click="onUserChannelClick(item,index)"
      >
        <div class="text-wrap">
          <span :class="{active: index === activeIndex}">{{item.name}}</span>
        </div>
        <!-- 添加删除图标 -->
        <van-icon class="clear-icon" name="clear" v-show="isEditShow" />
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="频道推荐" :border="false" />
    <!-- 宫格布局-->
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="item in recommendChannels"
        :key="item.id"
        @click="addChannel(item)"
      >
        <div slot="text" class="text-wrap">
          <span>{{item.name}}</span>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
// 导入获取所有频道接口
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel'
// 导入vuex
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  // 组件名称
  name: 'ChannelEdit',
  // 组件参数 接收来自父组件的数据
  props: {
    'user-channels': {
      type: Array,
      required: true
    },
    // 当前激活的tab栏索引
    activeIndex: {
      type: Number,
      required: true
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
      // 所有频道列表
      allChannels: [],
      // 控制编辑状态
      isEditShow: false
    }
  },
  // 计算属性
  computed: {
    recommendChannels () {
      return this.allChannels.filter(item => {
        return (
          this.userChannels.findIndex(userItem => {
            return userItem.id === item.id
          }) === -1
        )
      })
    },
    // 获取user
    ...mapState(['user'])
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // 加载所有的频道
    async loadChannels () {
      try {
        const { data } = await getAllChannels()
        console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取频道失败')
      }
    },
    // 添加频道
    async addChannel (item) {
      try {
        this.userChannels.push(item)
        if (this.user) {
          // 用户登录了
          await addUserChannel([
            {
              id: item.id,
              // 频道的序号,我的频道的数组长度
              seq: this.userChannels.length
            }
          ])
        } else {
          // 用户没登录，存储到本地
          setItem('channels', this.userChannels)
        }
      } catch (err) {
        this.$toast.fail('添加失败')
      }
    },
    // 切换频道
    onUserChannelClick (item, index) {
      if (this.isEditShow) {
        // 编辑状态 删除操作
        if (this.user) {
          // 登录
          try {
            if (item.name === '推荐') return
            this.userChannels.splice(index, 1)
            deleteUserChannel(item.id)
          } catch (err) {
            this.$toast.fail('删除失败')
          }
        } else {
          setItem('channles', this.userChannels)
        }
      } else {
        // 完成状态，切换频道
        this.$emit('update:active-index', index)
        this.$emit('close-popup')
      }
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
.channel-item {
  height: 86px;
  /deep/.van-grid-item__content {
    background-color: #f5f5f6;
    .van-grid-item__text {
      color: #222;
      font-size: 28px;
    }
  }
}
// 编辑按钮
.van-button--mini {
  padding: 0 20px;
}
.text-wrap {
  font-size: 28px;
  color: #222;
}

// 删除图标样式
.clear-icon {
  position: absolute;
  right: -10px;
  top: -10px;
  color: #cacaca;
  font-size: 36px;
}
.active {
  color: red;
}
</style>
