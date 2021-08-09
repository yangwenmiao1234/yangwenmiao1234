<template>
    <div class="body">
        <div class="header" style="display:flex">
            <span
        style="font-size: 13px; margin-left: %; margin-top: 0.8%"
        class="demonstration"
        >开盘时间:</span
      >
      <el-date-picker
        style="margin-top: 0%; margin-left:1%;"
        v-model="value2"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      >
      </el-date-picker>
      <span style="margin-top: 0.6%; margin-left: 2%">生产线：</span>
      <el-select   v-model="value3" placeholder="请选择">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button size="small" @click="add(),adddialog=true" style="width:80px;margin-left:3%;margin-top:0%" type="primary" plain>查询</el-button>
        </div>
        <div style="header2;display:flex">
            <el-form :inline="true" style="margin-top:2%;margin-left:0%;"  :model="goncheng" class="demo-form-inline">
              <el-form-item label="工程名称:" style="">
                <el-input  style="width:150px;height:25px;" v-model="goncheng.name" placeholder="工程名称"></el-input>
            </el-form-item>
            </el-form>
            <span style="margin-top:2.5%; margin-left: 2%; font-size:13px">车号：</span>
      <el-select style="margin-top:1.8%;" v-model="value4" placeholder="请选择">
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
        </div>
        <div style="margin-top:2%;height:250px">
            <ATable>
            </ATable>
        </div>
        <div v-if="table" style="margin-top:2%">
            <Btable>
            </Btable>
        </div>
    </div>
</template>
<script>
import ATable from '@/views/shiyanshi/lishi/atable.vue'
import Btable from '@/views/shiyanshi/lishi/btable.vue'
  export default {
components: {ATable, Btable},
    data() {
      return {
          table:true,
          ertable:false,
          santable:false,
          radio:'1',
          radio:'3',
          checked:false,
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
        options3: [
        {
          value: "选项1",
          label: "一号线",
        },
        {
          value: "选项2",
          label: "二号线",
        },
        {
          value: "选项3",
          label: "三号线",
        },
      ],
      value3: "",
      options4: [
        {
          value: "选项1",
          label: "C25",
        },
        {
          value: "选项2",
          label: "C35",
        },
        {
          value: "选项3",
          label: "C15",
        },
      ],
      value4: "",
      goncheng:{
          name:'',
          number:'',
      }
      };
    },
    methods:{
        setup(){
        }
    }
  };
</script>

<style scoped>
.body{
  padding: 25px;
}
.el-input--small .el-input__inner {
    height: 120px;
    /* line-height: 2rem; */
}
</style>