<template>
  <!--  :header-cell-style="{background:'rgb(0 0 0 / 67%)',color:'#606266'}"
修改表头背景颜色
  -->
  <div>
    <el-dialog title="修改" v-dialogDrag :visible.sync="editordialog"  :before-close="handleClose">
      <el-form
        label-width="80px"
        :model="editorform"
      >
        <el-form-item label="绑定生产线">
          <el-input v-model="editorform.Binding"></el-input>
        </el-form-item>
        <el-form-item label="混凝土强度">
          <el-input v-model="editorform.concrete"></el-input>
        </el-form-item>
        <el-form-item label="混凝土配方">
          <el-input v-model="editorform.formulation"></el-input>
        </el-form-item>
        <el-form-item label="砂浆强度">
          <el-input v-model="editorform.Mortar"></el-input>
        </el-form-item>
        <el-form-item label="砂浆配方">
          <el-input v-model="editorform.formula"></el-input>
        </el-form-item>
        <el-form-item label="任务单号">
          <el-input v-model="editorform.Task"></el-input>
        </el-form-item>
        <el-form-item label="工程名称">
          <el-input v-model="editorform.name"></el-input>
        </el-form-item>
        <el-form-item label="计划方量">
          <el-input v-model="editorform.Plan"></el-input>
        </el-form-item>
        <el-form-item label="累计方量">
          <el-input v-model="editorform.cumulative"></el-input>
        </el-form-item>
                <el-form-item label="累计车次">
          <el-input v-model="editorform.trains"></el-input>
        </el-form-item>
                <el-form-item label="开盘时间">
          <el-input v-model="editorform.day"></el-input>
        </el-form-item>
                <el-form-item label="商品类型">
          <el-input v-model="editorform.shop"></el-input>
        </el-form-item>
                <el-form-item label="浇筑部位">
          <el-input v-model="editorform.Casting"></el-input>
        </el-form-item>
                <el-form-item label="浇筑方式">
          <el-input v-model="editorform.way"></el-input>
        </el-form-item>
                <el-form-item label="抗渗等级">
          <el-input v-model="editorform.grade"></el-input>
        </el-form-item>
                <el-form-item label="坍落度">
          <el-input v-model="editorform.slump"></el-input>
        </el-form-item>
                <el-form-item label="砂粒径">
          <el-input v-model="editorform.size"></el-input>
        </el-form-item>
                <el-form-item label="泵车类型">
          <el-input v-model="editorform.Pump"></el-input>
        </el-form-item>
        <el-form-item label="联系人员">
          <el-input v-model="editorform.personnel"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="editorform.phone"></el-input>
        </el-form-item>
        <el-form-item label="监督号">
          <el-input v-model="editorform.Supervision"></el-input>
        </el-form-item>
        <el-form-item label="流水号">
          <el-input v-model="editorform.Seria"></el-input>
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
        <el-table-column fixed="left" label="序号" width="50px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="Binding" label="绑定生产线" width="100px">
        </el-table-column>
        <el-table-column prop="concrete" label="混凝土强度" width="100px">
        </el-table-column>
        <el-table-column prop="formulation" label="混凝土配方" width="100px">
        </el-table-column>
        <el-table-column prop="Mortar" label="砂浆强度" width="">
        </el-table-column>
        <el-table-column prop="formula" label="砂浆配方" width="">
        </el-table-column>
        <el-table-column prop="Task" label="任务单号" width="">
        </el-table-column>
        <el-table-column prop="name" label="工程名称" width="">
        </el-table-column>
        <el-table-column prop="Plan" label="计划方量" width="">
        </el-table-column>
        <el-table-column prop="cumulative" label="累计方量" width="">
        </el-table-column>
        <el-table-column prop="trains" label="累计车次" width="">
        </el-table-column>
        <el-table-column prop="day" label="开盘时间" width="">
        </el-table-column>
        <el-table-column prop="shop" label="商品类型" width="">
        </el-table-column>
        <el-table-column prop="Casting" label="浇筑部位" width="">
        </el-table-column>
        <el-table-column prop="way" label="浇筑方式" width="">
        </el-table-column>
        <el-table-column prop="grade" label="抗渗等级" width="">
        </el-table-column>
        <el-table-column prop="slump" label="坍落度" width="">
        </el-table-column>
        <el-table-column prop="size" label="砂粒径" width="">
        </el-table-column>
        <el-table-column prop="Pump" label="泵车类型" width="">
        </el-table-column>
        <el-table-column prop="personnel" label="联系人员" width="">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="">
        </el-table-column>
        <el-table-column prop="Supervision" label="监督号" width="">
        </el-table-column>
        <el-table-column prop="Serial" label="流水号" width="">
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
        Binding:'', 
           concrete:'',
           formulation:"",
            Mortar:"",
            formula:"",
            Task:"",
            name:"",
            Plan:"",
            cumulative:"",
            trains:"",
           day:"",
           shop:"",
           Casting:"",
            way :"",
            grade:"", 
            slump:"", 
            size :"",
            Pump :"",
            personnel :"",
            phone :"",
            Supervision :"",
            Seria:"",
      },
      tableData: [
        {
           Binding:'1', 
           concrete:'1',
           formulation:"1",
            Mortar:"1",
            formula:"1",
            Task:"1",
            name:"11",
            Plan:"1",
            cumulative:"1",
            trains:"1",
           day:"2",
           shop:"2",
           Casting:"1",
            way :"21",
            grade:"12", 
            slump:"1234", 
            size :"14",
            Pump :"1234",
            personnel :"13",
            phone :"34",
            Supervision :"24",
            Seria:"23",
        }
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