<template>
  <!--  :header-cell-style="{background:'rgb(0 0 0 / 67%)',color:'#606266'}"
修改表头背景颜色
  -->
<div>
  <el-dialog v-dialogDrag title="编辑" :visible.sync="editordialog"  :before-close="handleClose">
    <el-form :label-position="editorlabel" label-width="80px" :model="editorform">
  <el-form-item label="员工编号">
    <el-input v-model="editorform.idname"></el-input>
  </el-form-item>
  <el-form-item label="员工姓名 ">
    <el-input v-model="editorform.name"></el-input>
  </el-form-item>
  <el-form-item label="部门">
    <el-input v-model="editorform.profile"></el-input>
  </el-form-item>
    <el-form-item label="岗位">
    <el-input v-model="editorform.legal"></el-input>
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
        <el-table-column prop="idname" label="员工编号" width="120">
        </el-table-column>
        <el-table-column prop="name" label="员工姓名" width="120">
        </el-table-column>
        <el-table-column prop="profile" label="部门" width="300">
        </el-table-column>
        <el-table-column prop="legal" label="岗位" width="120">
        </el-table-column>
        <el-table-column prop="note" label="备注" width=""> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button style="color: rgb(0 0 0 / 67%)" type="text" size="small"
             @click="editorClick(scope.row),editordialog=true"
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
        viewform: {
       idname: "",
          name: "",
          profile: "",
          legal: "",
          note: "",
        },
        editorform:{
          idname: "",
          name: "",
          profile: "",
          legal: "",
          note: "",
        },
      tableData: [
        {
          idname: "1",
          name: "1",
          profile: "1",
          legal: "1",
          note: "1",
        },
        {
          idname: "1",
          name: "1",
          profile: "1",
          legal: "1",
          note: "1",
        },
        {
          idname: "1",
          name: "1",
          profile: "1",
          legal: "1",
          note: "1",
        },
        {
          idname: "1",
          name: "1",
          profile: "1",
          legal: "1",
          note: "1",
        },
      ],
      viewdialog: false,
      editordialog:false,
    };
  },
  methods: {
    editorClick(row){
    this.editorform.idname = row.idname
     this.editorform.name = row.name
      this.editorform.profile = row.profile
       this.editorform.legal = row.legal
           this.editorform.note = row.note
    },
    handleClick(row) {
       this.viewform.idname = row.idname
     this.viewform.name = row.name
      this.viewform.profile = row.profile
       this.viewform.legal = row.legal
           this.viewform.note = row.note
      // console.log(row)
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
  mounted: {
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
/* /* ::-webkit-scrollbar {
  height: 18px;
} */ 
/* ::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(249, 182, 3, 0.67);
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: 0;
  border-radius: 0;
  background: #e2b94862;
} */

</style>