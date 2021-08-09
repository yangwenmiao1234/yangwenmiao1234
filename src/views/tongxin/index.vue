<template>
  <!--  :header-cell-style="{background:'rgb(0 0 0 / 67%)',color:'#606266'}"
修改表头背景颜色
  -->
  <div class="body">
    <el-dialog v-dialogDrag title="编辑" :visible.sync="editordialog">
      <el-form
        :label-position="editorlabel"
        label-width="80px"
        :model="editorform"
      >
        <el-form-item label="公司编号">
          <el-input v-model="editorform.idname"></el-input>
        </el-form-item>
        <el-form-item label="公司全称">
          <el-input v-model="editorform.name"></el-input>
        </el-form-item>
        <el-form-item label="公司简介">
          <el-input v-model="editorform.profile"></el-input>
        </el-form-item>
        <el-form-item label="法定代表">
          <el-input v-model="editorform.legal"></el-input>
        </el-form-item>
        <el-form-item label="公司电话">
          <el-input v-model="editorform.phone"></el-input>
        </el-form-item>
        <el-form-item label="公司传真">
          <el-input v-model="editorform.fax"></el-input>
        </el-form-item>
        <el-form-item label="公司地址">
          <el-input v-model="editorform.addres"></el-input>
        </el-form-item>
        <el-form-item label="接口编码">
          <el-input v-model="editorform.code"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="editorform.note"></el-input>
        </el-form-item>
      </el-form>
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
        <el-table-column prop="idname" label="名称" width="">
        </el-table-column>
        <el-table-column prop="name" label="内网ip" width="">
        </el-table-column>
        <el-table-column prop="profile" label="端口" width="">
        </el-table-column>
        <el-table-column prop="legal" label="波特率" width="">
        </el-table-column>
        <el-table-column prop="phone" label="webService" width="">
        </el-table-column>
        <el-table-column prop="fax" label="通道号" width="">
        </el-table-column>
        <el-table-column prop="addres" label="用户" width=""> </el-table-column>
        <el-table-column prop="code" label="密码" width="">
        </el-table-column>
        <el-table-column prop="note" label="备注" width=""> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              style="color: rgb(0 0 0 / 67%)"
              type="text"
              size="small"
              @click="editorClick(scope.row), (editordialog = true)"
              >编辑</el-button
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
export default {
  data() {
    return {
      loading: false,
      total: 0,
      size: 10,
      page: 1,
      editorform: {
        idname: "",
        name: "",
        profile: "",
        legal: "",
        phone: "",
        fax: "",
        addres: "",
        code: "",
        note: "",
      },
      tableData: [
        {
          idname: "1",
          name: "1",
          profile: "1",
          legal: "1",
          phone: "1",
          fax: "1",
          addres: "1",
          code: "1",
          note: "1",
        },
        {
          idname: "1",
          name: "1",
          profile: "1",
          legal: "1",
          phone: "1",
          fax: "1",
          addres: "1",
          code: "1",
          note: "1",
        },
        {
          idname: "1",
          name: "1",
          profile: "1",
          legal: "1",
          phone: "1",
          fax: "1",
          addres: "1",
          code: "1",
          note: "1",
        },
        {
          idname: "1",
          name: "1",
          profile: "1",
          legal: "1",
          phone: "1",
          fax: "1",
          addres: "1",
          code: "1",
          note: "1",
        },
      ],
      viewdialog: false,
      editordialog: false,
    };
  },
  methods: {
    editorClick(row) {
      this.editorform.idname = row.idname;
      this.editorform.name = row.name;
      this.editorform.profile = row.profile;
      this.editorform.legal = row.legal;
      this.editorform.phone = row.phone;
      this.editorform.fax = row.fax;
      this.editorform.addres = row.addres;
      this.editorform.code = row.code;
      this.editorform.note = row.note;
    },
    headClass() {
      return "text-align:center";
    },
    rowClass() {
      return "text-align:center";
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
     querylist(){
      this.loading=true
        querylistxsdgl({
        page: this.page,
        intPageSize: this.size,
         Comid:localStorage.getItem('comid')
      })
        .then((response) => {
          this.tableData = response.data;
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
        id:this.addform.id,
        supplyTimeSellBill:this.addform.supplyTimeSellBill,
        projectCaption:this.addform.projectCaption,
        projectAddress:this.addform.projectAddress,
        projectManager:this.addform.projectManager,
        projectTelephone:this.addform.projectTelephone,
        projectDistance:this.addform.projectDistance,
        // isMustSquarePlan:this.addform.isMustSquarePlan,
        projectSuperviseID:this.addform.projectSuperviseID,
        // stateFlag:this.addform.stateFlag,
        delegateCompany:this.addform.delegateCompany,
        execCompany:this.addform.execCompany,
        pageID:this.addform.pageID,
        actionUserID:this.addform.actionUserID,
        actionUserName:this.addform.actionUserName,
        sellPerson:this.addform.sellPerson,
        squarePlanSellBill:this.addform.squarePlanSellBill,
        remark:this.addform.remark,
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
            id: row.id,
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
  },
  mounted: {
    // 打开页面就执行的方法
  },
};
</script>

<style>
.body {
  padding: 20px;
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
</style>