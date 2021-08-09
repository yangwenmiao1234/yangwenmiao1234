<template>
  <!--  :header-cell-style="{background:'rgb(0 0 0 / 67%)',color:'#606266'}"
修改表头背景颜色
  -->
  <div>
    <el-dialog v-dialogDrag title="修改" :visible.sync="editordialog"  :before-close="handleClose">
      <el-form
        :label-position="editorlabel"
        label-width="80px"
        :model="editorform"
      >
        <el-form-item label="任务单号">
          <el-input v-model="editorform.Task"></el-input>
        </el-form-item>
        <el-form-item label="销售单号">
          <el-input v-model="editorform. Salesorder"></el-input>
        </el-form-item>
        <el-form-item label="工程名称">
          <el-input v-model="editorform.name"></el-input>
        </el-form-item>
        <el-form-item label="计划方量">
          <el-input v-model="editorform.Plan"></el-input>
        </el-form-item>
        <el-form-item label="累计车次">
          <el-input v-model="editorform.cumulative"></el-input>
        </el-form-item>
        <el-form-item label="累计方量">
          <el-input v-model="editorform.volume"></el-input>
        </el-form-item>
        <el-form-item label="开盘时间">
          <el-input v-model="editorform. openingtime"></el-input>
        </el-form-item>
        <el-form-item label="开盘提醒">
          <el-input v-model="editorform.Earlyremind"></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-input v-model="editorform.Commoditytype"></el-input>
        </el-form-item>
                <el-form-item label="混凝土强度">
          <el-input v-model="editorform.Concrete"></el-input>
        </el-form-item>
                <el-form-item label="砂浆强度">
          <el-input v-model="editorform.Mortar"></el-input>
        </el-form-item>
                <el-form-item label="浇筑部位">
          <el-input v-model="editorform.Casting"></el-input>
        </el-form-item>
                <el-form-item label="浇筑方式">
          <el-input v-model="editorform.Pouring"></el-input>
        </el-form-item>
                <el-form-item label="抗渗等级">
          <el-input v-model="editorform.grade"></el-input>
        </el-form-item>
                <el-form-item label="坍落度">
          <el-input v-model="editorform.slump"></el-input>
        </el-form-item>
                <el-form-item label="砂粒径">
          <el-input v-model="editorform.Sand"></el-input>
        </el-form-item>
                <el-form-item label="泵车类型">
          <el-input v-model="editorform.Pump"></el-input>
        </el-form-item>
                <el-form-item label="印刷票号">
          <el-input v-model="editorform.Printing"></el-input>
        </el-form-item>
        <el-form-item label="绑定生产线">
          <el-input v-model="editorform.Binding"></el-input>
        </el-form-item>
        <el-form-item label="混凝土配方">
          <el-input v-model="editorform.formulation"></el-input>
        </el-form-item>
        <el-form-item label="砂浆配方">
          <el-input v-model="editorform.Mortarformula"></el-input>
        </el-form-item>
        <el-form-item label="累计方式">
          <el-input v-model="editorform.way"></el-input>
        </el-form-item>
        <el-form-item label="累计算法">
          <el-input v-model="editorform.algorithm"></el-input>
        </el-form-item>
        <el-form-item label="发车上限">
          <el-input v-model="editorform.Ceiling"></el-input>
        </el-form-item>
        <el-form-item label="当前发车">
          <el-input v-model="editorform.current"></el-input>
        </el-form-item>
        <el-form-item label="工程监督号">
          <el-input v-model="editorform.Project"></el-input>
        </el-form-item>
        <el-form-item label="流水号">
          <el-input v-model="editorform.Serial"></el-input>
        </el-form-item>
        <el-form-item label="联系人员">
          <el-input v-model="editorform.personnel"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="editorform.phone"></el-input>
        </el-form-item>
        <el-form-item label="余砼下限">
          <el-input v-model="editorform.offline"></el-input>
        </el-form-item>
        <el-form-item label="特殊运输">
          <el-input v-model="editorform.Special"></el-input>
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
        <el-table-column fixed="left" label="序号" width="50px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="Task" label="地磅单号" width="">
        </el-table-column>
        <el-table-column prop="Salesorder" label="生产线" width="">
        </el-table-column>
         <el-table-column prop="name" label="打票时间" width="">
        </el-table-column>
        <el-table-column prop="Plan" label="供应商" width="">
        </el-table-column>
        <el-table-column prop="cumulative" label="料仓名称" width="">
        </el-table-column>
        <el-table-column prop="volume" label="原料类型" width="">
        </el-table-column>
        <el-table-column prop="openingtime" label="原料名称" width="">
        </el-table-column>
        <el-table-column prop="Earlyremind" label="原料规格" width="">
        </el-table-column>
        <el-table-column prop="Commoditytype" label="车号" width="">
        </el-table-column>
        <el-table-column prop="Concrete" label="司机姓名" width="100px">
        </el-table-column>
        <el-table-column prop="Mortar" label="过磅毛重" width="">
        </el-table-column>
        <el-table-column prop="Casting" label="罐车方量" width="">
        </el-table-column>
        <el-table-column prop="Pouring" label="质检人员" width="">
        </el-table-column>
        <el-table-column prop="grade" label="收货人员" width="">
        </el-table-column>
        <el-table-column prop="slump" label="收货票号" width="">
        </el-table-column>
        <el-table-column prop="Sand" label="供货票号" width="">
        </el-table-column>
        <el-table-column prop="note" label="备注" width="">
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
            Task:'1',
            Salesorder:'1',
            name:'1',
            Plan:'1',
            cumulative:'1',
            volume:'1',
            openingtime:'1',
            Earlyremind:'1',
            Commoditytype:'1',
            Concrete:'1',
            Mortar:'1',
            Casting:'1',
            Pouring :'1',
            grade:'1',
            slump:'1',
            Sand :'1',
            Pump :'1',
            Printing :'1',
            Binding :'1',
            formulation :'1',
            Mortarformula :'1',
            way:'1',
            algorithm:'1',
            Ceiling :'1',
            current :'1',
            Project :'1',
            Serial :'1',
            personnel:'1',
            Special :'1',
            offline:'1',
            note:'1',
            phone:"1",
      },
      tableData: [
        {
            Task:'1',
            Salesorder:'1',
            name:'1',
            Plan:'1',
            cumulative:'1',
            volume:'1',
            openingtime:'1',
            Earlyremind:'1',
            Commoditytype:'1',
            Concrete:'1',
            Mortar:'1',
            Casting:'1',
            Pouring :'1',
            grade:'1',
            slump:'1',
            Sand :'1',
            Pump :'1',
            Printing :'1',
            Binding :'1',
            formulation :'1',
            Mortarformula :'1',
            way:'1',
            algorithm:'1',
            Ceiling :'1',
            current :'1',
            Project :'1',
            Serial :'1',
            personnel:'1',
            Special :'1',
            offline:'1',
            note:'1',
            phone:"1",
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