<template>
  <!--  :header-cell-style="{background:'rgb(0 0 0 / 67%)',color:'#606266'}"
修改表头背景颜色
  -->
  <div>
    <el-dialog
      title="编辑"
      v-dialogDrag
      :visible.sync="editordialog"
      :before-close="handleClose"
    >
      <el-form
        label-width="80px"
        :model="editorform"
      >
        <el-form-item label="状态">
          <el-input v-model="editorform.state"></el-input>
        </el-form-item>
        <el-form-item label="工程名称">
          <el-input v-model="editorform.name"></el-input>
        </el-form-item>
        <el-form-item label="生产线">
          <el-input v-model="editorform.production"></el-input>
        </el-form-item>
        <el-form-item label="车号">
          <el-input v-model="editorform.Car"></el-input>
        </el-form-item>
        <el-form-item label="打票方量">
          <el-input v-model="editorform.Ticket"></el-input>
        </el-form-item>
        <el-form-item label="打票强度">
          <el-input v-model="editorform.strength"></el-input>
        </el-form-item>
        <el-form-item label="打票配方">
          <el-input v-model="editorform.formula"></el-input>
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
        <el-table-column prop="state" label="状态" width="">
        </el-table-column>
        <el-table-column prop="name" label="工程名称" width="">
        </el-table-column>
        <el-table-column prop="production" label="生产线" width="">
        </el-table-column>
        <el-table-column prop="Car" label="车号" width=""> </el-table-column>
        <el-table-column prop="Ticket" label="打票方量" width="">
        </el-table-column>
        <el-table-column prop="strength" label="打票强度" width="">
        </el-table-column>
        <el-table-column prop="formula" label="打票配方" width="">
        </el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      editorform: {
        state: "",
        name: "",
        production: "",
        Car: "",
        Ticket: "",
        strength: "",
        formula: "",
      },
      tableData: [
        {
          state: "1",
          name: "1",
          production: "1",
          Car: "1",
          Ticket: "1",
          strength: "1",
          formula: "1",
        },
        {
          state: "1",
          name: "1",
          production: "1",
          Car: "1",
          Ticket: "1",
          strength: "1",
          formula: "1",
        },
        {
          state: "1",
          name: "1",
          production: "1",
          Car: "1",
          Ticket: "1",
          strength: "1",
          formula: "1",
        },
        {
          state: "1",
          name: "1",
          production: "1",
          Car: "1",
          Ticket: "1",
          strength: "1",
          formula: "1",
        },
      ],
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
  },
  mounted(){
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
</style>