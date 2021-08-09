<template>
  <div class="body">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="销售单" name="first">
        <div style="display: flex">
          <el-form :inline="true" class="body_form_1" :model="goncheng">
            <el-form-item label="工程名称:">
              <el-input
                class="body_input_1"
                v-model="goncheng.ProName"
                placeholder="工程名称"
              ></el-input>
            </el-form-item>
          </el-form>
          <span class="body_span_1">供货日期:</span>
          <el-date-picker
            class="body_picker_1"
            v-model="value2"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
          <div class="body_button" style="">
            <el-button
              size="small"
              class="body_button_1"
              @click="excel()"
              type="primary"
              plain
              >导出</el-button
            >
            <el-button @click="addrwd()" type="primary" plain>添加任务单</el-button>
            <el-button
              size="small"
              class="body_button_1"
              @click="query()"
              type="primary"
              plain
              >刷新</el-button
            >
          </div>
              <div class="body_radio">
                 <el-radio v-model="radio1" @change="startxsdgl()" label="0">启动</el-radio>
              <el-radio v-model="radio1" @change="pausexsdgl()" label="1">暂停</el-radio>
              <el-radio v-model="radio1" @change="endxsdgl()" label="2">完成</el-radio>
              </div>
        </div>
        <div class="table">
          <Xsd ref="xiaoshoudan2"> </Xsd>
        </div>
      </el-tab-pane>
      <el-tab-pane label="任务单" name="second">
        <div class="body2" style="">
          <el-radio v-model="radio" @change="query_1()" label="0">启动</el-radio>
          <el-radio v-model="radio" @change="query_2()" label="1">暂停</el-radio>
          <el-radio v-model="radio" @change="query_3()" label="2">完成</el-radio>
          <el-form
            :inline="true"
            class="body2_form-1"
            style=""
            :model="goncheng"
          >
            <el-form-item label="工程名称:">
              <el-input
                class="body2_form_1"
                style=""
                v-model="goncheng.ProName2"
                placeholder="工程名称"
              ></el-input>
            </el-form-item>
          </el-form>
          <span class="body2_span_2" style="">供货日期:</span>
          <el-date-picker
            class="body2_picker_1"
            v-model="value3"
            type="datetimerange"
            :picker-options="pickerOptions2"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
          <div class="body2_button" style="display: flex">
            
            <el-button type="primary" @click="export2()" plain>导出</el-button>
            <el-button @click="query2()" type="primary" plain>刷新</el-button>
            <el-checkbox class="body2_checkbox" v-model="checked"
              >自动审核</el-checkbox
            >
          </div>
        </div>
        <div class="table2">
          <Rwd ref="renwudan"> </Rwd>
        </div>
      </el-tab-pane>
      <div>
      </div>
    </el-tabs>
    <div>
      <Index ref="Index" v-show="false">
      </Index>
    </div>
  </div>
</template>
<script>
import Xsd from "@/components/table/xiaoshoudan2.vue";
import Rwd from "@/components/table/renwudan.vue";
import Index from "@/views/shengchanguanli/renwudan/dialog.vue"
import {
  querylistxsdgl,
  addxsdgl,
  deletesxsdgl,
  modifyxsdgl,
  querylistrwd, addrwd, deletesrwd, modifyrwd,upxsd,
} from "@/api/user";
export default {
  components: { Xsd, Rwd , Index},
  data() {
    return {
      radio1:'0',
      stateflag:'',
      addform:{
        ExecCompany : '',
        ProjectAddress : '',
        TaskSource : '',
        SupplyTimeSellBill	: '',
        ProjectCaption : '',
        SellBillID : '',
        taskname :"",
        TypeProduct :"",
        TypePowerGradeTong :"",
        TypePowerGradeMortar:"",
        PageID:"",
        SquarePlanTaskBill :"",
        SumCarIndexTaskBill :"",
        SumSquareTaskBill :"",
        SupplyTimeTaskBill :"",
        TypePourPosition :"",
        TypePour :"",
        TypeSeepGrade :"",
        TypeSlump:"",
        TypeSandSize :"",
        TypePourCar :"",
        Remark :"",
        SumAccountType :"",
        RemindAllowCarTransportNum :"",
        SumAccountCalc :"",
        RemindLastSquare:"",
      },
      options_3: [{
          value: '选项1',
          label: '黄金糕'
        },],
        FormulaCaptionMortar: '',
        options_2: [{
          value: '选项1',
          label: '黄金糕'
        },],
        TypePowerGradeTong: '',
        options_1: [{
          value: '选项1',
          label: '黄金糕'
        },],
        TypeProduct: '',
      options1: [{
          value: '选项1',
          label: '黄金糕'
        },],
        TypePourPosition: '',
        options2: [{
          value: '选项1',
          label: '黄金糕'
        },],
        TypePour: '',
        options3: [{
          value: '选项1',
          label: '黄金糕'
        },],
        TypeSeepGrade: '',
        options4: [{
          value: '选项1',
          label: '黄金糕'
        },],
        TypeSlump: '',
        options5: [{
          value: '选项1',
          label: '黄金糕'
        },],
        TypeSandSize: '',
        options6: [{
          value: '选项1',
          label: '黄金糕'
        },],
        TypePourCar: '',
        options7: [{
          value: '1',
          label: '1'
        },],
        SumAccountType: '',
        options8: [{
          value: '1',
          label: '1'
        },],
        SumAccountCalc: '',

      adddialog:false,
      checked: true,
      activeName: "first",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
            pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value3: "",
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
        SupplyTimeTaskBill: '',
      goncheng: {
        ProName: "",
        ProName2: "",
      },
      radio: "0",
    };
  },
  methods: {
    query() {
      const ss = this.$refs.xiaoshoudan2;
      ss.loading = true;
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
    query2() {
       const ss = this.$refs.renwudan;
      ss.loading = true;
      if(this.value3===''){
          this.gonhuotime=""
      }else if(this.value3==null){
         this.gonhuotime = ""
      }else{
      let time = this.value3
      let starttime = this.moment(time[0]).format("YYYY-MM-DD HH:mm:ss")
      let endtime = this.moment(time[1]).format("YYYY-MM-DD HH:mm:ss")
      this.gonhuotime = (starttime +','+ endtime)
      }
      querylistrwd({
        page: ss.page,
        intPageSize: ss.size,
        ProName:this.goncheng.ProName2,
        Deliverydate:this.gonhuotime,
        Comid:localStorage.getItem('comid'),
        Stateflag:this.radio
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
      const aa = this.$refs.renwudan;
      addrwd(
        JSON.stringify({
         ExecCompany : this.addform.ExecCompany,
         ProjectAddress : this.addform.ProjectAddress,
         TaskSource : this.addform.TaskSource,
         SupplyTimeSellBill	: this.addform.SupplyTimeSellBill,
         ProjectCaption : this.addform.ProjectCaption,
         SellBillID : this.addform.SellBillID,
         Taskname:this.addform.Taskname,
         TypeProduct: this.TypeProduct,
         TypePowerGradeTong :this.TypePowerGradeTong,
         TypePowerGradeMortar:this.TypePowerGradeMortar,
         PageID  :this.addform.PageID,
         SquarePlanTaskBill : this.addform.SquarePlanTaskBill,
         SumCarIndexTaskBill  :this.addform.SumCarIndexTaskBill,
         SumSquareTaskBill  : this.addform.SumSquareTaskBill,
         SupplyTimeTaskBill : this.SupplyTimeTaskBill,
         TypePourPosition : this.TypePourPosition,
         TypePour  :this.TypePour,
         TypeSeepGrade  :  this.TypeSeepGrade,
         TypeSlump  : this.TypeSlump,
         TypeSandSize  :this. TypeSandSize,
         TypePourCar  : this.TypePourCar,
         Remark : this.addform. Remark,
         SumAccountType  : this.SumAccountType,
         RemindAllowCarTransportNum  : this.addform. RemindAllowCarTransportNum,
         SumAccountCalc  : this. SumAccountCalc,
         RemindLastSquare  : this.addform. RemindLastSquare,
        ActionTime:localStorage.getItem('ActionTime'),
        ActionUserID:localStorage.getItem('ActionUserID'),
        ActionUserName:localStorage.getItem('ActionUserName'),
        CompanyID : localStorage.getItem('comid'),
        ID:localStorage.getItem('comid'),
        })
      )
        .then((response) => {
          this.$message({
            message: "添加成功！",
            type: "success",
          });
          this.query2();
        })
        .catch((error) => {
          this.$message({
            message: "添加未成功，请联系管理员",
            type: "error",
          });
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    excel() {
      const excel = this.$refs.xiaoshoudan2;
      excel.exportdata();
    },
    export2(){
      const excel = this.$refs.renwudan
      excel.export()
    },
    query_1(){
      const ss = this.$refs.renwudan;
      ss.loading = true;
      if(this.value3===''){
          this.gonhuotime=""
      }else if(this.value3==null){
         this.gonhuotime = ""
      }else{
      let time = this.value3
      let starttime = this.moment(time[0]).format("YYYY-MM-DD HH:mm:ss")
      let endtime = this.moment(time[1]).format("YYYY-MM-DD HH:mm:ss")
      this.gonhuotime = (starttime +','+ endtime)
      }
      querylistrwd({
        page: ss.page,
        intPageSize: ss.size,
        ProName:this.goncheng.ProName2,
        Deliverydate:this.gonhuotime,
        Comid:localStorage.getItem('comid'),
        Stateflag:this.radio
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
    query_2(){
      const ss = this.$refs.renwudan;
      ss.loading = true;
      if(this.value3===''){
          this.gonhuotime=""
      }else if(this.value3==null){
         this.gonhuotime = ""
      }else{
      let time = this.value3
      let starttime = this.moment(time[0]).format("YYYY-MM-DD HH:mm:ss")
      let endtime = this.moment(time[1]).format("YYYY-MM-DD HH:mm:ss")
      this.gonhuotime = (starttime +','+ endtime)
      }
      querylistrwd({
        page: ss.page,
        intPageSize: ss.size,
        ProName:this.goncheng.ProName2,
        Deliverydate:this.gonhuotime,
        Comid:localStorage.getItem('comid'),
        Stateflag:this.radio
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
    query_3(){
      const ss = this.$refs.renwudan;
      ss.loading = true;
      if(this.value3===''){
          this.gonhuotime=""
      }else if(this.value3==null){
         this.gonhuotime = ""
      }else{
      let time = this.value3
      let starttime = this.moment(time[0]).format("YYYY-MM-DD HH:mm:ss")
      let endtime = this.moment(time[1]).format("YYYY-MM-DD HH:mm:ss")
      this.gonhuotime = (starttime +','+ endtime)
      }
      querylistrwd({
        page: ss.page,
        intPageSize: ss.size,
        ProName:this.goncheng.ProName2,
        Deliverydate:this.gonhuotime,
        Comid:localStorage.getItem('comid'),
        Stateflag:this.radio
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
        // 启用状态
    startxsdgl(){
      const aa = this.$refs.xiaoshoudan2
      this.stateflag = '0'
      upxsd({
        ID : aa.ID,
        stateflag : this.stateflag
      }).then((response)=>{
        aa.querylist()
        this.$message({
          type:'success',
          message:'更新状态成功！'
        })
      }).catch((error)=>{
        this.$message({
          type:'error',
          message:"更新未成功！"
        })
      })
    },
    // 完成状态
    endxsdgl(){
      const aa = this.$refs.xiaoshoudan2
        this.stateflag = '2'
      upxsd({
        ID : aa.ID,
        stateflag : this.stateflag
      }).then((response)=>{
        aa.querylist()
        this.$message({
          type:'success',
          message:'更新状态成功！'
        })
      }).catch((error)=>{
        this.$message({
          type:'error',
          message:"更新未成功！"
        })
      })
    },
    // 暂停状态
    pausexsdgl(){
      const aa = this.$refs.xiaoshoudan2
      this.stateflag = '1'
      upxsd({
        ID : aa.ID,
        stateflag : this.stateflag
      }).then((response)=>{
        aa.querylist()
        this.$message({
          type:'success',
          message:'更新状态成功！'
        })
      }).catch((error)=>{
        this.$message({
          type:'error',
          message:"更新未成功！"
        })
      })
    },
    addrwd(){
      const aa = this.$refs.Index
      const bb = this.$refs.xiaoshoudan2
      aa.addrwd()
      aa.addform.SellBillID = bb.ID
      aa.addform.ProjectCaption = bb.ProjectCaption
      aa.addform.SupplyTimeSellBill = bb.SupplyTimeSellBill
      aa.addform.TaskSource = bb.TaskSource
      aa.addform.ProjectAddress = bb.ProjectAddress
      aa.addform.ExecCompany = bb.ExecCompany
      this.query2()
    }
  },
  mounted(){
    this.query2()
  }
};
</script>
<style scoped>
.body {
  padding: 25px;
}
.body_form_1 {
  margin-top: 1%;
  margin-left: 1%;
}
.body_input_1 {
  width: 120px;
  height: 80px;
}
.body_span_1 {
  font-size: 15px;
  margin-left: 3%;
  margin-top: 2%;
}
.body_picker_1 {
  margin-top: 1.3%;
  margin-left: 1%;
}
.body_button {
  margin-top: 1.3%;
  margin-left: 2%;
}
.body_button_1 {
  widows: 80px;
}
.table {
  margin-top: -2%;
}
.body2 {
  display: flex;
  margin-top: 1%;
}
.body2_form-1 {
  margin-top: -0.8%;
  margin-left: 1%;
}
.body2_form_1 {
  width: 120px;
  height: 80px;
}
.body2_span_2 {
  margin-left: 3%;
}
.body2_picker_1 {
  margin-top: -0.8%;
  margin-left: 1%;
}
.body2_button {
  margin-top: -0.8%;
  margin-left: 3%;
  height: 45px;
}
.body2_checkbox {
  margin-left: 10%;
  margin-top: 4%;
}
.table2 {
}
/* tab2 */
.adddialog_form1{
  width:45%
}
.body-span-1{
  margin-left:8.5%
}
.body-option-1{
  margin-left:3.5%
}
.body-span-2{
  margin-left:4.5%
}
.body-option-2{
  margin-left:3.5%;
  margin-top:5.5%
}
.body-span-3{
  margin-left:4.5%
}
.body-option-3{
  margin-left:3.5%;
  margin-top:5.5%
}
.body_form_input1{
  margin-top:5.5%
}
.demonstration{
  margin-left:8.5%
}
.body-span-4{
  margin-left:8.5%
}
.body-option-4{
  margin-left:3.5%;
  margin-top:5.5%
}
.picker{
  margin-left:3.5%
}
.body-span-5{
  margin-left:8.5%
}
.body-option-5{
  margin-left:3.5%;
  margin-top:5.5%
}
.body-span-6{
  margin-left:8.5%
}
.body-option-6{
  margin-left:3.5%;
  margin-top:5.5%
}
.body-span-7{
  margin-left:12.8%
}
.body-option-7{
  margin-left:3.5%;
  margin-top:5.5%
}
.body-span-9{
  margin-left:8.5%
}
.body-option-9{
  margin-left:3.5%;
  margin-top:5.5%
}
.body-span-8{
  margin-left:12.8%
}
.body-option-8{
  margin-left:3.5%;
  margin-top:5.5%
}
.body-span-10{
  margin-left:8.5%
}
.body-option-10{
 margin-left:3.5%
}
.body_radio{
  margin-left: 3%;
  margin-top: 2.2%;
}
</style>