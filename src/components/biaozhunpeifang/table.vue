<template>
  <!--  :header-cell-style="{background:'rgb(0 0 0 / 67%)',color:'#606266'}"
修改表头背景颜色
  -->
<div>
  <el-dialog title="编辑" v-dialogDrag :visible.sync="editordialog"  :before-close="handleClose">
    <el-form :label-position="editorlabel" label-width="80px" :model="editorform">
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
        <el-table-column prop="Caption" label="配方名称" width="">
        </el-table-column>
        <el-table-column prop="TypePowerGrade" label="强度等级" width="">
        </el-table-column>
        <el-table-column prop="TypeProduct" label="搅拌时间" width="">
        </el-table-column>
        <el-table-column prop="TypeProduct" label="商品类型" width="">
        </el-table-column>
        <el-table-column prop="TypeSeepGrade" label="抗渗等级" width="">
        </el-table-column>
        <el-table-column prop="TypeSlump" label="坍落度" width="">
        </el-table-column>
        <el-table-column prop="TypeSandSize" label="砂粒径" width="">
        </el-table-column>
        <el-table-column prop="SerialNum" label="污水比例" width="">
        </el-table-column>
        <el-table-column prop="InterfaceID" label="接口编码" width="">
        </el-table-column>
        <el-table-column prop="Remark" label="备注" width=""> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              style="color: rgb(0 0 0 / 67%)"
              @click="handleClick(scope.row),viewdialog=true;"
              type="text"
              size="small"
              >查看</el-button
            >
            <el-button style="color: rgb(0 0 0 / 67%)" type="text" size="small"
             @click="editorClick(scope.row),editordialog=true"
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
        editorform:{
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
        }
      ],
      editordialog:false,
    };
  },
  methods: {
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
    querylist() {
      this.loading = true;
      shiyanshi({
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
    editorClick(row){
    this.editorform.idname = row.idname
     this.editorform.name = row.name
      this.editorform.profile = row.profile
       this.editorform.legal = row.legal
        this.editorform.phone = row.phone
         this.editorform.fax = row.fax
          this.editorform.addres = row.addres
           this.editorform.code = row.code
           this.editorform.note = row.note
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