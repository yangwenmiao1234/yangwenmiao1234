<template>
    <div class="body">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="任务单" name="first">
      <div class="header"> 
                <span style="font-size:15px;margin-left:%;margin-top:1%" class="demonstration">开盘时间:</span>
                <el-date-picker
                style="margin-top:0.5%;margin-left:1%"
                size="small"
                  v-model="value2"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right">
                </el-date-picker>
                <el-form :inline="true" style="margin-top:0.3%;margin-left:1%"  :model="goncheng" class="demo-form-inline">
              <el-form-item label="工程名称:">
                <el-input  style="width:150px;height:80px;" size="small" v-model="goncheng.name" placeholder="工程名称"></el-input>
            </el-form-item>
            </el-form>
            <div class="button">
                <el-button size="small" style="width:80px;margin-left:80%" type="primary" plain>刷新</el-button>
            </div>
        </div>
        <div class="table">
                <Scd>
                </Scd>
        </div>
    </el-tab-pane>
    <el-tab-pane label="累计数" name="second">
      <div class="tab2">
             <div class="button2" style="margin-top:2.5%;margin-left:10%">
               <p style="">
        修改累计车次与累计方量之后请记得保存
      </p>
                <el-button size="small" style="width:80px;margin-left:0%" type="primary" plain>添加</el-button>
                <el-button size="small" style="width:80px;margin-left:5%" type="primary" plain>默认语音</el-button>
                <el-button size="small" style="width:80px;margin-left:5%" type="primary" plain>自定语音</el-button>
                 <div style="margin-top:3%">
                   <el-button size="small" style="width:80px;margin-left:0%" type="primary" plain>向上</el-button>
                <el-button size="small" style="width:80px;margin-left:5%" type="primary" plain>向下</el-button>
                 <el-button size="small" style="width:80px;margin-left:5%" type="primary" plain>优先</el-button>
                 </div>
                 <div>
                    <el-form :inline="true" style="margin-top:5%;margin-left:1%"  :model="leijiform2" class="demo-form-inline">
              <el-form-item label="累计数:">
                <el-input  style="width:223px;height:80px;" size="small" v-model="leijiform2.name" placeholder="累计数"></el-input>
            </el-form-item>
            </el-form>
                 </div>
            </div>
                <el-table
        :header-cell-style="{  background: 'rgba(249, 182, 3, 0.67)', color: '#606266' }"
        :data="leijitable"
        border
        :cell-style="rowClass"
        style="width: 60%;height:250px;margin-left:-10%"
      >
        <el-table-column fixed="left" label="序号" width="70px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="cumulative" label="累计方量" width="">
        </el-table-column>
        <el-table-column prop="production" label="生产线" width="">
        </el-table-column>
        <el-table-column prop="trains" label="累计车次" width="">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              style="color: rgb(0 0 0 / 67%)"
              type="text"
              size="small"
              @click="editorClick(scope.row), (leijidialog = true)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      </div>
       <el-dialog
       v-dialogDrag
      title="编辑"
      :visible.sync="leijidialog"
      :before-close="handleClose"
    >
      <el-form
        :label-position="editorlabel"
        label-width="80px"
        :model="leijiform"
      >
        <el-form-item label="累计方量">
          <el-input v-model="leijiform.cumulative"></el-input>
        </el-form-item>
        <el-form-item label="生产线">
          <el-input v-model="leijiform.production"></el-input>
        </el-form-item>
        <el-form-item label="累计车次">
          <el-input v-model="leijiform.trains"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
      <div class="table2">
        <Ljs>
      </Ljs>
      </div>
    </el-tab-pane>
    <el-tab-pane label="发货单" name="three">
        <Fhd>
        </Fhd>
    </el-tab-pane>
  </el-tabs>
    </div>
</template>
<script>
import Vue from 'vue'
import Scd from '@/components/table/shengchandan.vue'
import Ljs from '@/components/table/leijishu.vue'
import Fhd from '@/components/fahuodan/fahuodan.vue'
export default({
  components:{ Scd ,Ljs , Fhd},
    data(){
        return{
          leijidialog:false,
          leijiform:{
            cumulative:'',
            production:'',
            trains:''
          },
           leijiform2:{
            name:'',
          },
          leijitable:[{
            cumulative:'1',
            production:'1',
            trains:'1'
          }],
             goncheng:{
          name:'',
      },
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
        activeName: 'first',
        }
    },
     methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      rowClass() {
      return "text-align:center";
    },
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
.button{
    margin-top:0.6%
}
.button2{
    /* margin-top:0% */
    width: 45%;
}
.table{
  margin-top: -3%;
}
.table2{
  margin-top: -3%;
}
.tab2{
  display: flex;
}
.span{
  margin-top: 3%;
  margin-left: 3.2%;
}
</style>