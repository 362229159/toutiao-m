<template>
  <div id="app">
    <div id="nav">
      <!-- 按钮 -->
      <van-button type="default">默认按钮</van-button>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
      <!-- 图标 -->
      <van-icon name="chat-o" badge="99+" size="3rem"/>
      <h4>呵呵</h4>
      <h1>呵呵</h1>
      <i class="toutiao toutiao-shouye"></i>
      <i class="toutiao toutiao-dianzan"></i>
    </div>
    <router-view />
  </div>
</template>

<style lang="less" scoped>
</style>
