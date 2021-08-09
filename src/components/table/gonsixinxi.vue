<template>
  <!--  :header-cell-style="{background:'rgb(0 0 0 / 67%)',color:'#606266'}"
修改表头背景颜色
  -->
  <div>
    <el-dialog
      title="修改公司信息"
      :visible.sync="putdialog"
      width="40%"
      v-dialogDrag
      :before-close="handleClose"
    >
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="putform"
      >
        <div class="" style="display: flex">
          <div>
            <el-form-item label="公司编号">
              <el-input v-model="putform.ID"></el-input>
            </el-form-item>
            <el-form-item label="公司全称">
              <el-input v-model="putform.Caption"></el-input>
            </el-form-item>
            <el-form-item label="公司简介">
              <el-input v-model="putform.MinName"></el-input>
            </el-form-item>
            <el-form-item label="法定代表">
              <el-input v-model="putform.ParentCompanyID"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="putform.CompanyImage"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="公司电话">
              <el-input v-model="putform.CompanyPhone"></el-input>
            </el-form-item>
            <el-form-item label="公司传真">
              <el-input v-model="putform.CompanyFax"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="putform.CompanyAddress"></el-input>
            </el-form-item>
            <el-form-item label="接口编码">
              <el-input v-model="putform.CompanyManager"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          icon="el-icon-close"
          @click="(putdialog = false), modifyfalse()"
          >取 消</el-button
        >
        <el-button
          icon="el-icon-check"
          type="primary"
          @click="(putdialog = false), modify()"
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
        <el-table-column prop="ID" label="公司编号" width=""> </el-table-column>
        <el-table-column prop="Caption" label="公司全称" width="">
        </el-table-column>
        <el-table-column prop="MinName" label="公司简介" width="">
        </el-table-column>
        <el-table-column prop="ParentCompanyID" label="法定代表" width="">
        </el-table-column>
        <el-table-column prop="CompanyPhone" label="公司电话" width="">
        </el-table-column>
        <el-table-column prop="CompanyFax" label="公司传真" width="">
        </el-table-column>
        <el-table-column prop="CompanyAddress" label="公司地址" width="">
        </el-table-column>
        <el-table-column prop="CompanyManager" label="接口编码" width="">
        </el-table-column>
        <el-table-column prop="CompanyManager" label="备注" width="120px">
        </el-table-column>
        <el-table-column fixed="right" prop="play" label="操作" width="120px">
          <template slot-scope="scope">
            <el-button
              style="color: rgb(0 0 0 / 67%)"
              type="text"
              size="small"
              icon="el-icon-edit"
              @click="editorClick(scope.row), (putdialog = true)"
              >编辑</el-button
            >
            <el-button
              style="color: rgb(0 0 0 / 67%)"
              type="text"
              size="small"
              icon="el-icon-delete"
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
import {
  gonsixin,
  addgonsixinxi,
  modifygonsixin,
  deletegonsixinxi,
} from "@/api/user";
export default {
  // gonsixin
  data() {
    return {
      total: 0,
      loading: false,
      page: 1,
      size: 10,
      putform: {
        ID: "",
        Caption: "",
        MinName: "",
        ParentCompanyID: "",
        CompanyPhone: "",
        CompanyFax: "",
        CompanyAddress: "",
        CompanyManager: "",
        CompanyImage: "",
      },
      putdialog: false,
      tableData: [
        {
          ID: "",
          Caption: "",
          MinName: "",
          ParentCompanyID: "",
          CompanyPhone: "",
          CompanyFax: "",
          CompanyAddress: "",
          CompanyManager: "",
          CompanyImage: "",
          play: "",
        },
      ],
    };
  },
  methods: {
    querylist() {
      this.loading = true;
      // console.log(document.getElementById("#123 #1234"))
      let self = this;
      gonsixin({
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
    modify() {
      modifygonsixin(
        JSON.stringify({
          id: this.putform.ID,
          caption: this.putform.Caption,
          minName: this.putform.MinName,
          parentCompanyID: this.putform.ParentCompanyID,
          companyPhone: this.putform.CompanyPhone,
          companyFax: this.putform.CompanyFax,
          companyAddress: this.putform.CompanyAddress,
          // companyImage:this.putform.CompanyImage,
          companyManager: this.putform.CompanyManager,
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
      (this.putform.ID = row.ID),
        (this.putform.Caption = row.Caption),
        (this.putform.MinName = row.MinName),
        (this.putform.ParentCompanyID = row.ParentCompanyID),
        (this.putform.CompanyPhone = row.CompanyPhone),
        (this.putform.CompanyFax = row.CompanyFax),
        (this.putform.CompanyAddress = row.CompanyAddress),
        (this.putform.CompanyManager = row.CompanyManager),
        (this.putform.CompanyImage = row.CompanyImage);
    },
    deletes(row) {
      // debugger;
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletegonsixinxi({
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
    modifyfalse() {
      this.$message({
        message: "已取消编辑",
      });
    },
    handleClick(row) {
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
  mounted() {
    // 打开页面就执行的方法
    this.querylist();
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