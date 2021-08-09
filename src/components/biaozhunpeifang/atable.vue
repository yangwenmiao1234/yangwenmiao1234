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
        <el-table-column prop="onesand" label="1#沙" width="100px">
        </el-table-column>
        <el-table-column prop="onestone" label="1#石" width="100px">
        </el-table-column>
        <el-table-column prop="towcoalash" label="2#煤灰" width="100px">
        </el-table-column>
        <el-table-column prop="twosand" label="2#沙" width="">
        </el-table-column>
        <el-table-column prop="twostone" label="2#石" width="">
        </el-table-column>
        <el-table-column prop="threesand" label="3#砂" width="">
        </el-table-column>
        <el-table-column prop="threestone" label="3#石" width="">
        </el-table-column>
        <el-table-column prop="foursand" label="4#砂" width="">
        </el-table-column>
        <el-table-column prop="fourstone" label="4#石" width="">
        </el-table-column>
        <el-table-column prop="fly" label="粉煤灰" width="">
        </el-table-column>
        <el-table-column prop="kuangfen" label="矿粉" width="">
        </el-table-column>
        <el-table-column prop="Expansive" label="膨胀剂" width="">
        </el-table-column>
        <el-table-column prop="water" label="水" width="">
        </el-table-column>
        <el-table-column prop="watertwo" label="水2" width="">
        </el-table-column>
        <el-table-column prop="Cementone" label="水泥1" width="">
        </el-table-column>
        <el-table-column prop="Cementtwo" label="水泥2" width="">
        </el-table-column>
        <el-table-column prop="Cementthree" label="水泥3" width="">
        </el-table-column>
        <el-table-column prop="Additiveone" label="添加剂1" width="">
        </el-table-column>
        <el-table-column prop="Additivetwo" label="添加剂2" width="">
        </el-table-column>
        <el-table-column prop="Additivethree" label="添加剂3" width="">
        </el-table-column>
        <el-table-column prop="Additivefour" label="添加剂4" width="">
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
        towcoalash:'1',
           onesand:"1",
            onestone:"1",
            twosand:"1",
            twostone:"1",
            threesand:"11",
            threestone:"1",
            foursand:"1",
            fourstone:"1",
           fly:"2",
           kuangfen:"2",
           Expansive:"1",
            water:"21",
            watertwo:"12", 
            Cementone:"1234", 
            Cementtwo:"14",
            Cementthree :"1234",
            Additiveone:"13",
            Additivetwo:"34",
            Additivethree:"24",
            Additivefour:"23",
      },
      tableData: [
        {
           towcoalash:'1',
           onesand:"1",
            onestone:"1",
            twosand:"1",
            twostone:"1",
            threesand:"11",
            threestone:"1",
            foursand:"1",
            fourstone:"1",
           fly:"2",
           kuangfen:"2",
           Expansive:"1",
            water:"21",
            watertwo:"12", 
            Cementone:"1234", 
            Cementtwo:"14",
            Cementthree :"1234",
            Additiveone:"13",
            Additivetwo:"34",
            Additivethree:"24",
            Additivefour:"23",
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