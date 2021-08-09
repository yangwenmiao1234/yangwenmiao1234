<template>
  <!--  :header-cell-style="{background:'rgb(0 0 0 / 67%)',color:'#606266'}"
修改表头背景颜色
  -->
  <div style="width:100%">
    <div>
      <el-dialog title="详情" v-dialogDrag :visible.sync="viewdialog"  :before-close="handleClose">
      <el-form :label-position="viewlabel" label-width="80px" :model="viewform">
        <el-form-item label="料仓编号">
          <el-input v-model="viewform.idname"></el-input>
        </el-form-item>
        <el-form-item label="料仓全称">
          <el-input v-model="viewform.name"></el-input>
        </el-form-item>
        <el-form-item label="原料名称">
          <el-input v-model="viewform.profile"></el-input>
        </el-form-item>
        <el-form-item label="最大容量">
          <el-input v-model="viewform.legal"></el-input>
        </el-form-item>
        <el-form-item label="库存单位">
          <el-input v-model="viewform.phone"></el-input>
        </el-form-item>
        <el-form-item label="库存精确位">
          <el-input v-model="viewform.fax"></el-input>
        </el-form-item>
        <el-form-item label="数字编号">
          <el-input v-model="viewform.addres"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="viewform.note"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑" v-dialogDrag :visible.sync="editordialog"  :before-close="handleClose">
      <el-form
        :label-position="editorlabel"
        label-width="80px"
        :model="editorform"
      >
        <el-form-item label="料仓编号">
          <el-input v-model="editorform.ID"></el-input>
        </el-form-item>
        <el-form-item label="料仓全称">
          <el-input v-model="editorform.CompanyID"></el-input>
        </el-form-item>
        <el-form-item label="原料名称">
          <el-input v-model="editorform.Caption"></el-input>
        </el-form-item>
        <el-form-item label="最大容量">
          <el-input v-model="editorform.storeWeightUnit"></el-input>
        </el-form-item>
        <el-form-item label="库存单位">
          <el-input v-model="editorform.materialID"></el-input>
        </el-form-item>
        <el-form-item label="库存精确位">
          <el-input v-model="editorform.TypeMaterialID"></el-input>
        </el-form-item>
        <el-form-item label="数字编号">
          <el-input v-model="editorform.storeWeightPointNum"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="editorform.storeWeightMax"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button
          icon="el-icon-close"
          @click="(editordialog = false)"
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
    </div>
    <div class="table" style="width:100%">
      <el-table
      v-loading="loading"
        :header-cell-style="{  background: 'rgba(249, 182, 3, 0.67)', color: '#606266' }"
        :data="tableData"
        border
        :cell-style="rowClass"
        style="width:100%"
      >
        <el-table-column fixed="left" label="序号" width="50px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="ID" label="料仓编号" width="">
        </el-table-column>
        <el-table-column prop="CompanyID" label="料仓全称" width="">
        </el-table-column>
        <el-table-column prop="Caption" label="原料名称" width="">
        </el-table-column>
        <el-table-column prop="storeWeightUnit" label="最大容量" width="">
        </el-table-column>
        <el-table-column prop="materialID" label="库存单位" width="">
        </el-table-column>
        <el-table-column prop="TypeMaterialID" label="库存精确位" width="">
        </el-table-column>
        <el-table-column prop="storeWeightPointNum" label="数字编号" width="">
        </el-table-column>
        <el-table-column prop="storeWeightMax" label="备注" width="">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150px">
          <template slot-scope="scope">
            <el-button
              style="color: rgb(0 0 0 / 67%)"
              @click="handleClick(scope.row), (viewdialog = true)"
              type="text"
              size="small"
              >查看</el-button
            >
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

import {querylistlcxx , deleteslcxx , modifylcxx}  from '@/api/user.js'
export default {
  data() {
    return {
      total: 0,
      loading: false,
      page: 1,
      size: 10,
      viewform: {
        
      },
      editorform: {
        ID:'',
        CompanyID:'',
        Caption:'',
        storeWeightUnit:'',
        materialID:'',
        TypeMaterialID:'',
        storeWeightPointNum:'',
        storeWeightMax:'',
      },
      tableData: [
        {
          ID: "",
          CompanyID: "",
          Caption: "",
          TypeMaterialID: "",
          MaterialID: "",
          storeWeightUnit: "",
          storeWeightPointNum: "",
          storeWeightMax: "",
        }
      ],
      viewdialog: false,
      editordialog: false,
    };
  },
  methods: {
     querylist() {
      this.loading = true;
      // console.log(document.getElementById("#123 #1234"))
      let self = this;
      querylistlcxx({
        page: this.page,
        intPageSize: this.size,
         Comid:localStorage.getItem('comid')
      })
        .then((response) => {
          this.tableData = response.data.data;
          console.log(response.data.data)
          this.page = response.data.page;
          this.size = response.data.PageSize;
          this.total = response.data.dataCount;
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
     deletes(row) {
      // debugger;
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteslcxx({
            id: row.ID,
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
    modify() {
      modifylcxx(
        JSON.stringify({
          ID: this.editorform.ID,
          CompanyID: this.editorform.CompanyID,
          Caption: this.editorform.Caption,
          storeWeightUnit: this.editorform.storeWeightUnit,
          materialID: this.editorform.materialID,
          TypeMaterialID: this.editorform.TypeMaterialID,
          storeWeightPointNum: this.editorform.storeWeightPointNum,
          // companyImage:this.putform.CompanyImage,
          storeWeightMax: this.editorform.storeWeightMax,
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
    editorClick(row) {
      this.editorform.ID = row.ID;
      this.editorform.CompanyID = row.CompanyID;
      this.editorform.Caption = row.Caption;
      this.editorform.storeWeightUnit = row.storeWeightUnit;
      this.editorform.materialID = row.materialID;
      this.editorform.TypeMaterialID = row.TypeMaterialID;
      this.editorform.storeWeightPointNum = row.storeWeightPointNum;
      this.editorform.storeWeightMax = row.storeWeightMax;
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
.el-alert_content{
  display: table-cell;
  padding: 0 0.5rem;
  width: 100%;
}
</style>