<template>
  <!--  :header-cell-style="{background:'rgb(0 0 0 / 67%)',color:'#606266'}"
修改表头背景颜色
  -->
  <div style="width:100%">
    <div>
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
                  <el-form-item  label="料仓全称">
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
                  <el-form-item style="margin-top:0%" label="最大容重">
                    <el-input class="body_dialog_input"  v-model="mainfrom.storeWeightMax"></el-input>
                  </el-form-item>
                  <el-form-item label="料仓体积">
                    <el-input class="body_dialog_input" v-model="mainfrom.storeVolumeMax"></el-input>
                  </el-form-item>
                  <el-form-item label="库存单位">
                    <el-select v-model="storeWeightUnit" filterable placeholder="请选择">
                    <el-option
                      v-for="item in options3"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  </el-form-item>
                  <el-form-item label="库存精确位">
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
           plain >取 消</el-button
          >
          <el-button icon="el-icon-circle-check" type="primary" @click="maindialog = false,modify()"
            plain>确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <div class="table" style="width:100%">
      <el-table
      v-loading="loading"
        :header-cell-style="{  background: 'rgba(249, 182, 3, 0.67)', color: '#606266' }"
        :data="tableData"
        border
        :cell-style="rowClass"
        style="width:100%"
      >
        <el-table-column fixed="left" label="序号" width="50px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="ID" label="料仓编号" width="">
        </el-table-column>
        <el-table-column prop="Caption" label="料仓全称" width="">
        </el-table-column>
        <el-table-column prop="MaterialName" label="原料名称" width="">
        </el-table-column>
        <el-table-column prop="StoreWeightMax" label="最大容量" width="">
        </el-table-column>
        <el-table-column prop="StoreWeightUnit" label="库存单位" width="">
        </el-table-column>
        <el-table-column prop="StoreWeightPointNum" label="库存精确位" width="">
        </el-table-column>
        <el-table-column prop="CommIDNum" label="数字编号" width="">
        </el-table-column>
        <el-table-column prop="Remark" label="备注" width="">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150px">
          <template slot-scope="scope">
            <el-button
            icon="el-icon-edit"
              type="text"
              size="small"
              @click="editorClick(scope.row), (maindialog = true)"
              >编辑</el-button
            >
            <el-button
            icon="el-icon-delete"
              type="text"
              size="small"
              @click="deletes(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
       <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    </div>
  </div>
</template>

<script>

import {querylistlcxx , deleteslcxx , modifylcxx}  from '@/api/user.js'
export default {
  data() {
    return {
      maindialog:false,
      title:'',
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
      total: 0,
      loading: false,
      page: 1,
      size: 10,
      tableData: [
        {
          ID: "",
          CompanyID: "",
          Caption: "",
          TypeMaterialID: "",
          MaterialID: "",
          storeWeightUnit: "",
          storeWeightPointNum: "",
          storeWeightMax: "",
        }
      ],
      viewdialog: false,
      editordialog: false,
      activeName:"first",
    };
  },
  methods: {
     querylist() {
      this.loading = true;
      // console.log(document.getElementById("#123 #1234"))
      let self = this;
      querylistlcxx({
        Typematerialid : localStorage.getItem('Typematerialid'),
        page: this.page,
        intPageSize: this.size,
        Comid:localStorage.getItem('comid'),
        
      })
        .then((response) => {
          this.tableData = response.data.data;
          this.page = response.data.page;
          this.size = response.data.PageSize;
          this.total = response.data.dataCount;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = true;
          this.$message({
            type: "info",
            message: "查询失败，请联系管理员！",
          });
        });
    },
     deletes(row) {
      // debugger;
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteslcxx({
            id: row.ID,
          })
            .then((response) => {
              // alert("1  ")
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.querylist();
              // const gonsixinxi=this.$refs.gonsixinxi
              // gonsixinxi.querylist()
            })
            .catch((error) => {
              this.$message({
                message: "删除未成功，请联系管理员",
                type: "error",
              });
            });
        })
        .catch((error) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    modify() {
      modifylcxx({
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
            type: "success",
            message: "修改成功!",
          });
          console.log(response);
          this.querylist();
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "修改未成功，请联系管理员",
          });
        });
    },
    editorClick(row) {
        this.mainfrom.Caption = row.Caption,
        this.mainfrom.commIDNum = row.CommIDNum,
        this.mainfrom.orderIndex = row.OrderIndex,
        this.mainfrom.interfaceID = row.InterfaceID,
        this.mainfrom.remark = row.Remark,
        this.mainfrom.alarmHeightMax = row.AlarmHeightMax,
        this.materialName = row.MaterialName,
        this.mainfrom.storeWeightMax = row.StoreWeightMax,
        this.mainfrom.storeVolumeMax = row.StoreVolumeMax,
        this.mainfrom.storeWeightPointNum = row.StoreWeightPointNum,
        this.mainfrom.alarmHeightMin = row.AlarmHeightMin,
        this.Radarfrom.storeZJ = row.StoreZJ,
        this.Radarfrom.heightTop = row.HeightTop,
        this.Radarfrom.heightBottom = row.HeightBottom,
        this.Radarfrom.radarLineLength = row.RadarLineLength,
        this.Radarfrom.radarDeadzone = row.RadarDeadzone,
        this.Radarfrom.alarmHeightMax = row.AlarmHeightMax,
        this.Radarfrom.alarmHeightMin = row.AlarmHeightMin,
        // StateFlagAlarmMax : this.Radarfrom.stateFlagAlarmMax,
        // StateFlagAlarmMin : this.Radarfrom.stateFlagAlarmMin,
        this.Radarfrom.commIDAddress = row.CommIDAddress,
        this.storeWeightUnit = row.StoreWeightUnit
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
     handleSizeChange(val) {
      console.log(val);
      this.size = val;
      this.querylist();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.querylist();
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
    // 打开页面就执行的方法
    this.querylist()
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
.el-alert_content{
  display: table-cell;
  padding: 0 0.5rem;
  width: 100%;
}
</style>