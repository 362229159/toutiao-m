<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />

    <!-- 表单 -->
    <van-form @submit="onSubmit" autocomplete="off">
      <!-- <van-cell-group> -->
      <van-field
        placeholder="请输入手机号"
        name="用户名"
        v-model="user.mobile"
        clearable
        :rules="userFormRules.mobile"
      >
        <!-- 通过插槽处理自定义图标 -->
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field placeholder="请输入短信验证码" name="验证码" v-model="user.code" :rules="userFormRules.code">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!-- 新版本插槽的写法 -->
          <van-button class="send-sms-btn" round size="small" type="default">发送验证码</van-button>
        </template>
      </van-field>
      <!-- </van-cell-group> -->
      <!-- 按钮 -->
      <div class="login-btn-wrap">
        <van-button type="info" block form-type="submit" class="login-btn">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  // 组件名称
  name: 'login',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
      // 登录信息对象
      user: {
        mobile: '',
        code: ''
      },
      // 登录验证规则
      userFormRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|19[8])[0-9]{8}$/,
            message: '请输入正确格式'
          }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
        ]
      }
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // 提交表单，登录
    async onSubmit () {
      // 转圈加载
      this.$toast.loading({
        message: '登录...',
        // 持续时间，默认两秒。写0就是登录成功或失败结束
        duration: 0,
        forbidClick: true
      })
      // 获取表单数据
      const user = this.user

      // 发送请求
      try {
        const res = await login(user)
        // 登录成功
        console.log(res)
        this.$toast.success('登录成功')
      } catch (err) {
        // 登录失败
        this.$toast.fail('手机号或验证码不正确')
      }
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created () {
    console.log(this)
  },
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted () {}
}
</script>

<style scoped lang="less">
.toutiao {
  font-size: 37px;
}
.send-sms-btn {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 16px;
  color: #666666;
  padding: 0;
}
.login-btn-wrap {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }
}
</style>
