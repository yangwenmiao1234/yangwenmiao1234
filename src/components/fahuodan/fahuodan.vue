<template>
  <div class="body">
    <div class="radio" style="display:flex;margin-left:0%">
      <span>是否签收</span>
     <div style="margin-left:1.5%">
          <el-radio-group  v-model="radio">
        <el-radio  :label="1">全部</el-radio>
        <el-radio style="margin-left:-8%" :label="2">未签收</el-radio>
        <el-radio style="margin-left:-8%" :label="3">已签收</el-radio>
      </el-radio-group>
     </div>
    <div style="display:flex;margin-left:%">
     <span style="width:73px">是否手工</span>
     <div style="margin-left:1.5%">
          <el-radio-group  v-model="radio2">
        <el-radio  :label="1">全部</el-radio>
        <el-radio style="margin-left:-8%" :label="2">手工单</el-radio>
        <el-radio style="margin-left:-8%" :label="3">自动单</el-radio>
      </el-radio-group>
     </div>
    </div>
    <div style="display:flex;margin-left:%">
     <span style="width:73px">是否作废</span>
     <div style="margin-left:1.5%">
          <el-radio-group  v-model="radio3">
        <el-radio  :label="1">全部</el-radio>
        <el-radio style="margin-left:-8%" :label="2">正常单</el-radio>
        <el-radio style="margin-left:-8%" :label="3">作废单</el-radio>
      </el-radio-group>
     </div>
    </div>
    <span style="width:73px">是否对账</span>
    <el-radio-group  v-model="radio4">
        <el-radio  :label="1">全部</el-radio>
        <el-radio style="margin-left:-8.5%" :label="2">未对账</el-radio>
        <el-radio style="margin-left:-7.9%" :label="3">已对账</el-radio>
      </el-radio-group>
    </div>
    <div style="margin-left:%;display:flex;margin-top:2%">
<div style="height:20px;display:flex">
     <el-button size="small" style="width:80px;margin-left:%;margin-top:-3%" type="primary" plain>手工单</el-button>
       <el-button size="small" style="width:80px;margin-left:3%;margin-top:-3%" type="primary" plain>作废</el-button>
    <p style="width:100px ; margin-top:-1%;margin-left:5%">对账审核</p>
        <el-button size="small" style="width:80px;margin-left:-4%;margin-top:-3%" type="primary" plain>未对账</el-button>
       <el-button size="small" style="width:80px;margin-left:3%;margin-top:-3%" type="primary" plain>已对账</el-button>
</div>
    <div style="display:flex;">
        <p style="width:100px ; margin-top:-0.5%;margin-left:2%">票单打印</p>
        <div style="margin-top:-1.5%;margin-left:%;display:flex;">
            <el-form size="small"  label-width="80px" :model="form">
          <el-form-item label="自动打印:">
           <el-input style="width:50px" v-model="form.int"></el-input>
          </el-form-item>
        </el-form>
          <el-select style="margin-left:3%;width:130px" size="small" v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
<div style="margin-left:3%;display:flex">
      <el-button size="small" style="height:33px;width:80px;margin-left:0%;margin-top:-0.5%" type="primary" plain>打印</el-button>
       <el-button size="small" style="height:33px;width:80px;margin-left:3%;margin-top:-0.5%" type="primary" plain>预览</el-button>
         <el-button size="small" style="height:33px;width:80px;margin-left:3%;margin-top:-0.5%" type="primary" plain>配料单</el-button>
       <el-checkbox style="margin-top:1.5%;margin-left:2.5%" v-model="checked">显示页面</el-checkbox>
<el-form style="margin-left:5%" size="small"  label-width="0" :model="form2">
          <el-form-item label="">
           <el-input style="width:120px;margin-left:-10%" placeholder="哈哈哈哈" v-model="form2.int"></el-input>
          </el-form-item>
        </el-form>
</div>
        </div>
    </div>
    </div>
          <div class="header" style="display:flex;margin-top:%"> 
                <span style="font-size:15px;margin-left:%;margin-top:0.4%" class="demonstration">开盘时间:</span>
                <el-date-picker
                style="margin-top:%;margin-left:1%;width:303px"
                size="small"
                  v-model="value2"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right">
                </el-date-picker>
                <el-form :inline="true" style="margin-top:-0.2%;margin-left:1%"  :model="goncheng" class="demo-form-inline">
              <el-form-item label="工程名称:">
                <el-input  style="width:150px;height:80px;" size="small" v-model="goncheng.name" placeholder="工程名称"></el-input>
            </el-form-item>
            </el-form>
            <span style="margin-top:0.5%">
              生产线:
            </span>
            <el-select style="margin-left:1%;width:100px;margin-top:%" size="small" v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <span style="margin-top:0.5%;margin-left:1%">
              车号:
            </span>
  <el-select style="margin-left:1%;width:100px;margin-top:%" size="small" v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
     <div class="button" style="margin-top:-3%;margin-left:%;display:flex;">
         <el-button size="small" style="width:80px;margin-left:0%" type="primary" plain>刷新</el-button>
         <el-button size="small" style="width:80px;margin-left:3%" type="primary" plain>导出</el-button>
         <el-button size="small" style="width:100px;margin-left:3%" type="primary" plain>扫码复位</el-button>
         <el-button size="small" style="width:100px;margin-left:3%" type="primary" plain>作废单复原</el-button>
    </div>
    <div class="table" style="margin-left:-2.2%;margin-top:2%">
          <Fhd>
          </Fhd>
    </div>
  </div>
</template>
<script>
import Fhd from '@/components/fahuodan/index.vue'
  export default {
      components:{ Fhd},
    data () {
      return {
          form:{
              int:'',
          },
          form2:{
              int:'',
          },
          goncheng:{
              name:'',
          },
        radio: 1,
        radio2: 1,
        radio3: 1,
        radio4: 1,
         options: [{
          value: '选项1',
          label: '默认模板'
        }, {
          value: '选项2',
          label: '你还想要什么模板'
        }, {
          value: '选项3',
          label: '只有默认模板'
        },],
        value: '',
        checked:true,
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
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: '',
      };
    },
  }
</script>