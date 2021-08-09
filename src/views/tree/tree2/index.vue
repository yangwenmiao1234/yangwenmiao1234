<template>
  <div class="body">
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
    <div class="select">
      <span>类型：</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.title"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        style="width: 5px
        background-color: orange;
        "
        @click="shuxingjiego(), (dialogVisible = true)"
        ><span>...</span></el-button
      >
      <el-button
        type="primary"
        style="
          margin-left: 10%;
          width: 120px;
          background-color: orange;
          border: 2px solid rgb(0 0 0 / 67%);
        "
        @click="(maindialog = true)"
        >增加</el-button
      >
      <el-button
        type="primary"
        style="
          margin-left: 2%;
          width: 120px;
          background-color: orange;
          border: 2px solid rgb(0 0 0 / 67%);
        "
        @click="get"
        >获取pcs库存</el-button
      >
      <el-button
        type="primary"
        style="
          margin-left: 2%;
          width: 120px;
          background-color: orange;
          border: 2px solid rgb(0 0 0 / 67%);
        "
        @click="update"
        >更新pcs原料</el-button
      >
    </div>

    <div class="dialog">
      <el-dialog
      v-dialogDrag
        title="添加主类型"
        :visible.sync="adddialog"
        width="30%"
        :before-close="handleClose"
      >
        <span slot="footer" class="dialog-footer">
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="addfrom"
          >
            <el-form-item label="公司名称">
              <el-input v-model="addfrom.companyID"></el-input>
            </el-form-item>
            <el-form-item label="ID">
              <el-input v-model="addfrom.ID"></el-input>
            </el-form-item>
            <el-form-item label="序号">
              <el-input v-model="addfrom.orderIndex"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-input v-model="addfrom.caption"></el-input>
            </el-form-item>
            <el-form-item label="接口编码">
              <el-input v-model="addfrom.interfaceID"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="addfrom.remark"></el-input>
            </el-form-item>
          </el-form>
          <el-button @click="adddialog = false">取 消</el-button>
          <el-button type="primary" @click="adddialog = false,addtree1()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
      v-dialogDrag
        title="修改主类型"
        :visible.sync="Modifydialog"
        width="30%"
        :before-close="handleClose"
      >
        <span slot="footer" class="dialog-footer">
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="Modifyfrom"
          >
            <el-form-item label="ID">
              <el-input v-model="Modifyfrom.ID"></el-input>
            </el-form-item>
            <el-form-item label="序号">
              <el-input v-model="Modifyfrom.orderIndex"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-input v-model="Modifyfrom.caption"></el-input>
            </el-form-item>
            <el-form-item label="接口编码">
              <el-input v-model="Modifyfrom.interfaceID"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="Modifyfrom.remark"></el-input>
            </el-form-item>
          </el-form>
          <el-button @click="Modifydialog = false">取 消</el-button>
          <el-button type="primary" @click="Modifydialog = false,modifytree1()"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
      v-dialogDrag
        title="添加次类型"
        :visible.sync="adddialog2"
        width="30%"
        :before-close="handleClose"
      >
        <span slot="footer" class="dialog-footer">
           <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="addfrom2"
          >
          <el-form-item label="名称">
              <el-input v-model="addfrom2.Caption"></el-input>
            </el-form-item>
            <el-form-item label="ID">
              <el-input v-model="addfrom2.ID"></el-input>
            </el-form-item>
            <el-form-item label="序号">
              <el-input v-model="addfrom2.orderIndex"></el-input>
            </el-form-item>
            <el-form-item label="公司标志">
              <el-input v-model="addfrom2.fomulaParaType"></el-input>
            </el-form-item>
            <el-form-item label="接口编码">
              <el-input v-model="addfrom2.interfaceID"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="addfrom2.remark"></el-input>
            </el-form-item>
          </el-form>
          <el-button @click="adddialog2 = false">取 消</el-button>
          <el-button type="primary" @click="adddialog2 = false ,addzijiedian()"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
      v-dialogDrag
        title="修改次类型"
        :visible.sync="Modifydialog2"
        width="30%"
        :before-close="handleClose"
      >
        <span slot="footer" class="dialog-footer">
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="Modifyfrom2"
          >
            <el-form-item label="ID">
              <el-input v-model="Modifyfrom2.ID"></el-input>
            </el-form-item>
            <el-form-item label="序号">
              <el-input v-model="Modifyfrom2.orderIndex"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-input v-model="Modifyfrom2.caption"></el-input>
            </el-form-item>
            <el-form-item label="公司标志">
              <el-input v-model="Modifyfrom2.fomulaParaType"></el-input>
            </el-form-item>
            <el-form-item label="接口编码">
              <el-input v-model="Modifyfrom2.interfaceID"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="Modifyfrom2.remark"></el-input>
            </el-form-item>
          </el-form>
          <el-button @click="Modifydialog2 = false">取 消</el-button>
          <el-button type="primary" @click="Modifydialog2 = false , modifytree2()"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
      v-dialogDrag
        title="提示"
        :visible.sync="maindialog"
        width="45%"
        :before-close="handleClose"
      >
        <span slot="footer" class="dialog-footer">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="主要信息" name="first">
              <el-form
                :label-position="labelPosition"
                label-width="82px"
                :model="mainfrom"
              >
                <div style="display:flex">
                  <div class="" style="">
                  <el-form-item  label="料仓全称">
                    <el-input class="body_dialog_input" v-model="mainfrom.companyID"></el-input>
                  </el-form-item>
                  <el-form-item label="数字编号">
                    <el-input class="body_dialog_input" v-model="mainfrom.storeWeightPointNum"></el-input>
                  </el-form-item>
                  <el-form-item label="排序号">
                    <el-input class="body_dialog_input" v-model="mainfrom.autoID"></el-input>
                  </el-form-item>
                  <el-form-item label="接口编码">
                    <el-input class="body_dialog_input" v-model="mainfrom.interfaceID"></el-input>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input class="body_dialog_input" v-model="mainfrom.storeWeightMax"></el-input>
                  </el-form-item>
                  <el-form-item label="高位报警值">
                    <el-input class="body_dialog_input" v-model="mainfrom.heightTop"></el-input>
                  </el-form-item>
                </div>
                <div
                  class="body_dialog2"
                >
                  <el-form-item label="原料名称">
                    <el-input  class="body_dialog_input" v-model="mainfrom.caption"></el-input>
                  </el-form-item>
                  <el-form-item label="最大容重">
                    <el-input class="body_dialog_input" v-model="mainfrom.storeWeightUnit"></el-input>
                  </el-form-item>
                  <el-form-item label="料仓体积">
                    <el-input class="body_dialog_input" v-model="mainfrom.storeZJ"></el-input>
                  </el-form-item>
                  <el-form-item label="活动形式">
                    <el-input class="body_dialog_input" v-model="mainfrom.orderIndex"></el-input>
                  </el-form-item>
                  <el-form-item label="库存精确位">
                    <el-input class="body_dialog_input" v-model="mainfrom.typeMaterialID"></el-input>
                  </el-form-item>
                  <el-form-item label="低位报警值">
                    <el-input class="body_dialog_input" v-model="mainfrom.heightBottom"></el-input>
                  </el-form-item>
                </div>
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="雷达参数" name="second">
              <el-form
                :label-position="labelPosition"
                label-width="82px"
                :model="Radarfrom"
              >
                <div style="display:flex">
                    <div class="" style="">
                  <el-form-item label="料仓直径">
                    <el-input  class="body_dialog_input" v-model="Radarfrom.alarmHeightMax"></el-input>
                  </el-form-item>
                  <el-form-item label="圆柱高度">
                    <el-input class="body_dialog_input" v-model="Radarfrom.alarmHeightMin"></el-input>
                  </el-form-item>
                  <el-form-item label="椎体高度">
                    <el-input class="body_dialog_input" v-model="Radarfrom.alarmWeightMax"></el-input>
                  </el-form-item>
                  <el-form-item label="雷达线长">
                    <el-input class="body_dialog_input" v-model="Radarfrom.radarLineLength"></el-input>
                  </el-form-item>
                  <el-form-item label="雷达盲区">
                    <el-input class="body_dialog_input" v-model="Radarfrom.radarDeadzone"></el-input>
                  </el-form-item>
                  <el-form-item label="id">
                    <el-input class="body_dialog_input" v-model="Radarfrom.id"></el-input>
                  </el-form-item>
                </div>
                <div
                  class="body_dialog2"
                >
                  <el-form-item label="高位报警">
                    <el-input  class="body_dialog_input" v-model="Radarfrom.commIDNum"></el-input>
                  </el-form-item>
                  <el-form-item label="低位报警">
                    <el-input class="body_dialog_input" v-model="Radarfrom.commIDValue"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-left:-6.7%" label-width="100px" label="雷达高位参数">
                    <el-input class="body_dialog_input" v-model="Radarfrom.stateFlagAlarmMax"></el-input>
                  </el-form-item>
                  <el-form-item  style="margin-left:-6.7%" label-width="100px" label="雷达低位参数">
                    <el-input class="body_dialog_input" v-model="Radarfrom.stateFlagAlarmMin"></el-input>
                  </el-form-item>
                  <el-form-item label="通讯地址">
                    <el-input class="body_dialog_input" v-model="Radarfrom.commIDAddress"></el-input>
                  </el-form-item>
                </div>
                </div>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <el-button style="margin-top: 5%" @click="maindialog = false,addfalse()"
            >取 消</el-button
          >
          <el-button type="primary" @click="maindialog = false,add()"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>

    <!-- <span>料仓信息</span> -->
    <div class="table">
      <Lcxx ref="liaocangxinxi"> </Lcxx>
    </div>
  </div>
</template>
<script>
import {addlcxx} from '@/api/user.js'
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
      mainfrom: {
        companyID: "",
        storeWeightPointNum: "",
        autoID: "",
        interfaceID: "",
        storeWeightMax: "",
        heightTop: "",
        caption: "",
        storeWeightUnit: "",
        storeZJ: "",
        orderIndex: "",
        typeMaterialID: "",
        heightBottom: "",
      },
      Radarfrom: {
        alarmHeightMax: "",
        alarmHeightMin: "",
        alarmWeightMax: "",
        radarLineLength: "",
        radarDeadzone: "",
        commIDNum: "",
        commIDValue: "",
        stateFlagAlarmMax: "",
        stateFlagAlarmMin: "",
        commIDAddress: "",
        id:'',
      },
      maindialog: false,
      activeName: "first",
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
      arr:[]
    };
  },
  methods: {
    shuxingjiego() {
    localStorage.setItem("comid" , this.comid)
        querylisttree({
          comid:localStorage.getItem("comid")
        }).then(response=>{
         this.data=response.data
         this.options=response.data
          Comid:localStorage.getItem('comid')
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
        console.log(data);
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
    add() {
      const aa = this.$refs.liaocangxinxi
      // alert("增加方法还在实现");
      addlcxx({
        companyID:this.mainfrom.companyID,
        storeWeightPointNum:this.mainfrom.storeWeightPointNum,
        autoID:this.mainfrom.autoID,
        interfaceID:this.mainfrom.interfaceID,
        storeWeightMax:this.mainfrom.storeWeightMax,
        heightTop:this.mainfrom.heightTop,
        caption:this.mainfrom.caption,
        storeWeightUnit:this.mainfrom.storeWeightUnit,
        storeZJ:this.mainfrom.storeZJ,
        typeMaterialID:this.mainfrom.typeMaterialID,
        storeVolumeMax:this.mainfrom.storeVolumeMax,
        heightBottom:this.mainfrom.heightBottom,
        alarmHeightMax:this.Radarfrom.alarmHeightMax,
        alarmHeightMin:this.Radarfrom.alarmHeightMin,
        alarmWeightMax:this.Radarfrom.alarmWeightMax,
        radarLineLength:this.Radarfrom.radarLineLength,
        radarDeadzone:this.Radarfrom.radarDeadzone,
        commIDNum:this.Radarfrom.commIDNum,
        commIDValue:this.Radarfrom.commIDValue,
        // stateFlagAlarmMax:this.Radarfrom.stateFlagAlarmMax,
        // stateFlagAlarmMin:this.Radarfrom.stateFlagAlarmMin, 
        commIDAddress:this.Radarfrom.commIDAddress,
        id:this.Radarfrom.id
      }).then((response) => {
                this.$message({
                  message: "添加成功！",
                  type: "success",
                });
                aa.querylist();
                this.addfalse()
                // const gonsixinxi=this.$refs.gonsixinxi
                // gonsixinxi.querylist()
              })
              .catch((error) => {
                this.$message({
                  message: "添加未成功，请联系管理员",
                  type: "error",
                });
              });
    },
    get() {
      alert("获取方法还未实现，敬请期待");
    },
    update() {
      alert("更新方法还未实现，敬请期待");
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    addfalse(){
      this.mainfrom.companyID=""
      this.mainfrom.storeWeightPointNum=""
      this.mainfrom.autoID=""
      this.mainfrom.interfaceID=""
      this.mainfrom.storeWeightMax=""
      this.mainfrom.heightTop=""
      this.mainfrom.caption=""
      this.mainfrom.storeWeightUnit=""
      this.mainfrom.storeZJ=""
      this.mainfrom.typeMaterialID=""
      this.mainfrom.storeVolumeMax=""
      this.mainfrom.heightBottom=""
      this.Radarfrom.alarmHeightMax=""
      this.Radarfrom.alarmHeightMin=""
      this.Radarfrom.alarmWeightMax=""
      this.Radarfrom.radarLineLength=""
      this.Radarfrom.radarDeadzone=""
      this.Radarfrom.commIDNum=""
      this.Radarfrom.commIDValue=""
      this.Radarfrom.stateFlagAlarmMax=""
      this.Radarfrom.stateFlagAlarmMin=""
      this.Radarfrom.commIDAddress=""
      this.Radarfrom.id=""
    },
  },
  mounted(){
  
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