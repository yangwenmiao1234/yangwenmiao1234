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
      <span style="margin-top: 0.6%; margin-left: 2%">混凝土强度：</span>
      <el-select   v-model="value3" placeholder="请选择">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button size="small" @click="add(),adddialog=true" style="width:80px;margin-left:3%;margin-top:0%" type="primary" plain>刷新</el-button>
        <el-checkbox style="margin-top:0.8%;margin-left:1%" v-model="checked">任务提示</el-checkbox>
        <el-radio style="margin-top:0.8%" v-model="radio" label="1">未绑定配方</el-radio>
  <el-radio style="margin-top:0.8%" v-model="radio" label="2">已绑定配方</el-radio>
        </div>
        <div style="display:flex;">
            <el-form :inline="true" style="margin-top:1.8%;margin-left:0%;"  :model="goncheng" class="demo-form-inline">
              <el-form-item label="工程名称:" style="">
                <el-input  style="width:150px;height:25px;" v-model="goncheng.name" placeholder="工程名称"></el-input>
            </el-form-item>
            </el-form>
            <span style="margin-top:2.5%; margin-left: 2%; font-size:13px">砂浆强度：</span>
      <el-select style="margin-top:1.8%;" v-model="value4" placeholder="请选择">
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
     <div style="margin-top:1.8%;margin-left:1%">
        <el-button  @click="add(),adddialog=true" style="width:80px;margin-left:3%;margin-top:0%" type="primary" plain>刷新</el-button>
     </div>
        </div>
        <div style="margin-top:2%;height:250px">
            <Table>
            </Table>
        </div>
        <div style="display:flex">
            <span style="margin-top:2.5%; margin-left:0%; font-size:13px">生产线：</span>
      <el-select @change="setup()" style="margin-top:1.8%;width:120px" v-model="value5" placeholder="请选择">
        <el-option
          v-for="item in options5"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-radio style="margin-top:2.5%; margin-left:1%" v-model="radio" label="3">数据模式</el-radio>
  <el-radio style="margin-top:2.5%" v-model="radio" label="4">视频模式</el-radio>
  <span style="margin-top:2.5%; margin-left:0%; font-size:13px">表头类型：</span>
      <el-select style="margin-top:1.8%;width:120px" v-model="value6" placeholder="请选择">
        <el-option
          v-for="item in options6"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span style="margin-top:2.5%; margin-left:1%; font-size:13px">报警提示：</span>
      <el-select  style="margin-top:1.8%;width:120px" v-model="value7" placeholder="请选择">
        <el-option
          v-for="item in options7"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-form :inline="true" style="margin-top:1.8%;margin-left:1%;"  :model="goncheng" class="demo-form-inline">
              <el-form-item label="报警值:" style="">
                <el-input  style="width:150px;height:25px;" v-model="goncheng.number" placeholder="工程名称"></el-input>
            </el-form-item>
            </el-form>
            <div style="margin-top:1.8%">
              <el-button  @click="add(),adddialog=true"  type="primary" plain>确定</el-button>
            </div>
        </div>
        <div v-if="table" style="margin-top:2%">
            <Yihaoxian>
            </Yihaoxian>
        </div>
        <div v-if="ertable" style="margin-top:2%">
            <Erhaoxian>
            </Erhaoxian>
        </div>
        <div v-if="santable" style="margin-top:2%">
            <Sanhaoxian>
            </Sanhaoxian>
        </div>
    </div>
</template>
<script>
import Table from '@/views/shiyanshi/bangding/renwudan.vue'
import Yihaoxian from '@/views/shiyanshi/bangding/yihaoxiantable.vue'
import Erhaoxian from '@/views/shiyanshi/bangding/erhaoxiantable.vue'
import Sanhaoxian from '@/views/shiyanshi/bangding/sanhaoxiantable.vue'
  export default {
components: { Table , Yihaoxian , Erhaoxian , Sanhaoxian},
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
      options5: [
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
      value5: "",
      options6: [
        {
          value: "选项1",
          label: "料仓简称",
        },
        {
          value: "选项2",
          label: "原料名称",
        },
      ],
      value6: "",
      options7: [
        {
          value: "选项1",
          label: "绝对误差",
        },
        {
          value: "选项2",
          label: "相对误差",
        },
      ],
      value7: "",
      goncheng:{
          name:'',
          number:'',
      }
      };
    },
    methods:{
        setup(){
            if(this.value5==='选项1'){
                this.ertable=false
                this.santable=false
                this.table=true
            }else if(this.value5==='选项2'){
                this.table=false
                this.santable=false
                this.ertable=true
            }else if(this.value5==='选项3'){
                this.table=false
                this.ertable=false
                this.santable=true
            }else{
                this.ertable=false
                this.santable=false
                this.table=true
            }
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