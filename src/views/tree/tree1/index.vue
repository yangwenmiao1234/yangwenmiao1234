<template>
  <div class="body">
    <!-- 生产线页面 -->
    <div class="from">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="公司编号:">
          <el-input
            v-model="formInline.bianhao"
            placeholder="公司编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="公司全称:">
          <el-input v-model="formInline.name" placeholder="公司全称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="
              margin-left: 116%;
              width: 120px;
              background-color: orange;
              border: 2px solid rgb(0 0 0 / 67%);
            "
            @click="onSubmit"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <Scx></Scx>
    </div>
  </div>
</template>

<script>
import Scx from "@/components/table/shengchanxian.vue";
export default {
  components: { Scx },
  data() {
    return {
      formInline: {
        bianhao: "",
        name: "",
      },
    };
  },
};
</script>
<style  scoped>
.body{
  padding: 0px;
}
/deep/.el-input__inner {
  background-color: #f7f0dcab;
  border-color: rgb(0 0 0 / 67%);
}
.table{
  margin-top:2%;
}
</style>