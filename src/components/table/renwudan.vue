<template>
  <!--  :header-cell-style="{background:'rgb(0 0 0 / 67%)',color:'#606266'}"
修改表头背景颜色
  -->
  <div>
     <div>
         <el-dialog
      title="增加"
      :visible.sync="editordialog"
      :before-close="handleClose"
      v-dialogDrag
       :close-on-click-modal="false"
    >
      <el-form
        :label-position="editorlabel"
        label-width="80px"
        :model="editorform"
      >
      <div class="adddialog_1">
        <el-divider content-position="left">工程信息</el-divider>
          <div class="adddialog_1_1" style="display:flex">
              <div class="adddialog_form1" style="">
                  <el-form-item label="销售单号">
                    <el-input v-model="editorform.SellBillID"></el-input>
                  </el-form-item>
                  <el-form-item label="工程名称">
                    <el-input v-model="editorform.ProjectCaption"></el-input>
                  </el-form-item>
                  <el-form-item label="施工单位">
                    <el-input v-model="editorform.Constructionunit"></el-input>
                  </el-form-item>
              </div>
              <div class="adddialog_form1" style="">
                  <el-form-item label="任务来源">
                    <el-input v-model="editorform.TaskSource"></el-input>
                  </el-form-item>
                  <el-form-item label="工程地点">
                    <el-input v-model="editorform.ProjectAddress"></el-input>
                  </el-form-item>
                  <el-form-item label="委托单位">
                    <el-input v-model="editorform.ExecCompany"></el-input>
                  </el-form-item>
              </div>
          </div>
        <el-divider content-position="left">任务信息</el-divider>
          <div class="adddialog_1_2" style="display:flex">
              <div class="adddialog_form1" style="">
                  <el-form-item label="任务名称">
                    <el-input v-model="editorform.taskname"></el-input>
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
                <el-form-item label="印刷票号" class="body_form_input1" style="">
                    <el-input v-model="editorform.PageID "></el-input>
                  </el-form-item>
                  <el-form-item label="计划方量">
                    <el-input v-model="editorform.SquarePlanTaskBill"></el-input>
                  </el-form-item>
                  <el-form-item label="累计车次">
                    <el-input v-model="editorform.SumCarIndexTaskBill"></el-input>
                  </el-form-item>
                  <el-form-item label="累计方量">
                    <el-input v-model="editorform.SumSquareTaskBill"></el-input>
                  </el-form-item>
              </div>
              <div class="adddialog_form1" style="">
                  <div class="block-1">
                  <span class="demonstration" style="">开盘时间</span>
                  <el-date-picker
                  style="" 
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
                    <el-input v-model="editorform.Remark"></el-input>
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
                <el-form-item label="发车上限" class="body_form_input1" style="">
                    <el-input v-model="editorform.RemindAllowCarTransportNum"></el-input>
                  </el-form-item>
              </div>
              <div class="adddialog_form1" style="width:45%">
                  <span class="body-span-10" style="">累计算法</span>
                <el-select class="body-option-10" style="" v-model="SumAccountCalc" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options8"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-form-item class="body_form_input1" style="" label="余砼下线">
                    <el-input v-model="editorform.RemindLastSquare"></el-input>
                  </el-form-item>
              </div>
          </div>
      </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="editordialog = false">取 消</el-button>
            <el-button type="primary" @click="editordialog = false , modify()">确 定</el-button>
          </span>
    </el-dialog>
      </div>
    <div class="table">
      <el-table
        v-loading="loading"
        :header-cell-style="{
          background: 'rgba(249, 182, 3, 0.67)',
          color: '#606266',
        }"
        :data="tableData"
        border
        :cell-style="rowClass"
        style="width: 100%"
      >
        <el-table-column fixed="left" label="序号" width="50px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="CompanyID" label="任务单号" width="">
        </el-table-column>
        <el-table-column prop="SellBillID" label="销售单号" width="">
        </el-table-column>
        <el-table-column prop="ProjectCaption" label="工程名称" width="">
        </el-table-column>
        <el-table-column prop="SquarePlanTaskBill" label="计划方量" width="">
        </el-table-column>
        <el-table-column prop="SumCarIndexTaskBill" label="累计车次" width="">
        </el-table-column>
        <el-table-column prop="SumSquareTaskBill" label="累计方量" width="">
        </el-table-column>
        <el-table-column prop="SupplyTimeTaskBill" label="开盘时间" width="">
        </el-table-column>
        <el-table-column prop="IsRemindTaskBill" label="开盘提醒" width="">
        </el-table-column>
        <el-table-column prop="TypeProduct" label="商品类型" width="">
        </el-table-column>
        <el-table-column prop="TypePowerGradeTong" label="混凝土强度" width="100px">
        </el-table-column>
        <el-table-column prop="TypePowerGradeMortar" label="砂浆强度" width="">
        </el-table-column>
        <el-table-column prop="TypePourPosition" label="浇筑部位" width="">
        </el-table-column>
        <el-table-column prop="TypePour" label="浇筑方式" width="">
        </el-table-column>
        <el-table-column prop="TypeSeepGrade" label="抗渗等级" width="">
        </el-table-column>
        <el-table-column prop="TypeSlump" label="坍落度" width="">
        </el-table-column>
        <el-table-column prop="TypeSandSize" label="砂粒径" width=""> </el-table-column>
        <el-table-column prop="TypePourCar" label="泵车类型" width="">
        </el-table-column>
        <el-table-column prop="PageID" label="印刷票号" width="">
        </el-table-column>
        <el-table-column prop="BoundProduceLine" label="绑定生产线" width="100px">
        </el-table-column>
        <el-table-column prop="FormulaCaptionTong" label="混凝土配方" width="100px">
        </el-table-column>
        <el-table-column prop="FormulaCaptionMortar" label="砂浆配方" width="">
        </el-table-column>
        <el-table-column prop="SumAccountType" label="累计方式" width="">
        </el-table-column>
        <el-table-column prop="SumAccountCalc" label="累计算法" width="">
        </el-table-column>
        <el-table-column prop="RemindAllowCarTransportNum" label="发车上限" width="">
        </el-table-column>
        <el-table-column prop="TypePourPosition" label="当前发车" width="">
        </el-table-column>
        <el-table-column prop="CommIndex" label="工程监督号" width="100px">
        </el-table-column>
        <el-table-column prop="RemindLastSquare" label="流水号" width="">
        </el-table-column>
        <el-table-column prop="ActionUserID" label="联系人员" width="">
        </el-table-column>
        <el-table-column prop="ActionUserName" label="联系电话" width="">
        </el-table-column>
        <el-table-column prop="RemindLastSquare" label="余砼下线" width="">
        </el-table-column>
        <el-table-column prop="IsTSCount" label="特殊运输" width="">
        </el-table-column>
        <el-table-column prop="Remark" label="备注" width=""> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150px">
          <template slot-scope="scope">
            <el-button
              style="color: rgb(0 0 0 / 67%)"
              type="text"
              size="small"
              @click="editorClick(scope.row), (editordialog = true)"
              >编辑</el-button
            >
            <el-button
              style="color: rgb(0 0 0 / 67%)"
              type="text"
              size="small"
              @click="deletes(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { querylistrwd, addrwd, deletesrwd, modifyrwd } from "@/api/user.js";
import { export2Excel } from '@/common/js/util'
export default {
  data() {
    return {
      editordialog:false,
      adddialog:false,
      loading: false,
      total: 0,
      size: 10,
      page: 1,
       columns:[
        {title:'任务单号',key:'CompanyID'},
        {title:'销售单号',key:'SellBillID'},
        ],
      editorform: {
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
      tableData: [
        {
          CompanyID:'',
          SellBillID:"",
          ID:"",
          SquarePlanTaskBill:"",
          SumCarIndexTaskBill:"",
          TypePowerGradeTong:"",
          ActionTime:"",
          ActionUserName:"",
          ActionUserID:"",
          TypePowerGradeMortar:"",
          FormulaCaptionMortar:"",
          TypePourPosition:"",
          TypePour:"",
          TypeSeepGrade:"",
          TypeSlump:"",
          TypeSandSize:"",
          TypePourCar:"",
          BoundProduceLine:"",
          TypeProduct:"",
          RemindAllowCarTransportNum:"",
          SumAccountCalc:"",
          SumSquareTaskBill:"",
          SumAccountType:"",
          TaskBillPrice:"",
          TypePourPosition:"",
          CommIndex:"",
          RemindLastSquare:"",
          ActionUserID:"",
          ActionUserName:"",
          FormulaCaptionTong:"",
          PageID:"",
          Remark:"",
        },
      ],
      viewdialog: false,
      editordialog: false,
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
          value: '选项1',
          label: '黄金糕'
        },],
        SumAccountType: '',
        options8: [{
          value: '选项1',
          label: '黄金糕'
        },],
        SumAccountCalc: '',
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
    };
  },
  methods: {
     querylist() {
      this.loading = true;
      querylistrwd({
        page: this.page,
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
    editorClick(row) {
          this.editorform.addres=row.addres
          this.editorform.Constructionunit=row.Constructionunit
          this.editorform.taskname=row.taskname
          this.editorform.Entrustunit=row.Entrustunit
          this.editorform.CompanyID=row.CompanyID
          this.editorform.SellBillID=row.SellBillID
          this.editorform.ID=row.ID
          this.editorform.SquarePlanTaskBill=row.SquarePlanTaskBill
          this.editorform.SumCarIndexTaskBill=row.SumCarIndexTaskBill
          this.editorform.TypePowerGradeTong=row.TypePowerGradeTong
          this.ActionTime=row.ActionTime
          // this.editorform.ActionUserName=row.ActionUserName
          this.ActionUserID=row.ActionUserID
          this.TypePowerGradeMortar=row.TypePowerGradeMortar
          this.FormulaCaptionMortar=row.FormulaCaptionMortar
          this.TypePourPosition=row.TypePourPosition
          this.TypePour=row.TypePour
          this.TypeSeepGrade=row.TypeSeepGrade
          this.TypeSlump=row.TypeSlump
          this.TypeSandSize=row.TypeSandSize
          this.TypePourCar=row.TypePourCar
          this.editorform.BoundProduceLine=row.BoundProduceLine
          // this.editorform.TypeProduct=row.TypeProduct
          // this.editorform.RemindAllowCarTransportNum=row.RemindAllowCarTransportNum
          // this.editorform.SumAccountCalc=row.SumAccountCalc
          this.SumSquareTaskBill=row.SumSquareTaskBill
          this.SumAccountType=row.SumAccountType
          this.editorform.TaskBillPrice=row.TaskBillPrice
          // this.editorform.CommIndex=row.CommIndex
          // this.editorform.RemindLastSquare=row.RemindLastSquare
          // this.editorform.ActionUserName=row.ActionUserName
          this.editorform.FormulaCaptionTong=row.FormulaCaptionTong
          // this.editorform.PageID=row.PageID
          this.editorform.Remark=row.Remark
    },
    modify() {
      modifyrwd(
        JSON.stringify({
         ExecCompany : this.editorform.ExecCompany,
         ProjectAddress : this.editorform.ProjectAddress,
         TaskSource : this.editorform.TaskSource,
         SupplyTimeSellBill	: this.editorform.SupplyTimeSellBill,
         ProjectCaption : this.editorform.ProjectCaption,
         SellBillID : this.editorform.SellBillID,
         Taskname:this.editorform.Taskname,
         TypeProduct: this.TypeProduct,
         TypePowerGradeTong :this.TypePowerGradeTong,
         TypePowerGradeMortar:this.TypePowerGradeMortar,
         PageID  :this.editorform.PageID,
         SquarePlanTaskBill : this.editorform.SquarePlanTaskBill,
         SumCarIndexTaskBill  :this.editorform.SumCarIndexTaskBill,
         SumSquareTaskBill  : this.editorform.SumSquareTaskBill,
         SupplyTimeTaskBill : this.SupplyTimeTaskBill,
         TypePourPosition : this.TypePourPosition,
         TypePour  :this.TypePour,
         TypeSeepGrade  :  this.TypeSeepGrade,
         TypeSlump  : this.TypeSlump,
         TypeSandSize  :this. TypeSandSize,
         TypePourCar  : this.TypePourCar,
         Remark : this.editorform. Remark,
         SumAccountType  : this.SumAccountType,
         RemindAllowCarTransportNum  : this.editorform. RemindAllowCarTransportNum,
         SumAccountCalc  : this. SumAccountCalc,
         RemindLastSquare  : this.editorform. RemindLastSquare,
        ActionTime:localStorage.getItem('ActionTime'),
        ActionUserID:localStorage.getItem('ActionUserID'),
        ActionUserName:localStorage.getItem('ActionUserName'),
        CompanyID : localStorage.getItem('comid'),
        ID:localStorage.getItem('comid'),
        })
      )
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          console.log(response);
          this.querylist();
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "修改未成功，请联系管理员",
          });
        });
    },
    handleClick(row) {
      this.viewform.idname = row.idname;
      this.viewform.name = row.name;
      this.viewform.profile = row.profile;
      this.viewform.legal = row.legal;
      this.viewform.phone = row.phone;
      this.viewform.fax = row.fax;
      this.viewform.addres = row.addres;
      this.viewform.code = row.code;
      this.viewform.note = row.note;
      // console.log(row)
    },
    headClass() {
      return "text-align:center";
    },
    rowClass() {
      return "text-align:center";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    deletes(row) {
      // debugger;
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletesrwd({
            ID: row.TaskBillID,
          })
            .then((response) => {
              // alert("1  ")
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.querylist();
              // const gonsixinxi=this.$refs.gonsixinxi
              // gonsixinxi.querylist()
            })
            .catch((error) => {
              this.$message({
                message: "删除未成功，请联系管理员",
                type: "error",
              });
            });
        })
        .catch((error) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    export(){
        export2Excel(this.columns,this.tableData)
    }
  },
  mounted(){
    this.querylist()
    // 打开页面就执行的方法
  },
};
</script>

<style>
.el-table {
  color: #606266;
}
.el-table th {
  text-align: center;
}
/* ::-webkit-scrollbar {
  height: 18px;
} */
::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(249, 182, 3, 0.67);
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: 0;
  border-radius: 0;
  background: #e2b94862;
}
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