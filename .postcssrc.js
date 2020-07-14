module.exports = {
  // 配置要使用的 PostCSS 插件
  plugins: {
    // 配置使用 autoprefixer 插件
    // 作用：生成浏览器 CSS 样式规则前缀

    // autoprefixer 插件在用vue-cli搭建的时候，就已经配置了
    // autoprefixer: {
    //   // autoprefixer 插件的配置
    //   // 配置要兼容到的环境信息
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    // 配置使用 postcss-pxtorem 插件
    // 作用：把 px 转为 rem

    'postcss-pxtorem': {
      //   rootValue: 75,
      // postcss-pxtorem处理每个css文件的时候，都会调用rootValue这个函数，他会把该css文件的信息传递给该函数。其中file属性里存放着该css文件的路径
      rootValue ({ file }) {
        // console.log('俗人' + file);
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的 CSS 属性
      // * 表示所有
      propList: ['*'],
      exclude: 'github-markdown'
    }
  }
}
