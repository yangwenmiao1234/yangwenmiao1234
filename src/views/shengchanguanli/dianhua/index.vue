<template>
  <div class="body">
    <div class="header">
      <span
        style="font-size: 15px; margin-left: %; margin-top: 1%"
        class="demonstration"
        >开盘时间:</span
      >
      <el-date-picker
        style="margin-top: 0.5%; margin-left: 1%"
        size="small"
        v-model="value2"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      >
      </el-date-picker>
      <el-form
        :inline="true"
        style="margin-top: 0.2%; margin-left: 1%"
        :model="goncheng"
        class="demo-form-inline"
      >
        <el-form-item label="工程名称:">
          <el-input
            style="width: 150px; height: 80px"
            size="small"
            v-model="goncheng.name"
            placeholder="工程名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="button" style="margin-top:0.45%;display:flex;">
        <el-button
          size="small"
          style="width: 80px; margin-left:3%;height:33px"
          type="primary"
          plain
          >刷新</el-button
        >
        <el-button
          size="small"
          style="width: 80px; margin-left:3%;height:33px"
          type="primary"
          plain
          >导出数据</el-button
        >
        <el-button
          size="small"
          style="width: 80px; margin-left:3%;height:33px"
          type="primary"
          plain
          >导出语音</el-button
        >
      </div>
    </div>
    <div style="display:flex;margin-top:-3%;">
        <el-form
        :inline="true"
        style="margin-top: 0.2%;"
        :model="goncheng"
        class="demo-form-inline"
      >
        <el-form-item label="电话号码:">
          <el-input
            style="width: 158px; height: 80px;margin-left:5.5%"
            size="small"
            v-model="goncheng.name"
            placeholder="电话号码"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="button" style="margin-top:0.45%;display:flex;">
        <el-button
          size="small"
          style="width: 80px; margin-left:3%;height:33px"
          type="primary"
          plain
          >播放</el-button
        >
        <el-button
          size="small"
          style="width: 80px; margin-left:3%;height:33px"
          type="primary"
          plain
          >暂停</el-button
        >
        <el-button
          size="small"
          style="width: 80px; margin-left:3%;height:33px"
          type="primary"
          plain
          >结束</el-button
        >
      </div>
    </div>
    <div class="table">
      <Dh>
      </Dh>
    </div>
  </div>
</template>
<script>
import Dh from '@/components/table/dianhua.vue'
export default({
    components : { Dh},
    data(){
        return{
           pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: '',
            goncheng:{
                name:'',
            }
        }
    }
})
</script>
<style scoped>
.body{
    padding: 25px;
}
.header{
    display: flex;
}
</style>