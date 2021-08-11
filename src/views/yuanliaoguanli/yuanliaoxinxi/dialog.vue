<template>
    <el-dialog
    v-dialogDrag
      title="提示"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div style="width: 100%; height: 100%;">
          <el-button
            type="primary"
            @click="(adddialog = true)"
            >增加主类型</el-button
          >
           <el-button
            type="primary"
            @click="add2()"
            >增加次类型</el-button
          >
          <!-- :accordion="true" 设置只展开一个同级节点 -->
          <el-tree
          style="margin-top:3%"
          :check-strictly="true"
            :data="data"
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            check-on-click-node="true"
            :default-checked-keys="[1]"
            :props="defaultProps"
            @check="handleCheck"
           @check-change="handleCheckChange"
          > 
          <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span style="margin-left:30%">
          <el-button
            type="text"
            size="mini"
            @click="() => Modify(node, data)">
            修改
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => delet2(node, data)">
            删除
          </el-button>
        </span>
      </span>
          </el-tree>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
</template>
<script>
import {addlcxx , querylistylxx} from '@/api/user.js'
import {querylisttree , addtree1 , addtree2 , modifytree1 , modifytree2 ,deletetree1 , deletetree2} from '@/api/tree.js'
import Lcxx from "@/components/table/liaocangxinxi.vue";
import Scx from "@/components/tree/treescx.vue";
import { Calendar } from 'element-ui';
// import { title } from '@/settings';
// import { getUniqueId } from 'devtools/packages/app-backend-vue2/src/components/util';
export default {
  components: { Lcxx, Scx },
  //   components: {  },
  data() {
    return {
      companyID:"HGMES",
      comid:"HGMES",
      addfrom: {
        ID: "",
        interfaceID: "",
        companyID: "",
        remark: "",
        caption:"",
        orderIndex:'',
      },
      Modifyfrom: {
        ID: "",
        interfaceID: "",
        companyID: "",
        remark: "",
        caption:"",
        orderIndex:'',
      },
      adddialog: false,
      Modifydialog: false,
      addfrom2: {
        ID: "",
        interfaceID: "",
        companyID: "",
        remark: "",
        fomulaParaType:"",
        orderIndex:'',
      },
      Modifyfrom2: {
        ID: "",
        interfaceID: "",
        companyID: "",
        remark: "",
        fomulaParaType:"",
        orderIndex:'',
        caption:'',
        typeMaterialID:''
      },
      adddialog2: false,
      Modifydialog2: false,
      dialogVisible: false,
      increasefrom: {
        name: "",
        code: "",
        type: "",
        note: "",
      },
      increasedialog: false,
      options: [
        {
          value: '',
          title:'',
          label:''
        }
      ],
      // 后端返回value都为1所以选择为默认最后一个选项
      value: "",
      // id:'',
      data: [
        {
          value: '',
          title: "",
          label:'',
          children: [
            {
              value: '',
              title: "",
              label:'',
            }
          ],
        }
      ],
      defaultProps: {
        children: "children",
        label: "title",
      },
      selectOrg: {
        orgsid: []
      },
       options2: [{
          ID:'',
          CompanyID:'',
          value: '',
          label: ''
        }],
        value2: '',
      arr:[]
    };
  },
  methods: {
    shuxingjiego() {
        querylisttree({
        Comid:localStorage.getItem('comid')
        }).then(response=>{
         this.data=response.data
         this.options=response.data
        }).catch((error)=>{
          alert('获取失败')
        })
    },
    addtree1(){
      addtree1({
          ID:this.addfrom.ID,
          InterfaceID:this.addfrom.interfaceID,
          CompanyID:this.addfrom.companyID,
          Remark:this.addfrom.remark,
          Caption:this.addfrom.caption,
          OrderIndex:this.addfrom.orderIndex
      }).then(response=>{
        this.shuxingjiego()
        this.$message({
          type:'success',
          message:'添加成功'
        })
      }).catch((error)=>{
        this.$message({
          type:'error',
          message:'添加失败'
        })
      })
    },
    modifytree1(){
       modifytree1({
          ID:this.Modifyfrom.ID,
          InterfaceID:this.Modifyfrom.interfaceID,
          CompanyID:this.Modifyfrom.companyID,
          Remark:this.Modifyfrom.remark,
          Caption:this.Modifyfrom.caption,
          OrderIndex:this.Modifyfrom.orderIndex
      }).then(response=>{
        this.shuxingjiego()
        this.$message({
          type:'success',
          message:'修改成功'
        })
      }).catch((error)=>{
        this.$message({
          type:'error',
          message:'修改失败'
        })
      })
    },
    modifytree2(){
       modifytree2({
          ID:this.Modifyfrom2.ID,
          InterfaceID:this.Modifyfrom2.interfaceID,
          CompanyID:this.companyID,
          Remark:this.Modifyfrom2.remark,
          Caption:this.Modifyfrom2.caption,
          OrderIndex:this.Modifyfrom2.orderIndex,
          FomulaParaType:this.Modifyfrom2.fomulaParaType,
          TypeMaterialID:this.Modifyfrom2.typeMaterialID
      }).then(response=>{
        this.shuxingjiego()
        this.$message({
          type:'success',
          message:'修改成功'
        })
      }).catch((error)=>{
        this.$message({
          type:'error',
          message:'修改失败'
        })
      })
    },
    Modify(node , data) {
      var aa = data.label
      if(aa==='一级节点'){
        this.Modifyfrom.ID=data.value
        this.Modifyfrom.interfaceID=data.interfaceID
        this.Modifyfrom.caption=data.title
        this.Modifyfrom.remark=data.remark
        this.Modifyfrom.orderIndex=data.orderIndex
        this.Modifyfrom.companyID=this.companyID
        this.Modifydialog=true
      }else if(aa==='二级节点'){
        this.Modifyfrom2.ID=data.value
        this.Modifyfrom2.interfaceID=data.interfaceID
        this.Modifyfrom2.caption=data.title
        this.Modifyfrom2.remark=data.remark
        this.Modifyfrom2.orderIndex=data.orderIndex
        this.Modifyfrom2.companyID=this.companyID
        this.Modifyfrom2.fomulaParaType=data.fomulaParaType
        this.Modifyfrom2.typeMaterialID=data.pid
        this.Modifydialog2=true
      } 
    },
    add2() {
      this.arr =  this.$refs.tree.getCurrentNode()
      if(this.arr.label==="一级节点"){
         this.adddialog2=true
      }
      else if(this.arr.label===""){ 
        this.$message({
          type:'info',
          message:'请选择要添加的子节点的父节点'
        })
      }else{
        this.$message({
          type:'info',
          message:'请选择父节点'
        })
      }
    },
    addzijiedian(){
      this.arr =  this.$refs.tree.getCurrentNode()
      alert(this.arr.value)
       addtree2({
          Caption:this.addfrom2.Caption,
          TypeMaterialID:this.arr.value,
          ID:this.addfrom2.ID,
          InterfaceID:this.addfrom2.interfaceID,
          CompanyID:this.companyID,
          Remark:this.addfrom2.remark,
          FomulaParaType:this.addfrom2.fomulaParaType,
          OrderIndex:this.addfrom2.orderIndex
      }).then(response=>{
        this.shuxingjiego()
        this.$message({
          type:'success',
          message:'添加成功'
        })
      }).catch((error)=>{
        this.$message({
          type:'error',
          message:'添加失败'
        })
      })
    },
    Modify2() {
      alert("修改次类型方法待完善");
    },
    delet2(node , data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if(data.label==="二级节点"){
            alert(data.value)
            deletetree2({
            ID:data.value
          }).then(response=>{
            this.shuxingjiego()
             this.$message({
            type: "success",
            message: "删除成功!",
          });
          }).catch((error)=>{
             this.$message({
            type: "error",
            message: "删除未成功!",
          });
          })
          }else{
            alert(data.value)
            deletetree1({
            ID:data.value
          }).then(response=>{
             this.$message({
            type: "success",
            message: "删除成功!",
          });
          }).catch((error)=>{
             this.$message({
            type: "error",
            message: "删除未成功!",
          });
          })
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
  },
  mounted(){
    this.queryselect()
  }
};
</script>
<style scoped>
.table {
  margin-top: 2%;
}
/* /deep/.el-input__inner {
  background-color: #f7f0dcab;
  border-color: rgb(0 0 0 / 67%);
} */
/* .el-button + .el-button {
  background-color: orange;
  border-color: rgb(0 0 0 / 67%);
} */
/* /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: orange;
  border-color: rgb(0 0 0 / 67%);
} */
/deep/.el-form-item__label {
  width: 82px;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .body_dialog_input{
      width: 220px;
      height: 10px;
  }
  .body_dialog2{
    margin-left: 5%;
  }
</style>