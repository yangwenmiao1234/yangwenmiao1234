<template>
  <div class="body">
    <el-dialog
      v-dialogDrag
        :title="title"
        :visible.sync="maindialog"
        width="45%"
        :before-close="handleClose"
      >
        <span slot="footer" class="dialog-footer">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="主要信息" name="first">
              <el-form
                label-width="82px"
                :model="mainfrom"
              >
                <div style="display:flex">
                  <div class="" style="">
                  <el-form-item  label="料仓全称" prop="Caption" :rules="[{required: true, trigger: 'blur', message: '请输入料仓全称'}]">
                    <el-input class="body_dialog_input" v-model="mainfrom.Caption"></el-input>
                  </el-form-item>
                  <el-form-item label="数字编号">
                    <el-input class="body_dialog_input" v-model="mainfrom.commIDNum"></el-input>
                  </el-form-item>
                  <el-form-item label="排序号">
                    <el-input class="body_dialog_input" v-model="mainfrom.orderIndex"></el-input>
                  </el-form-item>
                  <el-form-item label="接口编码">
                    <el-input class="body_dialog_input" v-model="mainfrom.interfaceID"></el-input>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input class="body_dialog_input" v-model="mainfrom.remark"></el-input>
                  </el-form-item>
                  <el-form-item label="高位报警值">
                    <el-input class="body_dialog_input" v-model="mainfrom.alarmHeightMax"></el-input>
                  </el-form-item>
                </div>
                <div
                  class="body_dialog2"
                >
                <el-form-item label="原料名称">
                  <el-select v-model="materialName" filterable placeholder="请选择">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.Caption"
                      :value="item.ID">
                    </el-option>
                  </el-select>
                  </el-form-item>
                  <el-form-item style="margin-top:0%" label="最大容重" prop="storeWeightMax" :rules="[{required: true, trigger: 'blur', message: '请输入最大容重'}]">
                    <el-input class="body_dialog_input"  v-model="mainfrom.storeWeightMax"></el-input>
                  </el-form-item>
                  <el-form-item label="料仓体积">
                    <el-input class="body_dialog_input" v-model="mainfrom.storeVolumeMax"></el-input>
                  </el-form-item>
                  <el-form-item label="库存单位" prop="storeWeightUnit" :rules="[{required: true, trigger: 'blur', message: '请选择库存单位'}]">
                    <el-select v-model="storeWeightUnit" filterable placeholder="请选择">
                    <el-option
                      v-for="item in options3"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  </el-form-item>
                  <el-form-item label="库存精确位" prop="storeWeightPointNum" :rules="[{required: true, trigger: 'blur', message: '请输入库存精确位'}]">
                    <el-input class="body_dialog_input" v-model="mainfrom.storeWeightPointNum"></el-input>
                  </el-form-item>
                  <el-form-item label="低位报警值">
                    <el-input class="body_dialog_input" v-model="mainfrom.alarmHeightMin"></el-input>
                  </el-form-item>
                </div>
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="雷达参数" name="second">
              <el-form
                label-width="82px"
                :model="Radarfrom"
              >
                <div style="display:flex">
                    <div class="" style="">
                  <el-form-item label="料仓直径">
                    <el-input  class="body_dialog_input" v-model="Radarfrom.storeZJ"></el-input>
                  </el-form-item>
                  <el-form-item label="圆柱高度">
                    <el-input class="body_dialog_input" v-model="Radarfrom.heightTop"></el-input>
                  </el-form-item>
                  <el-form-item label="椎体高度">
                    <el-input class="body_dialog_input" v-model="Radarfrom.heightBottom"></el-input>
                  </el-form-item>
                  <el-form-item label="雷达线长">
                    <el-input class="body_dialog_input" v-model="Radarfrom.radarLineLength"></el-input>
                  </el-form-item>
                  <el-form-item label="雷达盲区">
                    <el-input class="body_dialog_input" v-model="Radarfrom.radarDeadzone"></el-input>
                  </el-form-item>
                </div>
                <div
                  class="body_dialog2"
                >
                  <el-form-item label="高位报警">
                    <el-input  class="body_dialog_input" v-model="Radarfrom.alarmHeightMax"></el-input>
                  </el-form-item>
                  <el-form-item label="低位报警">
                    <el-input class="body_dialog_input" v-model="Radarfrom.alarmHeightMin"></el-input>
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
          <el-button icon="el-icon-circle-close" style="margin-top: 5%" @click="maindialog = false,addfalse()"
            >取 消</el-button
          >
          <el-button icon="el-icon-circle-check" type="primary" @click="maindialog = false,add()"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <div v-show="false" class="table">
      <Lcxx ref="liaocangxinxi"> </Lcxx>
    </div>
    </div>
</template>
<script>
import {addlcxx , querylistlcxx , querylistylxx} from '@/api/user.js'
import {querylisttree , addtree1 , addtree2 , modifytree1 , modifytree2 ,deletetree1 , deletetree2} from '@/api/tree.js'
import Lcxx from "@/components/table/liaocangxinxi.vue";
export default {
  components: { Lcxx },
  //   components: {  },
  data() {
    return {
      title:'',
      companyID:"HGMES",
      comid:"HGMES",
      mainfrom: {
        Caption : "",
        commIDNum: "",
        orderIndex: "",
        interfaceID: "",
        remark: "",
        alarmHeightMax: "",
        storeWeightMax: "",
        storeVolumeMax: "",
        storeWeightPointNum: "",
        alarmHeightMin: "",
      },
      Radarfrom: {
        storeZJ: "",
        heightTop: "",
        heightBottom: "",
        radarLineLength: "",
        radarDeadzone: "",
        alarmHeightMax: "",
        alarmHeightMin: "",
        stateFlagAlarmMax: "",
        stateFlagAlarmMin: "",
        commIDAddress: "",
      },
      maindialog: false,
      activeName: "first",
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
          Caption:'',
          value: '',
          label: '',
          TypeMaterialID:'',
        }],
        materialName: '',
       options3: [{
          value: '0',
          label: '吨',
        },
        {
          value: '1',
          label: '千克',
        },{
          value: '2',
          label: '袋',
        }],
        storeWeightUnit: '',
      arr:[]
    };
  },
  methods: {
    querylist(){
      const aa = this.$refs.liaocangxinxi
      querylistlcxx({
        Typematerialid : localStorage.getItem('Typematerialid'),
        page: aa.page,
        intPageSize: aa.size,
        Comid:localStorage.getItem('comid'),
      }) .then((response) => {
          aa.tableData = response.data.data;
          aa.page = response.data.page;
          aa.size = response.data.PageSize;
          aa.total = response.data.dataCount;
          aa.loading = false;
        })
        .catch((error) => {
          aa.loading = true;
          this.$message({
            type: "info",
            message: "查询失败，请联系管理员！",
          });
        });
    },
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
    addmaindialog(){
        this.title = '增加'
        this.maindialog = true
    },
    add() {
      const aa = this.$refs.liaocangxinxi
      // alert("增加方法还在实现");
        addlcxx({
        Caption : this.mainfrom.Caption,
        CommIDNum : this.mainfrom.commIDNum,
        OrderIndex : this.mainfrom.orderIndex,
        InterfaceID : this.mainfrom.interfaceID,
        Remark : this.mainfrom.remark,
        AlarmHeightMax : this.mainfrom.alarmHeightMax,
        MaterialID : this.materialName,
        StoreWeightMax : this.mainfrom.storeWeightMax,
        StoreVolumeMax : this.mainfrom.storeVolumeMax,
        StoreWeightPointNum : this.mainfrom.storeWeightPointNum,
        AlarmHeightMin : this.mainfrom.alarmHeightMin,
        StoreZJ : this.Radarfrom.storeZJ,
        HeightTop : this.Radarfrom.heightTop,
        HeightBottom : this.Radarfrom.heightBottom,
        RadarLineLength : this.Radarfrom.radarLineLength,
        RadarDeadzone : this.Radarfrom.radarDeadzone,
        AlarmHeightMax : this.Radarfrom.alarmHeightMax,
        AlarmHeightMin : this.Radarfrom.alarmHeightMin,
        // StateFlagAlarmMax : this.Radarfrom.stateFlagAlarmMax,
        // StateFlagAlarmMin : this.Radarfrom.stateFlagAlarmMin,
        CommIDAddress : this.Radarfrom.commIDAddress,
        CompanyID : localStorage.getItem('comid'),
        StoreWeightUnit : this.storeWeightUnit,
        TypeMaterialID : localStorage.getItem('TypeMaterialID')
      }).then((response) => {
        this.$message({
          message: "添加成功！",
          type: "success",
        });
        this.querylist();
        this.addfalse()
        localStorage.removeItem('TypeMaterialID')
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
    queryselect(){
      querylistylxx({
         page: this.page,
         intPageSize: this.size,
         Comid:localStorage.getItem('comid'),
      }).then((response)=>{
        this.options2 = response.data.data
        console.log(response.data.data)
      })
    },
  },
  mounted(){
    this.queryselect()
    this.shuxingjiego()
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
  }
  .body_dialog2{
    margin-left: 5%;
  }
</style>