<template>
  <!--  :header-cell-style="{background:'rgb(0 0 0 / 67%)',color:'#606266'}"
修改表头背景颜色
  -->
<div>
  <el-dialog title="编辑" width="30%" :visible.sync="editordialog"  :before-close="handleClose">
    <div class="body_dialog">
      <el-form :label-position="editorlabel" label-width="80px" :model="editorform">
  <el-form-item label="名称">
    <el-input v-model="editorform.Caption"></el-input>
  </el-form-item>
  <el-form-item label="类型">
  <el-select style="width:110px" @change="queryselecttree()" v-model="TypeMaterialID" filterable placeholder="请选择">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.title"
      :value="item.value">
    </el-option>
  </el-select>
  <el-select style="width:110px;margin-left:3%" v-model="TypeMaterialItemID" filterable placeholder="请选择">
    <el-option
      v-for="item in options2"
      :key="item.value"
      :label="item.title"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
    <el-form-item label="密度">
    <el-input v-model="editorform.Density"></el-input>
  </el-form-item>
    <el-form-item label="产地">
    <el-input v-model="editorform.AddressProduce"></el-input>
  </el-form-item>
    <el-form-item label="等级">
    <el-input v-model="editorform.MaterialGrade"></el-input>
  </el-form-item>
    <el-form-item label="型号规格">
    <el-input v-model="editorform.MaterialModel"></el-input>
  </el-form-item>
    <el-form-item label="接口编码">
    <el-input v-model="editorform.InterfaceID"></el-input>
  </el-form-item>
    <el-form-item label="备注">
    <el-input v-model="editorform.Remark"></el-input>
  </el-form-item>
</el-form>
    </div>
<span slot="footer" class="dialog-footer">
              <el-button @click="editordialog = false">取 消</el-button>
              <el-button type="primary" @click="(editordialog = false),modify()"
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
        <el-table-column prop="Caption" label="名称" width="">
        </el-table-column>
        <el-table-column prop="TypeMaterialID" label="类型" width="">
        </el-table-column>
        <el-table-column prop="Density" label="密度" width="">
        </el-table-column>
        <el-table-column prop="AddressProduce" label="产地" width="">
        </el-table-column>
        <el-table-column prop="MaterialGrade" label="等级" width="">
        </el-table-column>  
        <el-table-column prop="MaterialModel" label="型号规格" width="">
        </el-table-column>
        <el-table-column prop="InterfaceID" label="接口编码" width="">
        </el-table-column>
        <el-table-column prop="Remark" label="备注" width=""> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100px">
          <template slot-scope="scope">
            <el-button style="color: rgb(0 0 0 / 67%)" type="text" size="small"
             @click="querylisttree(),editorClick(scope.row),editordialog=true"
              >编辑</el-button
            >
            <el-button style="color: rgb(0 0 0 / 67%)" type="text" size="small"
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
import { querylistylxx , addylxx , deletesylxx , modifyylxx } from '@/api/user.js'
import { querylisttree , querylisttree2 } from '@/api/tree.js'
export default {
    data() {
    return {
      value3:"HGEMS",
      loading: false,
      total: 0,
      size: 10,
      page: 1,
        editorform:{
          Caption: "",
          Density: "",
          AddressProduce: "",
          MaterialGrade: "",
          MaterialModel: "",
          InterfaceID: "",
          Remark: "",
          ID:'',
        },
      tableData: [
        {
          CompanyID: "",
          ID: "",
          TypeMaterialID: "",
          Density: "",
          AddressProduce: "",
          MaterialGrade: "",
          MaterialModel: "",
          InterfaceID: "",
          Remark: "",
        }
      ],
      options1: [{
          value: '',
          label: '',
          title:"",
        },],
        TypeMaterialID: '',
        options2: [{
          value: '',
          label: '',
          title: '',
        },],
        TypeMaterialItemID: '',
      viewdialog: false,
      editordialog:false,
    };
  },
  methods: {
    deletes(row){
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          deletesylxx({
            ID:row.ID,
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
    querylist(){
      querylistylxx({
         page: this.page,
         intPageSize: this.size,
         Comid:localStorage.getItem('comid'),
         TypeMaterialID:this.value3
      }).then((response) => {
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
      modifyylxx(
      JSON.stringify({
      CompanyID:localStorage.getItem('comid'),
      TypeMaterialID:this.TypeMaterialID,
      Density:this.editorform.Density,
      AddressProduce:this.editorform.AddressProduce,
      MaterialGrade:this.editorform.MaterialGrade,
      MaterialModel:this.editorform.MaterialModel,
      InterfaceID:this.editorform.InterfaceID,
      Remark:this.editorform.Remark,
      Caption:this.editorform.Caption,
      TypeMaterialItemID:this.TypeMaterialItemID,
      ActionUserID :localStorage.getItem('ActionUserID'),
      ActionUserName :localStorage.getItem('ActionUserName'),
      ID :this.editorform.ID
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
    editorClick(row){
      this.TypeMaterialID = row.TypeMaterialID
      this.TypeMaterialItemID = row.TypeMaterialItemID
      this.editorform.Density = row.Density
      this.editorform.AddressProduce = row.AddressProduce
      this.editorform.MaterialGrade = row.MaterialGrade
      this.editorform.MaterialModel = row.MaterialModel
      this.editorform.InterfaceID = row.InterfaceID
      this.editorform.Remark = row.Remark
      this.editorform.Caption = row.Caption
      this.editorform.ID = row.ID
    },
    querylisttree(){
        querylisttree({
          Comid : localStorage.getItem('comid')
        }).then((response)=>{
          this.options1 = response.data
        })
      },
    queryselecttree(){
        querylisttree2({
           comid : localStorage.getItem('comid'),
           typeMaterialID : this.TypeMaterialID,
        }).then((response)=>{
           this.options2 = response.data
        })
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
.body_dialog{
  width: 90%;
}
</style>