<template>
    <div class="body">
        <div class="header" style="">
      <span class="body_span_1" style="">类型：</span>
      <el-select @change="query1()"  v-model="value3" placeholder="请选择">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.title"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button  style="" @click="addtype()" type="primary" plain>...</el-button>
      <el-button class="body_button_1" size="small" style="" @click="adddialog=true,querylisttree()" type="primary" plain>增加</el-button>
      <el-button class="body_button_2" size="small" style="" @click="query1()" type="primary" plain>刷新</el-button>
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
    <el-input v-model="addform.Caption"></el-input>
  </el-form-item>
  <el-form-item label="类型">
  <el-select style="width:110px" @change="queryselecttree()" v-model="TypeMaterialID" filterable placeholder="请选择">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.title"
      :value="item.value">
    </el-option>
  </el-select>
  <el-select style="width:110px;margin-left:3%" v-model="TypeMaterialItemID" filterable placeholder="请选择">
    <el-option
      v-for="item in options2"
      :key="item.value"
      :label="item.title"
      :value="item.value">
    </el-option>
  </el-select>
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
  <Dialog ref="dialog">
  </Dialog>
        </div>
    </div>
</template>
<script>
import Table from '@/views/yuanliaoguanli/yuanliaoxinxi/table.vue'
import Dialog from '@/views/yuanliaoguanli/yuanliaoxinxi/dialog.vue'
import { querylistylxx , addylxx , deletesylxx , modifyylxx , querylistlcxx} from '@/api/user.js'
import { querylisttree , querylisttree2 } from '@/api/tree.js'
  export default {
      components :{ Table , Dialog},
    data() {
      return {
        addform:{
          Caption: "",
          Density: "",
          AddressProduce: "",
          MaterialGrade: "",
          MaterialModel: "",
          InterfaceID: "",
          Remark: "",
        },
        adddialog:false,
        options1: [{
          value: '',
          label: '',
          title:"",
        },],
        TypeMaterialID: '',
        options2: [{
          value: '',
          label: '',
          title: '',
        },],
        TypeMaterialItemID: '',
        options3: [
        {
           value: '',
          title:'',
          label:''
        }
      ],
      value3: "",
      arr : [],
      };
    },
    methods:{
      shuxingjiego() {
        querylisttree({
        Comid:localStorage.getItem('comid')
        }).then(response=>{
         this.data=response.data
         this.options3=response.data
        }).catch((error)=>{
          alert('获取失败')
        })
    },
      addtype(){
        const aa = this.$refs.dialog
        aa.dialogVisible = true
        aa.shuxingjiego()
      },
        setup(){
        },
        query1(){
          const bb = this.$refs.table
          alert(this.value3)
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
      add() {
      const ss = this.$refs.table;
      addylxx(
      JSON.stringify({
      CompanyID:localStorage.getItem('comid'),
      TypeMaterialID:this.TypeMaterialID,
      Density:this.addform.Density,
      AddressProduce:this.addform.AddressProduce,
      MaterialGrade:this.addform.MaterialGrade,
      MaterialModel:this.addform.MaterialModel,
      InterfaceID:this.addform.InterfaceID,
      Remark:this.addform.Remark,
      Caption:this.addform.Caption,
      TypeMaterialItemID:this.TypeMaterialItemID,
      ActionUserID :localStorage.getItem('ActionUserID'),
      ActionUserName :localStorage.getItem('ActionUserName'),
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
      querylisttree(){
        querylisttree({
          Comid : localStorage.getItem('comid')
        }).then((response)=>{
          this.options1 = response.data
        })
      },
      queryselecttree(){
        querylisttree2({
           comid : localStorage.getItem('comid'),
           typeMaterialID : this.TypeMaterialID,
        }).then((response)=>{
           this.options2 = response.data
        })
      }
    },
    mounted(){
      this.shuxingjiego()
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