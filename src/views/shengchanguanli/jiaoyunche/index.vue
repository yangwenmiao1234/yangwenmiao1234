<template>
  <div class="body">
    <div>
      <el-radio-group v-model="radio">
        <el-radio @change="query_1()" :label="1">全部</el-radio>
        <el-radio @change="query0()" :label="2">空闲等待</el-radio>
        <el-radio @change="query1()" :label="3">送货途中</el-radio>
        <el-radio @change="query3()" :label="4">暂停运输</el-radio>
      </el-radio-group>
      <el-button size="small" style="width:80px;margin-left:45%" @click="adddialog=true" type="primary" plain>添加</el-button>
    </div>
    <div style="margin-top:3%" class="table">
        <Jyc ref="jiaoyunchexinxi" >
        </Jyc>
    </div>
    <div class="dialog">
        <el-dialog
        v-dialogDrag
          class="body_dialog"
          title="添加"
          :visible.sync="adddialog"
          width="45%"
          :before-close="handleClose">
         <div style="display:flex">
                  <el-form  :label-position="labelPosition" label-width="88px" :model="addform">
                <el-form-item label="车号：">
                  <el-input v-model="addform.ID"></el-input>
                </el-form-item>
                <el-form-item label="公司ID：">
                  <el-input v-model="addform.CompanyID"></el-input>
                </el-form-item>
                <el-form-item label="默认司机：">
                  <el-input v-model="addform.DriverName"></el-input>
                </el-form-item>
                <el-form-item label="容量(m³)：">
                  <el-input v-model="addform.CarSquareMax"></el-input>
                </el-form-item>
               <div class="dialog_div" style="">
                  <div class="block-1" style="display:flex">
                  <span class="demonstration">最近打料：</span>
                  <el-date-picker
                  class="block"
                    v-model="value1"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </div>
                <div class="block-2" style="display:flex">
                  <span style="" class="demonstration">最近交票：</span>
                  <el-date-picker
                  class="block"
                    v-model="value2"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions2">
                  </el-date-picker>
                </div>
                <div class="block-3" style="display:flex">
                  <span class="demonstration">最近刷卡：</span>
                  <el-date-picker
                  class="block"
                    v-model="value3"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions3">
                  </el-date-picker>
                </div>
               </div>
               </el-form>
           <div class="body-dialog-2">
              <el-form :label-position="labelPosition" label-width="90px" :model="addform">
                <el-form-item label="车牌：">
                  <el-input v-model="addform.CarOwner"></el-input>
                </el-form-item>
                <span class="body-span-1">车辆归属：</span>
                <el-select class="body-option-1" v-model="value" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-form-item class="body-form-2" label="皮重(kg)：">
                  <el-input v-model="addform.pWeightProject"></el-input>
                </el-form-item>
                <el-form-item label="特殊运输：">
                  <el-input v-model="addform.CarSpeed"></el-input>
                </el-form-item>
                <el-form :label-position="labelPosition" label-width="88px" :model="formLabelAlign">
                <el-form-item label="定位编号：">
                  <el-input v-model="addform.GPSCardID"></el-input>
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input v-model="addform.Remark"></el-input>
                </el-form-item>
              </el-form>  
              </el-form>  
           </div>
         </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="adddialog = false">取 消</el-button>
            <el-button type="primary" @click="adddialog = false , add()">确 定</el-button>
          </span>
        </el-dialog>
    </div>
  </div>
</template>
<script>
import Jyc from '@/components/table/jiaoyunchexinxi.vue'
import {querylistjyc , addjyc , deletesjyc , modifyjyc} from '@/api/user.js'
  export default {
      components : { Jyc },
    data () {
      return {
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        pickerOptions2: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value2: '',
        pickerOptions3: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value3: '',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        addform: {
          CompanyID:"",
          ID: "",
          CarOwner: "",
          DriverName: "",
          CarSquareMax: "",
          CarOwner: "",
          pWeightProject: "",
          CarSpeed: "",
          GPSCardID: "",
          Remark: "",
        },
        adddialog: false,
        radio: 1
      };
    },
    methods:{
      add() {
      const aa = this.$refs.jiaoyunchexinxi;
      addjyc(
        JSON.stringify({
          ActionUserName:this.value1,
          CompanyID:this.addform.CompanyID,
          ActionUserID:this.value3,
          ID:this.addform.ID,
          CarOwner:this.addform.CarOwner,
          DriverName:this.addform.DriverName,
          CarType :this.value,
          CarSquareMax:this.addform.CarSquareMax,
          PWeightProject:this.addform.pWeightProject,
          CarSpeed:this.addform.CarSpeed,
          GPSCardID:this.addform.GPSCardID,
          Remark:this.addform.Remark,
        })
      )
        .then((response) => {
          this.$message({
            message: "添加成功！",
            type: "success",
          });
          aa.querylist();
        })
        .catch((error) => {
          this.$message({
            message: "添加未成功，请联系管理员",
            type: "error",
          });
        });
    },
    query_1(){
      this.loading=true
        querylistjyc({
        page: this.page,
        StateFlag:'-1',
        intPageSize: this.size,
        Comid:localStorage.getItem('comid')
      })
        .then((response) => {
          this.tableData = response.data.data;
          this.page = response.data.page;
          this.size = response.data.PageSize;
          this.total = response.data.dataCount; 
          this.$message({
            type: "success",
            message: "查询成功",
          });
          this.loading = false;
        })
        .catch((error) => {
          this.loading = true;
          this.$message({
            type: "info",
            message: "查询失败，请联系管理员！",
          });
        });
    },
    query0(){
        this.loading=true
        querylistjyc({
        page: this.page,
        StateFlag:'0',
        intPageSize: this.size,
        Comid:localStorage.getItem('comid')
      })
        .then((response) => {
          this.tableData = response.data.data;
          this.page = response.data.page;
          this.size = response.data.PageSize;
          this.total = response.data.dataCount; 
          this.$message({
            type: "success",
            message: "查询成功",
          });
          this.loading = false;
        })
        .catch((error) => {
          this.loading = true;
          this.$message({
            type: "info",
            message: "查询失败，请联系管理员！",
          });
        });
    },
    query1(){
      this.loading=true
        querylistjyc({
        page: this.page,
        StateFlag:'1',
        intPageSize: this.size,
        Comid:localStorage.getItem('comid')
      })
        .then((response) => {
          this.tableData = response.data.data;
          this.page = response.data.page;
          this.size = response.data.PageSize;
          this.total = response.data.dataCount; 
          this.$message({
            type: "success",
            message: "查询成功",
          });
          this.loading = false;
        })
        .catch((error) => {
          this.loading = true;
          this.$message({
            type: "info",
            message: "查询失败，请联系管理员！",
          });
        });
    },
    query3(){
        this.loading=true
        querylistjyc({
        page: this.page,
        StateFlag:'3',
        intPageSize: this.size,
        Comid:localStorage.getItem('comid')
      })
        .then((response) => {
          this.tableData = response.data.data;
          this.page = response.data.page;
          this.size = response.data.PageSize;
          this.total = response.data.dataCount; 
          this.$message({
            type: "success",
            message: "查询成功",
          });
          this.loading = false;
        })
        .catch((error) => {
          this.loading = true;
          this.$message({
            type: "info",
            message: "查询失败，请联系管理员！",
          });
        });
    },
    }
  }
</script>
<style scoped>
.body {
  /* margin: 0px; */
  padding: 25px;
}
.body-dialog-2{
  margin-left: 5%;
  width:43%
}
.block-1{
  margin-left:5%
}
.block-2{
  margin-left:5%;
  margin-top:7%
}
.block-3{
margin-left:5%;
 margin-top:7%
}
.block{
  margin-left:0%;
}
.body-span-1{
  width: 100%;
  margin-left: 2.8%;
}
.body-option-1{
  margin-left: 3.8%;
  width: 220px;
}
.body-form-2{
  margin-top: 7%;
}
.demonstration{
  width:90px;
  margin-top:4%
}
.dialog_div{
  display:block;
  margin-left:7%
}
.body_dialog{
  min-width:960px;
}
</style>