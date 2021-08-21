<template>
    <el-dialog
      title="增加"
      :visible.sync="adddialog"
      v-dialogDrag
       :close-on-click-modal="false"
    >
      <el-form
        label-width="80px"
        :model="addform"
      >
      <div class="adddialog_1">
        <el-divider content-position="left">工程信息</el-divider>
          <div class="adddialog_1_1" style="display:flex">
              <div class="adddialog_form1" style="">
                  <el-form-item label="销售单号">
                    <el-input :disabled="true" v-model="addform.SellBillID"></el-input>
                  </el-form-item>
                  <el-form-item label="工程名称">
                    <el-input :disabled="true" v-model="addform.ProjectCaption"></el-input>
                  </el-form-item>
                  <el-form-item label="施工单位">
                    <el-input :disabled="true" v-model="addform.ExecCompany"></el-input>
                  </el-form-item>
              </div>
              <div class="adddialog_form1" style="">
                  <el-form-item label="任务来源">
                    <el-input :disabled="true" v-model="addform.TaskSource"></el-input>
                  </el-form-item>
                  <el-form-item label="工程地点">
                    <el-input :disabled="true" v-model="addform.ProjectAddress"></el-input>
                  </el-form-item>
                  <el-form-item label="委托单位">
                    <el-input :disabled="true" v-model="addform.ExecCompany"></el-input>
                  </el-form-item>
              </div>
          </div>
        <el-divider content-position="left">任务信息</el-divider>
          <div class="adddialog_1_2" style="display:flex">
              <div class="adddialog_form1" style="">
                  <el-form-item label="任务名称">
                    <el-input v-model="addform.Taskname"></el-input>
                  </el-form-item>
                  <span class="body-span-1" style="">商品类型</span>
                <el-select class="body-option-1" style="" v-model="TypeProduct" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options_1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <div>
                  <span class="body-span-2" style=""  >混凝土强度</span>
                <el-select class="body-option-2" style="" v-model="TypePowerGradeTong" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options_2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </div>
                <div>
                  <span class="body-span-3" style="" >湿砂浆强度</span>
                <el-select class="body-option-3" style="" v-model="TypePowerGradeMortar" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options_3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </div>
                <el-form-item class="body_form_input1"  label="印刷票号" style="">
                    <el-input v-model="addform.PageID"></el-input>
                  </el-form-item>
                  <el-form-item label="计划方量">
                    <el-input v-model="addform.SquarePlanTaskBill"></el-input>
                  </el-form-item>
                  <el-form-item label="累计车次">
                    <el-input v-model="addform.SumCarIndexTaskBill"></el-input>
                  </el-form-item>
                  <el-form-item label="累计方量">
                    <el-input v-model="addform.SumSquareTaskBill"></el-input>
                  </el-form-item>
              </div>
              <div class="adddialog_form1" style="">
                  <div class="block-1">
                  <span class="demonstration" style="">开盘时间</span>
                  <el-date-picker
                  class="picker"
                    v-model="SupplyTimeTaskBill"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </div>
               <div>
                  <span class="body-span-4" style="">浇筑部位</span>
                <el-select class="body-option-4" style=""  v-model="TypePourPosition" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
               </div>
                <div>
                  <span class="body-span-5" style="">浇筑方式</span>
                <el-select class="body-option-5" style=""  v-model="TypePour" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </div>
                <div>
                  <span class="body-span-6" style="">抗渗等级</span>
                <el-select class="body-option-6" style=""  v-model="TypeSeepGrade" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </div>
                <div>
                  <span class="body-span-7" style="">坍落度</span>
                <el-select class="body-option-7" style="" v-model="TypeSlump" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </div>
                <div>
                  <span class="body-span-8" style="">砂粒径</span>
                <el-select class="body-option-8" style="" v-model="TypeSandSize" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </div>
                <div>
                  <span class="body-span-9" style="">泵车类型</span>
                <el-select class="body-option-9" style=""  v-model="TypePourCar" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options6"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </div>
                <el-form-item class="body_form_input1" style="" label="备注">
                    <el-input v-model="addform.Remark"></el-input>
                  </el-form-item>
              </div>
          </div>
          <el-divider content-position="left">任务设置</el-divider>
          <div class="adddialog_1_3" style="display:flex">
              <div class="adddialog_form1" style="">
                  <span class="body-span-10" style="">累计方式</span>
                <el-select class="body-option-10" style="" v-model="SumAccountType" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options7"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-form-item label="发车上限" class="body_form_input1"  style="">
                    <el-input v-model="addform.RemindAllowCarTransportNum"></el-input>
                  </el-form-item>
              </div>
              <div class="adddialog_form6" style="width:45%">
                  <span class="body-span-10" style="">累计算法</span>
                <el-select class="body-option-10" style="" v-model="SumAccountCalc" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options8"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-form-item style="" class="body_form_input1" label="余砼下线">
                    <el-input v-model="addform.RemindLastSquare"></el-input>
                  </el-form-item>
              </div>
          </div>
      </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="adddialog = false">取 消</el-button>
            <el-button type="primary" @click="adddialog = false , add()">确 定</el-button>
          </span>
          <Xsd v-show="false" ref="xiaoshoudan2">
          </Xsd>
          <Rwd v-show="false" ref="renwudan">
          </Rwd>
    </el-dialog>
</template>
<script>
import Xsd from "@/components/table/xiaoshoudan2.vue";
import Rwd from "@/components/table/renwudan.vue";
import {
  querylistxsdgl,
  addxsdgl,
  deletesxsdgl,
  modifyxsdgl,
  querylistrwd, addrwd, deletesrwd, modifyrwd,
} from "@/api/user";
export default {
  components: { Xsd, Rwd },
  data() {
    return {
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
        TypePowerGradeMortar: '',
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
      },
      radio: "1",
    };
  },
  methods: {
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
          aa.query2();
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
    addrwd(){
      this.adddialog=true
    }
  },
  mounted(){
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
</style>