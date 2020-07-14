<template>
  <div class="article-container">
    <!-- 头部区域,导航栏 -->
    <van-nav-bar title="俗人头条" left-arrow @click-left="$router.back()" />

    <!-- 中间主体 -->
    <div class="main-wrap">
      <!-- 加载中提示 -->
      <van-loading class="loading-wrap" type="spinner" vertical color="#3296fa" v-if="isLoading">加载中</van-loading>

      <!-- 加载完成 -->
      <div class="article-detail" v-else-if="article.pubdate">
        <!-- 文章标题 -->
        <h4 class="article-title">{{article.title}}</h4>
        <!-- 用户信息 -->
        <van-cell class="user-info" center>
          <!-- 头像 -->
          <van-image class="avatar" slot="icon" fit="cover" round :src="article.aut_photo" />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate|relativeTime}}</div>
          <!-- 按钮 -->
          <van-button
            class="follow-btn"
            icon="plus"
            type="info"
            size="mini"
            round
            color="#3296fa"
          >关注</van-button>
        </van-cell>

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content" ref="contentRef"></div>
        <!-- 分割线 -->
        <van-divider>正文结束</van-divider>
      </div>

      <!-- 加载失败，404，显示内容 -->
      <div class="error-wrap" v-else-if="errorStatus === 404">
        <van-icon name="fail" />
        <p class="text">该资源不存在或已删除！</p>
      </div>

      <!-- 加载失败，网络错误，显示内容 -->
      <div class="error-wrap" v-else>
        <van-icon name="fail" />
        <p class="text">网络错误！</p>
        <van-button type="default" class="retry-btn" @click="loadArticle">点击重新加载</van-button>
      </div>
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button round type="default" class="comment-btn" size="small">写评论</van-button>
      <van-icon name="comment-o" badge="9" />
      <van-icon name="star-o" />
      <van-icon name="good-job-o" />
      <van-icon name="share" />
    </div>
  </div>
</template>

<script>
// 导入接口
import { getArticleById } from '@/api/article'
// 导入图片预览
import { ImagePreview } from 'vant'

export default {
  // 组件名称
  name: 'ArticleIndex',
  // 组件参数 接收来自父组件的数据
  // props: {
  //   articleId: {
  //     type: [String, Number, Object],
  //     required: true
  //   }
  // },
  props: ['articleId'],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data () {
    return {
      // 控制加载提示的显示隐藏
      isLoading: true,
      // 文章详情
      article: {},
      // 失败的状态码
      errorStatus: 0
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // 获取文章详情
    async loadArticle () {
      // 先显示loading
      this.isLoading = true
      try {
        const { data } = await getArticleById(this.articleId)

        // 随机扔出错误
        if (Math.random() > 0.5) {
          JSON.parse('suren')
        }

        setTimeout(() => {
          this.previewImage()
        }, 10)

        console.log(data)
        this.article = data.data
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errorStatus = 404
        }
      }
      // 成功或者失败，都让loading消失
      this.isLoading = false
    },
    // 获取图片地址
    previewImage () {
      const articlecontent = this.$refs.contentRef
      // 所有图片的节点数组
      var allImg = articlecontent.querySelectorAll('img')
      // 声明数组，接收图片的src地址
      var images = []
      allImg.forEach((item, index) => {
        images.push(item.src)
        // 给每个图片注册点击事件，
        item.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
      console.log(images)
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created () {
    this.loadArticle()
  },
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted () {}
}
</script>

<style scoped lang="less">
// 导入样式
@import "./github-markdown.css";

// 导航
.van-nav-bar {
  background-color: #3296fa;
  /deep/.van-nav-bar__title {
    color: #fff;
  }
  /deep/ .van-icon {
    color: #fff;
  }
}

// 加载提示
.loading-wrap {
  padding: 200px 32px;
  background-color: #fff;
}

// 中间主体盒子
.main-wrap {
  position: absolute;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  background-color: #fff;
}

// 文章标题
.article-title {
  font-size: 40px;
  padding: 50px 32px;
  margin: 0;
  color: #3a3a3a;
}
// 用户信息
.user-info {
  padding: 0 32px;
  .avatar {
    width: 70px;
    height: 70px;
    margin-right: 17px;
  }
  .van-cell__label {
    margin-top: 0;
  }
  .user-name {
    font-size: 24px;
    color: #3a3a3a;
  }
  .publish-date {
    font-size: 23px;
    color: #b7b7b7;
  }
  .follow-btn {
    width: 170px;
    height: 58px;
  }
}
// 文章内容
.article-content {
  padding: 55px 32px;
  font-size: 16px;
}

// 失败的内容
.error-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 200px 32px;
  background-color: #fff;
  .van-icon {
    font-size: 122px;
    color: #b4b4b4;
  }
  .text {
    font-size: 30px;
    color: #666666;
    margin: 33px 0px 46px;
  }
  .retry-btn {
    width: 280px;
    height: 70px;
    line-height: 70px;
    font-size: 30px;
    color: #666666;
    border: 1px solid #c3c3c3;
  }
}

// 底部区域
.article-bottom {
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  left: 0;
  right: 0;
  height: 82px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 282px;
    height: 46px;
    border: 2px solid #eeeeee;
    font-size: 30px;
    line-height: 46px;
    color: #a7a7a7;
  }
  .van-icon {
    font-size: 40px;
    color: #777777;
    .van-info {
      font-size: 16px;
      background-color: #e22829;
    }
  }
}

.article-detail {
  background-color: #fff;
}
</style>
