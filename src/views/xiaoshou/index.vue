<template>
  <div class="body">
        <div class="body-1" style="">
            <el-radio v-model="radio" label="0">启动</el-radio>
            <el-radio v-model="radio" label="1">暂停</el-radio>
            <el-radio v-model="radio" label="2">完成</el-radio>
            <el-form :inline="true" class="body-form-1"  :model="goncheng">
              <el-form-item label="工程名称:">
                <el-input class="body-form-input" v-model="goncheng.ProName" placeholder="工程名称"></el-input>
            </el-form-item>
            </el-form>
                <span class="body-span-1">供货日期:</span>
                <el-date-picker
                class="body-picker"
                  v-model="value2"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right">
                </el-date-picker>
          <div class="body-2">
            <el-button class="body-button-1" type="primary" @click="adddialog=true" plain>添加</el-button>
           <el-button class="body-button-2" type="primary" @click="excel()" plain>导出</el-button>
           <el-button class="body-button-3" type="primary" @click="query()" plain>刷新</el-button>
            <el-checkbox class="body-checkbox-1" style="" v-model="checked">自动审核</el-checkbox>
          </div>
        </div>
        <div style="" class="table">
            <Xsd ref="xiaoshoudanguanli">
            </Xsd>
        </div>
        <div>
          <!-- 任务来源添加弹框 请注意看看---------------------- -->
          <el-dialog
          v-dialogDrag
            title="提示"
            :visible.sync="adddialog_1"
            width="30%">
             <el-form
          label-width="80px"
          :model="addform"
        >
             <el-form-item label="名称">
              <el-input v-model="addform.MachineBrand"></el-input>
            </el-form-item>
            <el-form-item label="接口编码">
              <el-input v-model="addform.MachineBrand"></el-input>
            </el-form-item>
            <el-form-item label="序号">
              <el-input v-model="addform.MachineBrand"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="addform.MachineBrand"></el-input>
            </el-form-item>
             </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="adddialog_1 = false">取 消</el-button>
              <el-button type="primary" @click="adddialog_1 = false">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 任务来源修改弹框 请注意看看---------------------- -->
          <el-dialog
          v-dialogDrag
            title="提示"
            :visible.sync="modifydialog_1"
            width="30%">
             <el-form
          label-width="80px"
          :model="addform"
        >
             <el-form-item label="名称">
              <el-input v-model="addform.MachineBrand"></el-input>
            </el-form-item>
            <el-form-item label="接口编码">
              <el-input v-model="addform.MachineBrand"></el-input>
            </el-form-item>
            <el-form-item label="序号">
              <el-input v-model="addform.MachineBrand"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="addform.MachineBrand"></el-input>
            </el-form-item>
             </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="modifydialog_1 = false">取 消</el-button>
              <el-button type="primary" @click="modifydialog_1 = false">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 添加弹框任务来源弹框 -------------------请注意看看 -->
          <el-dialog
          v-dialogDrag
            title="提示"
            :visible.sync="innerVisible"
            width="30%">
            <div style="display:flex;">
              <span>类型：</span>
              <el-select v-model="value" filterable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
             <div style="display:flex">
                <el-button class="" type="primary" @click="adddialog_1=true" plain>增加</el-button>
             </div>
            </div>
            <div class="body-tableData-1" style="">
                   <el-table
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label=""
                    width="">
                  </el-table-column>
                  <el-table-column
                  fixed="right"
                  label=""
                  width="50px">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                    <el-button @click="modifydialog_1(scope.row)" type="text" size="small">修改</el-button>
                  </template>
                  </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="innerVisible = false">取 消</el-button>
              <el-button type="primary" @click="innerVisible = false">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 第一个添加弹框 实现添加表格数据 ---------------------请注意看清楚-->
          <el-dialog
          v-dialogDrag
            title="添加"
            :visible.sync="adddialog"
            width="55%"
          >
            <el-form
              label-width="80px"
              :model="addform"
            >
              <div style="display:flex">
                  <div class="body-dialog-form-1">
                <el-form-item label="销售单号">
                  <el-input v-model="addform.ID"></el-input>
                </el-form-item>
                <span class="body-span-2">供货时间：</span>
                <el-date-picker
                  v-model="SupplyTimeSellBill"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions1">
                </el-date-picker>
                <el-form-item class="body-form-2" label="印刷票号">
                  <el-input v-model="addform.PageID"></el-input>
                </el-form-item>
                <span class="body-span-3">任务来源：</span>
              <el-select class="body_select_1" v-model="TaskSource" filterable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
                <el-button class="" @click="innerVisible = true" type="primary" plain>...</el-button>
                <el-form-item class="body-form-4" label-width="88px" label="工程监督号">
                  <el-input v-model="addform.ProjectSuperviseID"></el-input>
                </el-form-item>
                <el-form-item label="合同编号">
                  <el-input v-model="addform.PactID"></el-input>
                </el-form-item>
                <el-form-item label="供货方量">
                  <el-input v-model="addform.SquarePlanSellBill"></el-input>
                </el-form-item>
                <el-checkbox class="body-checkbox-2" v-model="checked1">严格控制生产方量</el-checkbox>
              </div>
              <div class="body-dialog-form-2">
                <el-form-item label="工程名称">
                  <el-input v-model="addform.ProjectCaption"></el-input>
                </el-form-item>
                <el-form-item label="工程地点">
                  <el-input v-model="addform.ProjectAddress"></el-input>
                </el-form-item>
                <el-form-item label="施工单位">
                  <el-input v-model="addform.ExecCompany"></el-input>
                </el-form-item>
                <el-form-item label="委托单位">
                  <el-input v-model="addform.DelegateCompany"></el-input>
                </el-form-item>
                <el-form-item label="运距(km)">
                  <el-input v-model="addform.ProjectDistance"></el-input>
                </el-form-item>
                <el-form-item label="合同名称">
                  <el-input v-model="addform.PactCaption"></el-input>
                </el-form-item>
                <el-form-item label="销售人员">
                  <el-input v-model="addform.SellPerson"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="addform.Remark"></el-input>
                </el-form-item>
              </div>
              </div>
              <div class="addform-1">
                <el-form-item label="联系人员">
                  <el-input v-model="addform.SellPerson"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                  <el-input v-model="addform.ProjectTelephone"></el-input>
                </el-form-item>
              </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="adddialog = false">取 消</el-button>
              <el-button type="primary" @click="(adddialog = false), add()"
                >确 定</el-button
              >
            </span>
          </el-dialog>
    </div>
    </div>
</template>
<script>
import Xsd from '@/components/table/xiaoshoudanguanli.vue'
import {
  querylistxsdgl,
  addxsdgl,
  deletesxsdgl,
  modifyxsdgl,
} from "@/api/user";
import { data } from 'autoprefixer';
export default {
  components : { Xsd },
  data() {
    return {
      tableData:[{}],
      gonhuotime:'',
      loading:false,
      checked1:true,
      checked:true,
      addform:{
        ProjectCaption:'',
        ID:'',
        SupplyTimeSellBill:'',
        TaskSource:'',
        ProjectTelephone :'',
        SellPerson:'',
        ProjectSuperviseID:'',
        PactID:'',
        isMustSquarePlan:'',
        ProName:'',
        ProjectAddress:'',
        ExecCompany:'',
        DelegateCompany:'',
        ProjectDistance:'',
        PactCaption:'',
        SellPerson:'',
        Remark:'',
        SquarePlanSellBill:"",
        PageID:"",
      },
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
        value:'',
        TaskSource: '',
        modifydialog_1:false,
      adddialog_1:false,
      innerVisible:false,
      adddialog:false,
      pickerOptions1: {
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
        SupplyTimeSellBill: '',
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
        // value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: '',
      radio: "0",
      checked: true,
      goncheng:{
          ProName:'',
      },
    };
  },
   methods: {
    query() {
      const ss = this.$refs.xiaoshoudanguanli
     ss.loading=true  
      if(this.value2===''){
          this.gonhuotime=""
      }else if(this.value2==null){
         this.gonhuotime = ""
      }else{
      let time = this.value2
      let starttime = this.moment(time[0]).format("YYYY-MM-DD HH:mm:ss")
      let endtime = this.moment(time[1]).format("YYYY-MM-DD HH:mm:ss")
      this.gonhuotime = (starttime +','+ endtime)
      }
        querylistxsdgl({
        Stateflag:this.radio,
        page: ss.page,
        intPageSize: ss.size,
        ProName:this.goncheng.ProName,
        Deliverydate:this.gonhuotime,
        Comid:localStorage.getItem('comid')
      })
        .then((response) => {
          ss.tableData = response.data.data;
          ss.page = response.data.page;
          ss.size = response.data.PageSize;
          ss.total = response.data.dataCount; 
          this.$message({
            type: "success",
            message: "查询成功",
          });
          ss.loading = false;
        })
        .catch((error) => {
          ss.loading = true;
          this.$message({
            type: "info",
            message: "查询失败，请联系管理员！",
          });
        });
    },
    add() {
      const nh = this.$refs.xiaoshoudanguanli;
      // if(this.addform.ID==''){
      //   this.adddialog=true
      //   this.$message({
      //   message: '请填写ID信息',
      //   type: 'info'
      // });
      // }else{
      //   if(this.addform.MinName==''){
      //     this.adddialog=true
      //   this.$message({
      //  message: '请填写公司简介信息',
      //   type: 'info'
      // });
      // }else{
      //   if(this.addform.Caption==''){
      //     this.adddialog=true
      //   this.$message({
      //  message: '请填写公司全称信息',
      //   type: 'info'
      // });
      //   }else{
      addxsdgl(
        JSON.stringify({
        ProjectCaption : this.addform.ProjectCaption,
        ID:this.addform.ID,
        SupplyTimeSellBill:this.SupplyTimeSellBill,
        TaskSource:this.TaskSource,
        ProjectTelephone:this.addform.ProjectTelephone,
        SellPerson:this.addform.SellPerson,
        ProjectSuperviseID:this.addform.ProjectSuperviseID,
        PactID:this.addform.PactID,
        ProName:this.addform.ProName,
        ProjectAddress:this.addform.ProjectAddress,
        ExecCompany:this.addform.ExecCompany,
        DelegateCompany:this.addform.DelegateCompany,
        ProjectDistance:this.addform.ProjectDistance,
        PactCaption:this.addform.PactCaption,
        SellPerson:this.addform.SellPerson,
        Remark:this.addform.Remark,
        IsMustSquarePlan:this.checked1,
        SquarePlanSellBill:this.addform.SquarePlanSellBill,
        PageID:this.addform.PageID,
        ActionTime:localStorage.getItem('ActionTime'),
        ActionUserID:localStorage.getItem('ActionUserID'),
        ActionUserName:localStorage.getItem('ActionUserName'),
        CompanyID : localStorage.getItem('comid'),
        })
      ).then((response) => {
          this.$message({
            message: "添加成功！",
            type: "success",
          });
          nh.querylist();
          // const gonsixinxi=this.$refs.gonsixinxi
          // gonsixinxi.querylist()
        })
        .catch((error) => {
          this.$message({
            message: "添加未成功，请联系管理员",
            type: "error",
          });
        });
      // }
      //   }
      // }
      // const gonsixinxi=this.$refs.gonsixinxi
      // console.log(gonsixinxi)
      // this.addform.ID=this.$refs.gonsixinxi.tableData[0].ID
      // console.log(this.$refs.gonsixinxi.tableData)
    },
   excel(){
     const excel = this.$refs.xiaoshoudanguanli
     excel.exportdata()
   }
  },
};
</script>
<style scoped>
.body {
  padding: 25px;
}
.body-1{
  display:flex;
  height:30px
}
.body-form-1{
   margin-top:-0.8%;
   margin-left:1%
}
.body-form-input{
   width:120px;
   height:80px;
}
.body-span-1{
   font-size:15px;
   margin-left:3%
}
.body-picker{
   margin-top:-0.8%;
   margin-left:1%
}
.body-2{
  display: flex;
  margin-top: -0.8%;
  margin-left: 3%;
  height: 43px;
}
.body-button-4{
  width:80px;
  margin-left:5%
}
.body-button-5{
  width:80px;
  margin-left:3%
}
.body-button-6{
  width:80px;
  margin-left:3%
}
.body-checkbox-1{
  margin-left:10%;
  margin-top:3.5%;
}
.body-tableData-1{
  display:flex;
  margin-top:2%
}
.body-span-2{
  margin-left:10px
}
.body-form-2{
  margin-top:25px
}
.body-span-3{
  margin-left:2%;
  margin-top: 1.2%;
}
.body-form-4{
  margin-top:23px;
  margin-left:-10px
}
.body-checkbox-2{
  margin-left:120px
}
.body-dialog-form-2{
  margin-left:3%;
  width:45%
}
.body-dialog-form-1{
  width:45%
}
.table{
  margin-top: 1.3%;
}
</style>