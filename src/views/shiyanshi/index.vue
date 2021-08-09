<template>
  <div style="padding: 0px; background-color: #ffffff">
    <el-alert :closable="false" title="">
      <router-view />
    </el-alert>
  </div>
</template>
<style scoped>
.el-alert--info.is-light {
  background-color: #ffffff;
  color: #ffffff;
}
</style>