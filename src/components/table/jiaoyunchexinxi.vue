<template>
  <!--  :header-cell-style="{background:'rgb(0 0 0 / 67%)',color:'#606266'}"
修改表头背景颜色
  -->
<div>
  <el-dialog title="编辑" v-dialogDrag :visible.sync="editordialog" width="35%"  :before-close="handleClose">
    <div style="width:95%">
      <el-form :label-position="editorlabel" label-width="80px" :model="editorform">
  <el-form-item label="车号">
    <el-input v-model="editorform.ID"></el-input>
  </el-form-item>
  <el-form-item label="车牌 ">
    <el-input v-model="editorform.CarOwner"></el-input>
  </el-form-item>
  <el-form-item label="默认司机">
    <el-input v-model="editorform.DriverName"></el-input>
  </el-form-item>
    <el-form-item label="车辆所属">
    <el-input v-model="editorform.CarType"></el-input>
  </el-form-item>
    <el-form-item label="容量(m³)">
    <el-input v-model="editorform.CarSquareMax"></el-input>
  </el-form-item>
  <el-form-item label="皮重(kg)">
    <el-input v-model="editorform.CarPWeight"></el-input>
  </el-form-item>
  <el-form-item label="特殊运输">
    <el-input v-model="editorform.CarSpeed"></el-input>
  </el-form-item>
  <el-form-item label="定位编号">
    <el-input v-model="editorform.GPSCardID"></el-input>
  </el-form-item>
  <el-form-item label="备注">
    <el-input v-model="editorform.Remark"></el-input>
  </el-form-item>
</el-form>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button
          icon="el-icon-close"
          @click="(editordialog = false), modifyfalse()"
          >取 消</el-button
        >
        <el-button
          icon="el-icon-check"
          type="primary"
          @click="(editordialog = false), modify()"
          >确 定</el-button
        >
      </span>
  </el-dialog>
<div class="table">
        <el-table
        v-loading="loading"
        :header-cell-style="{  background: 'rgba(249, 182, 3, 0.67)', color: '#606266' }"
        :data="tableData"
        border
        :cell-style="rowClass"
        style="width: 100%"
      >
        <el-table-column fixed="left" label="序号" width="70px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="ID" label="车号" width="">
        </el-table-column>
        <el-table-column prop="CarOwner" label="车牌" width="">
        </el-table-column>
        <el-table-column prop="DriverName" label="默认司机" width="">
        </el-table-column>
        <el-table-column prop="CarType" label="车辆所属" width="">
        </el-table-column>
        <el-table-column prop="CarSquareMax" label="容量(m³)" width="">
         </el-table-column>
         <el-table-column prop="CarPWeight" label="皮重(kg)" width="">
         </el-table-column>
         <el-table-column prop="CarSpeed" label="特殊运输" width="">
         </el-table-column>
         <el-table-column prop="GPSCardID" label="定位编号" width="">
         </el-table-column>
         <el-table-column prop="Remark" label="备注" width="">
         </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button style="color: rgb(0 0 0 / 67%)" type="text" size="small"
             @click="editorClick(scope.row),editordialog=true"
              >编辑</el-button
            >
            <el-button style="color: rgb(0 0 0 / 67%)" type="text" size="small"
             @click="deletes(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
</div>
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
</template>

<script>
import {querylistjyc , addjyc , deletesjyc , modifyjyc} from '@/api/user.js'
export default {
    data() {
    return {
      loading: false,
      total: 0,
      size: 10,
      page: 1,
        editorform:{
          ID: "",
          CarOwner: "",
          DriverName: "",
          CarType: "",
          CarSquareMax: "",
          CarPWeight: "",
          CarSpeed: "",
          GPSCardID: "",
          Remark: "",
          CompanyID:'',
          ActionUserID :'',
          ActionUserName:''
        },  
      tableData: [
        {
          ID: "",
          CarOwner: "",
          DriverName: "",
          CarType: "",
          CarSquareMax: "",
          CarPWeight: "",
          CarSpeed: "",
          GPSCardID: "",
          Remark: "",
        }
      ],
      viewdialog: false,
      editordialog:false,
    };
  },
  methods: {
    editorClick(row){
    this.editorform.ID = row.ID
    this.editorform.CarOwner = row.CarOwner
    this.editorform.DriverName = row.DriverName
    this.editorform.CarType = row.CarType
    this.editorform.CarSquareMax = row.CarSquareMax
    this.editorform.CarPWeight = row.CarPWeight
    this.editorform.CarSpeed = row.CarSpeed
    this.editorform.GPSCardID = row.GPSCardID
    this.editorform.Remark = row.Remark
    this.editorform.CompanyID = row.CompanyID
    this.editorform.ActionUserID = row.ActionUserID
    this.editorform.ActionUserName = row.ActionUserName
    },
    headClass() {
      return "text-align:center";
    },
    rowClass() {
      return "text-align:center";
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    querylist(){
      this.loading=true
        querylistjyc({
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
      modifyjyc(
        JSON.stringify({
          ID:this.editorform.ID,
          CarOwner:this.editorform.CarOwner,
          DriverName:this.editorform.DriverName,
          CarType:this.editorform.CarType,
          CarSquareMax:this.editorform.CarSquareMax,
          CarPWeight:this.editorform.CarPWeight,
          CarSpeed:this.editorform.CarSpeed,
          GPSCardID:this.editorform.GPSCardID,
          Remark:this.editorform.Remark,
          CompanyID:this.editorform.CompanyID,
          ActionUserID:this.editorform.ActionUserID,
          ActionUserName:this.editorform.ActionUserName
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
          deletesjyc({
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
     handleSizeChange(val) {
      console.log(val);
      this.size = val;
      this.querylist();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.querylist();
    },
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
</style>