<template>
  <!--  :header-cell-style="{background:'rgb(0 0 0 / 67%)',color:'#606266'}"
修改表头背景颜色
  -->
<div>
  <el-dialog title="详情" v-dialogDrag :visible.sync="viewdialog"  :before-close="handleClose">
    <el-form :label-position="viewlabel" label-width="80px" :model="viewform">
  <el-form-item label="公司编号">
    <el-input v-model="viewform.idname"></el-input>
  </el-form-item>
  <el-form-item label="公司全称">
    <el-input v-model="viewform.name"></el-input>
  </el-form-item>
  <el-form-item label="公司简介">
    <el-input v-model="viewform.profile"></el-input>
  </el-form-item>
    <el-form-item label="法定代表">
    <el-input v-model="viewform.legal"></el-input>
  </el-form-item>
    <el-form-item label="公司电话">
    <el-input v-model="viewform.phone"></el-input>
  </el-form-item>
    <el-form-item label="公司传真">
    <el-input v-model="viewform.fax"></el-input>
  </el-form-item>
    <el-form-item label="公司地址">
    <el-input v-model="viewform.addres"></el-input>
  </el-form-item>
    <el-form-item label="接口编码">
    <el-input v-model="viewform.code"></el-input>
  </el-form-item>
    <el-form-item label="备注">
    <el-input v-model="viewform.note"></el-input>
  </el-form-item>
</el-form>
  </el-dialog>
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
        <el-table-column prop="idname" label="配方名称" width="">
        </el-table-column>
        <el-table-column prop="grade" label="强度等级" width="">
        </el-table-column>
        <el-table-column prop="time" label="搅拌时间" width="">
        </el-table-column>
        <el-table-column prop="type" label="商品类型" width="">
        </el-table-column>
        <el-table-column prop="Permeability" label="抗渗等级" width="">
        </el-table-column>
        <el-table-column prop="slump" label="坍落度" width="">
        </el-table-column>
        <el-table-column prop="size" label="砂粒径" width="">
        </el-table-column>
        <el-table-column prop="sewage" label="污水比例" width="">
        </el-table-column>
        <el-table-column prop="code" label="接口编码" width="">
        </el-table-column>
        <el-table-column prop="note" label="备注" width=""> 
        </el-table-column>
        <el-table-column prop="fourMediumsand" label="中砂" width="">
        </el-table-column>
        <el-table-column prop="threeMediumsand" label="中砂" width="">
        </el-table-column>
         <el-table-column prop="onestone" label="1-5石" width="100px">
        </el-table-column>
        <el-table-column prop="twostone" label="1-5石" width="100px">
        </el-table-column>
        <el-table-column prop="threestone" label="1-5石" width="">
        </el-table-column>
        <el-table-column prop="fourstone" label="1-5石" width="">
        </el-table-column>
        <el-table-column prop="oneMediumsand" label="中砂" width="">
        </el-table-column>
        <el-table-column prop="twoMediumsand" label="中砂" width="">
        </el-table-column>
        <el-table-column prop="threecement" label="水泥" width="">
        </el-table-column>
        <el-table-column prop="onecement" label="水泥" width="">
        </el-table-column>
        <el-table-column prop="twocement" label="水泥" width="">
        </el-table-column>
        <el-table-column prop="Coalash" label="煤灰" width="">
        </el-table-column>
        <el-table-column prop="twoCoalash" label="煤灰" width="">
        </el-table-column>
        <el-table-column prop="kuangfen" label="矿粉" width="">
        </el-table-column>
        <el-table-column prop="Expansive" label="膨胀剂" width="">
        </el-table-column>
        <el-table-column prop="water" label="水" width="">
        </el-table-column>
        <el-table-column prop="watertwo" label="水2" width="">
        </el-table-column>
        <el-table-column prop="additiveone" label="添加剂" width="">
        </el-table-column>
        <el-table-column prop="additivetwo" label="添加剂" width="">
        </el-table-column>
        <el-table-column prop="additivethree" label="添加剂" width="">
        </el-table-column>
        <el-table-column prop="additivefour" label="添加剂" width="">
        </el-table-column>
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
          phone: "",
          fax: "",
          addres: "",
          code: "",
          note: "",
         
        },
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
          idname: "1",
          grade:'1',
          time:'1',
          type:'1',
          Permeability:'1',
          slump:'123',
          size:'123',
          sewage:'213',
          code: "1",
          note: "1",
          onestone:'23',
          twostone:'123',
          threestone:'213',
          fourstone:'213',
          oneMediumsand:'123',
          twoMediumsand:'213',
          threeMediumsand:'213',
          fourMediumsand:'213',
          onecement:'123',
          twocement:'213',
          Coalash:'23',
          twoCoalash:'123',
          kuangfen:'2',
          Expansive:'34',
          watertwo:'324',
          water:'234',
          additiveone:'qwe',
          additivetwo:'qwe',
          additivethree:'qwe',
          additivefour:'qwe',
        },
        {
          idname: "1",
          grade:'1',
          time:'1',
          type:'1',
          Permeability:'1',
          slump:'123',
          size:'123',
          sewage:'213',
          code: "1",
          note: "1",
        },
        {
          idname: "1",
          grade:'1',
          time:'1',
          type:'1',
          Permeability:'1',
          slump:'123',
          size:'123',
          sewage:'213',
          code: "1",
          note: "1",
        },
        {
          idname: "1",
          grade:'1',
          time:'1',
          type:'1',
          Permeability:'1',
          slump:'123',
          size:'123',
          sewage:'213',
          code: "1",
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
        this.editorform.phone = row.phone
         this.editorform.fax = row.fax
          this.editorform.addres = row.addres
           this.editorform.code = row.code
           this.editorform.note = row.note
    },
    handleClick(row) {
       this.viewform.idname = row.idname
     this.viewform.name = row.name
      this.viewform.profile = row.profile
       this.viewform.legal = row.legal
        this.viewform.phone = row.phone
         this.viewform.fax = row.fax
          this.viewform.addres = row.addres
           this.viewform.code = row.code
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