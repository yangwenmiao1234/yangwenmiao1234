<template>
    <div class="body">
        <div class="header" style="">
      <span class="body_span_1" style="">类型：</span>
      <el-select @change="query1()"  v-model="value3" placeholder="请选择">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button  style="" @click="treedialod=true" type="primary" plain>...</el-button>
      <el-button class="body_button_1" size="small" style="" @click="adddialog=true" type="primary" plain>增加</el-button>
      <el-button class="body_button_2" size="small" style="" @click="query()" type="primary" plain>刷新</el-button>
        </div>
        <div class="table" style="">
            <Table ref="table">
            </Table>
        </div>
        <div>
   <el-dialog title="添加" width="30%" v-dialogDrag :visible.sync="adddialog"  :before-close="handleClose">
    <div class="body_dialog">
      <el-form :label-position="editorlabel" label-width="80px" :model="addform">
  <el-form-item label="名称">
    <el-input v-model="addform.CompanyID"></el-input>
  </el-form-item>
  <el-form-item label="ID">
    <el-input v-model="addform.ID"></el-input>
  </el-form-item>
  <el-form-item label="类型">
    <el-input v-model="addform.TypeMaterialID"></el-input>
  </el-form-item>
    <el-form-item label="密度">
    <el-input v-model="addform.Density"></el-input>
  </el-form-item>
    <el-form-item label="产地">
    <el-input v-model="addform.AddressProduce"></el-input>
  </el-form-item>
    <el-form-item label="等级">
    <el-input v-model="addform.MaterialGrade"></el-input>
  </el-form-item>
    <el-form-item label="型号规格">
    <el-input v-model="addform.MaterialModel"></el-input>
  </el-form-item>
    <el-form-item label="接口编码">
    <el-input v-model="addform.InterfaceID"></el-input>
  </el-form-item>
  <el-form-item label="公司ID">
    <el-input v-model="addform.Comid"></el-input>
  </el-form-item>
    <el-form-item label="备注">
    <el-input v-model="addform.Remark"></el-input>
  </el-form-item>
</el-form>
    </div>
<span slot="footer" class="dialog-footer">
              <el-button @click="adddialog = false">取 消</el-button>
              <el-button type="primary" @click="(adddialog = false),add()"
                >确 定</el-button
              >
            </span>
  </el-dialog>
        </div>
    </div>
</template>
<script>
import Table from '@/views/yuanliaoguanli/yuanliaoxinxi/table.vue'
import { querylistylxx , addylxx , deletesylxx , modifyylxx } from '@/api/user.js'
  export default {
      components :{ Table },
    data() {
      return {
        addform:{
          CompanyID: "",
          ID: "",
          TypeMaterialID: "",
          Density: "",
          AddressProduce: "",
          MaterialGrade: "",
          MaterialModel: "",
          InterfaceID: "",
          Remark: "",
          Caption:'412',
          ActionUserID:'4123',
          ActionUserName:'4231',
          TypeMaterialItemID:'423',
          Comid:'HGMES'
        },
        adddialog:false,
        options3: [
        {
          value: "HGMES",
          label: "一号线",
        },
        {
          value: "HGMES2",
          label: "二号线",
        },
        {
          value: "HGMES3",
          label: "三号线",
        },
      ],
      value3: "",
      };
    },
    methods:{
        setup(){
        },
        query1(){
          const bb = this.$refs.table
           querylistylxx({
            page: bb.page,
            intPageSize: bb.size,
            Comid:localStorage.getItem('comid'),
            TypeMaterialID:this.value3
      }).then((response) => {
          bb.tableData = response.data.data;
          bb.page = response.data.page;
          bb.size = response.data.PageSize;
          bb.total = response.data.dataCount; 
          this.$message({
            type: "success",
            message: "查询成功",
          });
          bb.loading = false;
        })
        .catch((error) => {
          bb.loading = true;
          bb.$message({
            type: "info",
            message: "查询失败，请联系管理员！",
          });
        });
        },
        query(){
          const aa = this.$refs.table
          aa.querylist()
        },
      add() {
      const ss = this.$refs.table;
      addylxx(
        JSON.stringify({
      CompanyID:this.addform.CompanyID ,
      ID:this.addform.ID,
      TypeMaterialID:this.addform.TypeMaterialID,
      Density:this.addform.Density,
      AddressProduce:this.addform.AddressProduce,
      MaterialGrade:this.addform.MaterialGrade,
      MaterialModel:this.addform.MaterialModel,
      InterfaceID:this.addform.InterfaceID,
      Remark:this.addform.Remark,
      Caption:this.addform.Caption,
      ActionUserID :this.addform.ActionUserID,
      ActionUserName :this.addform.ActionUserName,
      TypeMaterialItemID:this.addform.TypeMaterialItemID, 
      Comid:this.addform.Comid
        })
      ).then((response) => {
          this.$message({
            message: "添加成功！",
            type: "success",
          });
          ss.querylist();
        })
        .catch((error) => {
          this.$message({
            message: "添加未成功，请联系管理员",
            type: "error",
          });
        });
    },
    },
    mounted(){
      
    }
  };
</script>

<style scoped>
.body{
  padding: 25px;
}
.el-input--small .el-input__inner {
    height: 120px;
    /* line-height: 2rem; */
}
.header{
  display:flex
}
.table{
  margin-top:2%
}
.body_span_1{
  margin-top: 0.6%; 
  margin-left: 2%
}
.body_button_1{
  width:80px;
  margin-left:3%;
  margin-top:0%
}
.body_button_2{
  width:80px;
  margin-left:3%;
  margin-top:0%
}
.body_dialog{
  width:90%;
}
</style>