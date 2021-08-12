<template>
  <!--  :header-cell-style="{background:'rgb(0 0 0 / 67%)',color:'#606266'}"
修改表头背景颜色
  -->
  <div class="body" style="width: 100%">
    <el-dialog
    v-dialogDrag
      title="详情"
      :visible.sync="viewdialog"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        label-width="80px"
        :model="viewform"
      >
        <div class="chakanform-1">
          <el-form-item label="名称">
            <el-input v-model="viewform.AutoID"></el-input>
          </el-form-item>
          <el-form-item label="主机方量">
            <el-input v-model="viewform.CompanyID"></el-input>
          </el-form-item>
          <el-form-item label="设备品牌">
            <el-input v-model="viewform.ID"></el-input>
          </el-form-item>
          <el-form-item label="设备型号">
            <el-input v-model="viewform.Caption"></el-input>
          </el-form-item>
          <el-form-item label="接口编码">
            <el-input v-model="viewform.MachineSquare"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="viewform.MachineBrand"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewdialog = false">取 消</el-button>
        <el-button type="primary" @click="viewdialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
    v-dialogDrag
      title="编辑"
      :visible.sync="editordialog"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        label-width="80px"
        :model="editorform"
      >
        <div class="editorform-1">
            <el-form-item label="名称">
              <el-input v-model="editorform.caption"></el-input>
            </el-form-item>
            <el-form-item label="主机方量">
              <el-input v-model="editorform.machineSquare"></el-input>
            </el-form-item>
            <el-form-item label="value值">
              <el-input v-model="editorform.value"></el-input>
            </el-form-item>
            <el-form-item label="设备品牌">
              <el-input v-model="editorform.machineBrand"></el-input>
            </el-form-item>
            <el-form-item label="设备型号">
              <el-input v-model="editorform.machineModel"></el-input>
            </el-form-item>
            <el-form-item label="接口编码">
              <el-input v-model="editorform.interfaceID"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="editorform.remark"></el-input>
            </el-form-item>
          </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editordialog = false">取 消</el-button>
        <el-button type="primary" @click="(editordialog = false), modify()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div>
      <el-table
        v-loading="loading"
        :header-cell-style="{  background: 'rgba(249, 182, 3, 0.67)',color: '#606266'}"
        :data="tableData"
        border
        :cell-style="rowClass"
        style="width: 100%"
      >
        <el-table-column fixed="left" label="编号" width="70px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="Caption" label="名称" width=""> </el-table-column>
        <el-table-column prop="MachineSquare" label="主机方量" width="">
        </el-table-column>
        <el-table-column prop="MachineBrand" label="设备品牌" width=""> </el-table-column>
        <el-table-column prop="MachineModel" label="设备型号" width="">
        </el-table-column>
        <el-table-column prop="InterfaceID" label="接口编码" width="">
        </el-table-column>
        <el-table-column prop="Remark" label="备注" width="">
        </el-table-column>
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
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
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
import {
  queryshenchanxianxinxi,
  addshenchanxianxinxi,
  modifyscxxx,
  deletescxxx,
} from "@/api/user";
export default {
  data() {
    return {
      adddialog: false,
      loading: false,
      total: 0,
      size: 10,
      page: 1,
      viewform: {
        AutoID: "",
        CompanyID: "",
        ID: "",
        Caption: "",
        MachineSquare: "",
        MachineBrand: "",
      },
      editorform: {
        caption: "",
        machineSquare: "",
        machineBrand: "",
        machineModel: "",
        interfaceID: "",
        remark: "",
        value:'',
      },
      tableData: [
        {
          AutoID: "",
          CompanyID: "",
          ID: "",
          Caption: "",
          machineSquare: "",
          machineBrand: "",
          machineModel: "",
        },
      ],
      viewdialog: false,
      editordialog: false,
    };
  },
  methods: {
    querylist() {
      this.loading = true;
      queryshenchanxianxinxi({
        page: this.page,
        intPageSize: this.size,
        Comid:localStorage.getItem('comid')
      })
        .then((response) => {
          this.tableData = response.data.data;
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
    editorClick(row) {
      this.editorform.caption = row.Caption;
      this.editorform.machineSquare = row.MachineSquare;
      this.editorform.machineModel = row.MachineModel;
      this.editorform.machineBrand = row.MachineBrand;
      this.editorform.interfaceID = row.InterfaceID;
      this.editorform.remark = row.Remark;
    },
    modify() {
      modifyscxxx(
        JSON.stringify({
          MachineBrand: this.editorform.machineBrand,
          CompanyID: localStorage.getItem('comid'),
          ID: this.editorform.value,
          Caption: this.editorform.caption,
          MachineSquare: this.editorform.machineSquare,
          InterfaceID: this.editorform.interfaceID,
          MachineModel: this.editorform.machineModel,
          Remark: this.editorform.remark,
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
          deletescxxx({
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
    handleClick(row) {
      this.viewform.AutoID = row.AutoID;
      this.viewform.CompanyID = row.CompanyID;
      this.viewform.ID = row.ID;
      this.viewform.Caption = row.Caption;
      this.viewform.MachineSquare = row.MachineSquare;
      this.viewform.MachineBrand = row.MachineBrand;
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
  mounted() {
    // 打开页面就执行的方法
    this.querylist();
  },
};
</script>

<style>
.body {
  width: 100%;
}
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
.addform-1 {
  width: 80%;
  margin-left: 5%;
}
.chakanform-1 {
  width: 80%;
  margin-left: 5%;
}
.editorform-1 {
  width: 80%;
  margin-left: 5%;
}
</style>