<template>
  <div class="body">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="生产线" name="first">
        <div class="from">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="公司编号:">
              <el-input
                v-model="formInline.bianhao"
                placeholder="公司编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司全称:">
              <el-input
                v-model="formInline.name"
                placeholder="公司全称"
              ></el-input>
            </el-form-item>
          </el-form>
          <div>
            <el-button icon="el-icon-search" class="from-2-1" type="primary" style="" @click="query()"
              plain>查询</el-button
            >
            <el-button
            icon="el-icon-circle-plus-outline"
              class="from-2-2"
              type="primary"
              style=""
              @click="adddialog = true"
              plain>添加</el-button
            >
          </div>
        </div>
        <div class="table">
          <Scx ref="shengchanxian"></Scx>
        </div>
      </el-tab-pane>
      <el-tab-pane label="料仓信息" name="second">
        <LC> </LC>
      </el-tab-pane>
      <el-tab-pane label="配置信息" name="third">
        <PZ> </PZ>
      </el-tab-pane>
    </el-tabs>

    <div>
      <el-dialog
      v-dialogDrag
        title="添加"
        :visible.sync="adddialog"
        width="30%"
      >
        <el-form
          label-width="80px"
          :model="addform"
        >
          <div class="addform-1">
            <el-form-item label="名称" prop="caption" :rules="[{required: true, trigger: 'blur', message: '请输入名称'}]">
              <el-input v-model="addform.caption" ></el-input>
            </el-form-item>
            <el-form-item label="主机方量" prop="machineSquare" :rules="[{required: true, trigger: 'blur', message: '请输入主机方量'}]">
              <el-input v-model="addform.machineSquare"></el-input>
            </el-form-item>
            <el-form-item label="value值">
              <el-input v-model="addform.value"></el-input>
            </el-form-item>
            <el-form-item label="设备品牌">
              <el-input v-model="addform.machineBrand"></el-input>
            </el-form-item>
            <el-form-item label="设备型号">
              <el-input v-model="addform.machineModel"></el-input>
            </el-form-item>
            <el-form-item label="接口编码">
              <el-input v-model="addform.interfaceID"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="addform.remark"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button plain icon="el-icon-circle-close" @click="adddialog = false ,addfalse()">取 消</el-button>
          <el-button plain icon="el-icon-circle-check" type="primary" @click="(adddialog = false), add()"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Scx from "@/components/table/shengchanxian.vue";
import LC from "@/views/tree/tree2/index.vue";
import PZ from "@/views/tree/tree3/index.vue";
import {
  queryshenchanxianxinxi,
  addshenchanxianxinxi,
  modifyscxxx,
  queryscxxx,
} from "@/api/user";
export default {
  components: { Scx, LC, PZ },
  data() {
    return {
      adddialog: false,
      addform: {
        caption: "",
        machineSquare: "",
        machineBrand: "",
        machineModel: "",
        interfaceID: "",
        remark: "",
        value:'',
      },
      activeName: "first",
      formInline: {
        bianhao: "",
        name: "",
      },
    };
  },
  methods: {
    query() {
      const aa = this.$refs.shengchanxian;
      aa.loading = true;
      queryscxxx({
        page: aa.page,
        intPageSize: aa.size,
        id:this.formInline.bianhao,
        Comid:localStorage.getItem('comid')
      })
        .then((response) => {
          aa.tableData = response.data;
          aa.page = response.data.page;
          aa.size = response.data.PageSize;
          aa.total = response.data.dataCount
          aa.loading = false;
          this.$message({
            type: "success",
            message: "查询成功",
          });
        })
        .catch((error) => {
          this.loading = true;
          this.$message({
            type: "info",
            message: "查询失败，请联系管理员！",
          });
        });
    },
    add() {
      if(this.addform.caption===""){
        this.adddialog = true
          this.$message({
                 message: "请输入名称",
                 type: "info",
              });
      }else{
        if(this.addform.machineBrand===""){
          this.adddialog = true
            this.$message({
                 message: "请输入主机方量",
                 type: "info",
              });
        }else{
          const aa = this.$refs.shengchanxian;
            addshenchanxianxinxi(
              JSON.stringify({
                MachineBrand: this.addform.machineBrand,
                CompanyID: localStorage.getItem('comid'),
                ID: this.addform.value,
                Caption: this.addform.caption,
                MachineSquare: this.addform.machineSquare,
                InterfaceID: this.addform.interfaceID,
                MachineModel: this.addform.machineModel,
                Remark: this.addform.remark,
              })
            )
              .then((response) => {
                this.$message({
                  message: "添加成功！",
                  type: "success",
                });
                aa.querylist();
                this.addfalse()
              })
              .catch((error) => {
                this.$message({
                 message: "添加未成功，请联系管理员",
                 type: "error",
              });
            });
         }
      }
    },
    querylist() {
      const aa = this.$refs.shengchanxian;
      aa.querylist();
    },
    addfalse(){
        this.addform.AutoID=""
        this.addform.CompanyID=""
        this.addform.ID=""
        this.addform.Caption=""
        this.addform.MachineSquare=""
        this.addform.MachineBrand=""
    }
  },
};
</script>
<style scoped>
.body {
  padding: 25px;
}
/* /deep/.el-input__inner {
  background-color: #f7f0dcab;
  border-color: rgb(0 0 0 / 67%);
} */
.from {
  display: flex;
}
.from-2-1 {
  /* margin-left: 116%; */
  width: 120px;
}
.from-2-2 {
  /* margin-left: 116%; */
  width: 120px;
}
</style>