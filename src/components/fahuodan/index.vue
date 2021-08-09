<template>
  <!--  :header-cell-style="{background:'rgb(0 0 0 / 67%)',color:'#606266'}"
修改表头背景颜色
  -->
  <div>
    <el-dialog title="修改" v-dialogDrag :visible.sync="editordialog"  :before-close="handleClose">
      <el-form
        :label-position="editorlabel"
        label-width="80px"
        :model="editorform"
      >
        <el-form-item label="发货单号">
          <el-input v-model="editorform.Invoice"></el-input>
        </el-form-item>
        <el-form-item label="印刷票号">
          <el-input v-model="editorform.Printing"></el-input>
        </el-form-item>
        <el-form-item label="工程名称">
          <el-input v-model="editorform.name"></el-input>
        </el-form-item>
        <el-form-item label="施工单位">
          <el-input v-model="editorform.unit"></el-input>
        </el-form-item>
        <el-form-item label="生产线">
          <el-input v-model="editorform.production"></el-input>
        </el-form-item>
        <el-form-item label="车号">
          <el-input v-model="editorform.Car"></el-input>
        </el-form-item>
        <el-form-item label="司机">
          <el-input v-model="editorform.driver"></el-input>
        </el-form-item>
        <el-form-item label="累计车次">
          <el-input v-model="editorform.trains"></el-input>
        </el-form-item>
        <el-form-item label="累计方量">
          <el-input v-model="editorform.volume"></el-input>
        </el-form-item>
                <el-form-item label="打票时间">
          <el-input v-model="editorform.time"></el-input>
        </el-form-item>
                <el-form-item label="打票强度">
          <el-input v-model="editorform.strength"></el-input>
        </el-form-item>
                <el-form-item label="打票配方">
          <el-input v-model="editorform.formula"></el-input>
        </el-form-item>
                <el-form-item label="发货方量">
          <el-input v-model="editorform.shipper"></el-input>
        </el-form-item>
                <el-form-item label="转入剩料">
          <el-input v-model="editorform.material"></el-input>
        </el-form-item>
                <el-form-item label="抗渗等级">
          <el-input v-model="editorform.garde"></el-input>
        </el-form-item>
                <el-form-item label="浇筑部位">
          <el-input v-model="editorform.Casting"></el-input>
        </el-form-item>
                <el-form-item label="浇筑方式">
          <el-input v-model="editorform.way"></el-input>
        </el-form-item>
                <el-form-item label="坍落度">
          <el-input v-model="editorform.slump"></el-input>
        </el-form-item>
        <el-form-item label="质检人员">
          <el-input v-model="editorform.personnel"></el-input>
        </el-form-item>
        <el-form-item label="是否手工单">
          <el-input v-model="editorform.order"></el-input>
        </el-form-item>
        <el-form-item label="是否打印">
          <el-input v-model="editorform.Whether"></el-input>
        </el-form-item>
        <el-form-item label="作废标志">
          <el-input v-model="editorform.Invalid"></el-input>
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
        <el-table-column prop="id" label="发货单号" width="">
        </el-table-column>
        <el-table-column prop="companyID" label="印刷票号" width="">
        </el-table-column>
         <el-table-column prop="companyID" label="工程名称" width="">
        </el-table-column>
        <el-table-column prop="companyCaption" label="施工单位" width="">
        </el-table-column>
        <el-table-column prop="produceUserCaption" label="生产线" width="">
        </el-table-column>
        <el-table-column prop="sumCarIndexTransportBill" label="车号" width="">
        </el-table-column>
        <el-table-column prop="personCheck" label="司机" width="">
        </el-table-column>
        <el-table-column prop="trains" label="累计车次" width="">
        </el-table-column>
        <el-table-column prop="mWeightLeaveCompany" label="累计方量" width="">
        </el-table-column>
        <el-table-column prop="time" label="打票时间" width="100px">
        </el-table-column>
        <el-table-column prop="strength" label="打票强度" width="">
        </el-table-column>
        <el-table-column prop="formula" label="打票配方" width="">
        </el-table-column>
        <el-table-column prop="shipper" label="发货方量" width="">
        </el-table-column>
        <el-table-column prop="material" label="转入剩料" width="">
        </el-table-column>
        <el-table-column prop="garde" label="抗渗等级" width="">
        </el-table-column>
        <el-table-column prop="Casting" label="浇筑部位" width="">
        </el-table-column>
        <el-table-column prop="way" label="浇筑方式" width="">
        </el-table-column>
        <el-table-column prop="slump" label="坍落度" width="">
        </el-table-column>
        <el-table-column prop="personnel" label="质检人员" width="100px">
        </el-table-column>
        <el-table-column prop="order" label="是否手工单" width="100px">
        </el-table-column>
        <el-table-column prop="Whether" label="是否打印" width="">
        </el-table-column>
        <el-table-column prop="Invalid" label="作废标志" width="">
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
            Invoice:'',
            Printing:'',
            name:"",
            unit:'',
            production:'',
            Car:'',
            driver:'',
            trains:'',
            volume:'',
            time:'',
            strength:'',
            formula:'',
            shipper:'',
            material:'',
            garde:'',
            Casting:'',
            way:'',
            slump:'',
            personnel:'',
            order:'',
            Whether:'',
            Invalid:''
      },
      tableData: [
        {
            Invoice:'1',
            Printing:'1',
            name:"1",
            unit:'2',
            production:'2',
            Car:'2',
            driver:'2',
            trains:'3',
            volume:'124',
            time:'123',
            strength:'324',
            formula:'13',
            shipper:'34',
            material:'14',
            garde:'3124',
            Casting:'31',
            way:'34',
            slump:'43',
            personnel:'134',
            order:'34',
            Whether:'1234',
            Invalid:'34'
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