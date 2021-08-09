<template>
  <!--  :header-cell-style="{background:'rgb(0 0 0 / 67%)',color:'#606266'}"
修改表头背景颜色
  -->
  <div>
    <el-dialog
    v-dialogDrag
            title="修改"
            :visible.sync="editordialog"
            width="55%"
            :before-close="handleClose"
          >
            <el-form
              :label-position="editorlabel"
              label-width="80px"
              :model="editorform"
            >
              <div style="display:flex">
                  <div class="body-dialog-form-1">
                <el-form-item label="销售单号">
                  <el-input v-model="editorform.ID"></el-input>
                </el-form-item>
                    <span class="body-span-2">供货时间：</span>
                    <el-date-picker
                     class="body-picker-1"
                    v-model="editorform.SupplyTimeSellBill"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions">
                    </el-date-picker>
                <el-form-item class="body-form-2" label="印刷票号">
                  <el-input v-model="editorform.CompanyID"></el-input>
                </el-form-item>
                <span class="body-span-3">任务来源：</span>
              <el-select v-model="editorform.TaskSource" filterable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
                <el-form-item  class="body-form-4" label="工程监督号">
                  <el-input v-model="editorform.ProjectSuperviseID"></el-input>
                </el-form-item>
                <el-form-item label="合同编号">
                  <el-input v-model="editorform.ActionUserID"></el-input>
                </el-form-item>
                <el-form-item label="供货方量">
                  <el-input v-model="editorform.IsMustSquarePlan"></el-input>
                </el-form-item>
                <el-checkbox class="body-checkbox-2" v-model="checked2">严格控制生产方量</el-checkbox>
              </div>
              <div class="body-dialog-form-2">
                <el-form-item label="工程名称">
                  <el-input v-model="editorform.ProjectCaption"></el-input>
                </el-form-item>
                <el-form-item label="工程地点">
                  <el-input v-model="editorform.ProjectAddress"></el-input>
                </el-form-item>
                <el-form-item label="施工单位">
                  <el-input v-model="editorform.ExecCompany"></el-input>
                </el-form-item>
                <el-form-item label="委托单位">
                  <el-input v-model="editorform.DelegateCompany"></el-input>
                </el-form-item>
                <el-form-item label="运距(km)">
                  <el-input v-model="editorform.ProjectDistance"></el-input>
                </el-form-item>
                <el-form-item label="合同名称">
                  <el-input v-model="editorform.ActionUserName"></el-input>
                </el-form-item>
                <el-form-item label="销售人员">
                  <el-input v-model="editorform.SellPerson"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="editorform.Remark"></el-input>
                </el-form-item>
              </div>
              </div>
              <div class="addform-1">
                <el-form-item label="联系人员">
                  <el-input v-model="editorform.ProjectManager"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                  <el-input v-model="editorform.ProjectTelephone"></el-input>
                </el-form-item>
              </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editordialog = false">取 消</el-button>
              <el-button type="primary" @click="(editordialog = false),modify()"
                >确 定</el-button
              >
            </span>
          </el-dialog>
    <div class="table">
      <el-table
       ref="singleTable"
        @row-dblclick="addrwd"
        height="500px"
       v-loading="loading"
        :header-cell-style="{  background: 'rgba(249, 182, 3, 0.67)', color: '#606266' }"
        :data="tableData"
        border
        :cell-style="rowClass"
        style="width: 100%"
        highlight-current-row
        @row-click="handleClickRow"
      >
        <el-table-column fixed="left" label="序号" width="50px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="ID" label="销售单号" width="80px">
        </el-table-column>
        <el-table-column prop="SupplyTimeSellBill" label="供货日期" width="150px">
        </el-table-column>
        <el-table-column prop="ProjectCaption" label="工程名称" width="">
        </el-table-column>
        <el-table-column prop="ProjectAddress" label="工程地点" width="">
        </el-table-column>
        <el-table-column prop="ProjectManager" label="联系人员" width="">
        </el-table-column>
        <el-table-column prop="ProjectTelephone" label="联系电话" width="">
        </el-table-column>
        <el-table-column prop="ProjectDistance" label="运距(km)" width="">
        </el-table-column>
        <el-table-column prop="IsMustSquarePlan" label="计划方量" width="">
        </el-table-column>
        <el-table-column prop="ProjectSuperviseID" label="工程监督号" width="100px">
        </el-table-column>
        <el-table-column prop="TaskSource" label="任务来源" width="">
        </el-table-column>
        <el-table-column prop="DelegateCompany" label="委托单位" width="">
        </el-table-column>
        <el-table-column prop="ExecCompany" label="施工单位" width="">
        </el-table-column>
        <el-table-column prop="CompanyID" label="印刷票号" width="">
        </el-table-column>
        <el-table-column prop="ActionUserID" label="合同编号" width="">
        </el-table-column>
        <el-table-column prop="ActionUserName" label="合同名称" width="">
        </el-table-column>
        <el-table-column prop="SellPerson" label="销售人员" width="">
        </el-table-column>
        <el-table-column prop="SquarePlanSellBill" label="严控生产" width="">
        </el-table-column>
        <el-table-column prop="Remark" label="备注" width="">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120px">
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
    <!-- <div>
      <Rwd ref="renwudan" v-show="false">
      </Rwd>
    </div> -->
    <div>
      <Index ref="Index" v-show="false">
      </Index>
    </div>
  </div>
</template>

<script>
import {
  querylistxsdgl,
  addxsdgl,
  deletesxsdgl,
  modifyxsdgl,
  upxsd
} from "@/api/user";
import { export2Excel } from '@/common/js/util'
import Index from "@/views/shengchanguanli/renwudan/dialog.vue"  
import Rwd from '@/components/table/renwudan.vue';
export default {
  components: { Rwd , Index },
  data() {
    return {
      ID:"",
      TaskSource:'',
      ProjectAddress:'',
      DelegateCompany:'',
      ExecCompany:'',
      ProjectCaption:"",
      columns:[
        {title:'销售单号',key:'ID'},
        {title:'供货日期',key:'SupplyTimeSellBill'},
        ],
      checked2:true,
      loading: false,
      total: 0,
      size: 10,
      page: 1,
      editorform: {
        ID:'',
        SupplyTimeSellBill:'',
        ProjectCaption: "",
        ProjectAddress: "",
        ProjectManager:"",
        ProjectTelephone: "",
        ProjectDistance:'',
        IsMustSquarePlan:'',
        ProjectSuperviseID:'',
        StateFlag:'',
        DelegateCompany:'',
        ExecCompany:'',
        CompanyID:'',
        ActionUserID:'',
        ActionUserName:'',
        SellPerson:'',
        SquarePlanSellBill:'',
        Remark: "",
        TaskSource:'',
      },
      tableData: [
        {
        ID:'',
        SupplyTimeSellBill:'',
        ProjectCaption: "",
        ProjectAddress: "",
        ProjectManager:"",
        ProjectTelephone: "",
        ProjectDistance:'',
        IsMustSquarePlan:'',
        ProjectSuperviseID:'',
        StateFlag:'',
        DelegateCompany:'',
        ExecCompany:'',
        PageID:'',
        ActionUserID:'',
        ActionUserName:'',
        SellPerson:'',
        SquarePlanSellBill:'',
        Remark: "",
        }
      ],
      currentRow: null,
      viewdialog: false,
      editordialog: false,
    };
  },
  methods: {
    querylist(){
      this.loading=true
        querylistxsdgl({
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
    modify() {
      modifyxsdgl(
        JSON.stringify({
        ID:this.editorform.ID,
        SupplyTimeSellBill:this.editorform.SupplyTimeSellBill,
        ProjectCaption:this.editorform.ProjectCaption,
        ProjectAddress:this.editorform.ProjectAddress,
        ProjectManager:this.editorform.ProjectManager,
        ProjectTelephone:this.editorform.ProjectTelephone,
        ProjectDistance:this.editorform.ProjectDistance,
        // isMustSquarePlan:this.addform.isMustSquarePlan,
        ProjectSuperviseID:this.editorform.ProjectSuperviseID,
        // stateFlag:this.addform.stateFlag,
        DelegateCompany:this.editorform.DelegateCompany,
        ExecCompany:this.editorform.ExecCompany,
        CompanyID:this.editorform.CompanyID,
        ActionUserID:this.editorform.ActionUserID,
        ActionUserName:this.editorform.ActionUserName,
        SellPerson:this.editorform.SellPerson,
        SquarePlanSellBill:this.editorform.SquarePlanSellBill,
        Remark:this.editorform.Remark,
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
    deletes(row) {
      // debugger;
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletesxsdgl({
            ID: row.ID,
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
    editorClick(row) {
      this.editorform.ID=row.ID
      this.editorform.SupplyTimeSellBill=row.SupplyTimeSellBill
      this.editorform.ProjectCaption=row.ProjectCaption
      this.editorform.ProjectAddress=row.ProjectAddress
      this.editorform.ProjectManager=row.ProjectManager
      this.editorform.ProjectTelephone=row.ProjectTelephone
      this.editorform.ProjectDistance=row.ProjectDistance
        // isMustSquarePlan:this.addform.isMustSquarePlan,
      this.editorform.ProjectSuperviseID=row.ProjectSuperviseID
        // stateFlag:this.addform.stateFlag,
      this.editorform.DelegateCompany=row.DelegateCompany
      this.editorform.ExecCompany=row.ExecCompany
      this.editorform.PageID=row.PageID
      this.editorform.ActionUserID=row.ActionUserID
      this.editorform.ActionUserName=row.ActionUserName
      this.editorform.SellPerson=row.SellPerson
      this.editorform.SquarePlanSellBill=row.SquarePlanSellBill
      this.editorform.Remark=row.Remark
    },
    addrwd(row){
      const aa = this.$refs.Index
      aa.addrwd()
      this.ID = row.ID
      aa.addform.SellBillID = this.ID
      aa.addform.TaskSource = row.TaskSource
      aa.addform.ProjectAddress = row.ProjectAddress
      aa.addform.DelegateCompany = row.DelegateCompany
      aa.addform.ExecCompany = row.ExecCompany
      aa.addform.ProjectCaption = row.ProjectCaption
    },
    handleClickRow(row){
      this.ID = row.ID
      this.TaskSource = row.TaskSource
      this.ProjectAddress = row.ProjectAddress
      this.DelegateCompany = row.DelegateCompany
      this.ExecCompany = row.ExecCompany
      this.ProjectCaption = row.ProjectCaption
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
    handleSizeChange(val) {
      this.size = val;
      this.querylist();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.querylist();
    },
    exportdata(){
        export2Excel(this.columns,this.tableData)
    }
  },
  mounted(){
    // 打开页面就执行的方法
    this.querylist()

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
.body-span-2{
  margin-left:6.5%
}
.body-form-2{
  margin-top:5%
}
.body-span-3{
  margin-left:6.5%
}
.body-form-4{
  margin-top:5%
}
.body-checkbox-2{
  margin-left:26%
}
.body-dialog-form-2{
  margin-left:3%;
  width:45%
}
.body-dialog-form-1{
  width:45%
}
.body-picker-1{
  width:210px;
  margin-left:0%
}
</style>