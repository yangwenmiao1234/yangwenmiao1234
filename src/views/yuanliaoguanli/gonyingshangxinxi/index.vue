<template>
  <div class="body">
    <div style="display: flex">
      <el-button
      class="body_button_1"
        type="primary"
        plain
        @click="(adddialog = true)"
        >增加</el-button
      >
      <span class="body_span_1" style="">类型：</span>
      <el-select style="margin-top: %" v-model="value3" placeholder="请选择">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="body_table_1" style="">
      <div style="width:100%">
        <Table ref="child"> </Table>
      </div>
      <div class="con" style="">供应商信息</div>
    </div>
    <div class="dialog">
      <el-dialog
      v-dialogDrag
        title="提示"
        :visible.sync="adddialog"
        width="45%"
        :before-close="handleClose"
      >
        <div class="body_dialog_1" style="">
          <div class="body_dialog_2" style="">
            <el-form
              :label-position="labelPosition"
              label-width="80px"
              :model="addfrom"
            >
            <el-form-item  label="ID">
                <el-input class="body_dialog_input" v-model="addfrom.ID"></el-input>
              </el-form-item>
              <el-form-item  label="编号：">
                <el-input class="body_dialog_input" v-model="addfrom.caption"></el-input>
              </el-form-item>
              <el-form-item label="公司ID">
                <el-input class="body_dialog_input" v-model="addfrom.CompanyID"></el-input>
              </el-form-item>
              <el-form-item label="名称：">
                <el-input class="body_dialog_input" v-model="addfrom.name"></el-input>
              </el-form-item>
              <el-form-item label="营业执照">
                <el-input class="body_dialog_input" v-model="addfrom.zhizhao"></el-input>
              </el-form-item>
              <el-form-item label="联系人员">
                <el-input class="body_dialog_input" v-model="addfrom.people"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input class="body_dialog_input" v-model="addfrom.phone"></el-input>
              </el-form-item>
              <el-form-item label="联系地址">
                <el-input class="body_dialog_input" v-model="addfrom.addres"></el-input>
              </el-form-item>
              <el-form-item label="接口编码">
                <el-input class="body_dialog_input" v-model="addfrom.code"></el-input>
              </el-form-item>
              <el-form-item label="排序号">
                <el-input class="body_dialog_input" v-model="addfrom.xuhao"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input class="body_dialog_input" v-model="addfrom.note"></el-input>
              </el-form-item>
              <span class="body_span_3">类型：</span>
      <el-select class="body_select_1" v-model="value4" placeholder="请选择">
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
            </el-form>
          </div>
          <div class="con-1-2">
              <el-checkbox class="body_dialog_checkbox" v-model="checked1">中砂</el-checkbox>
              <div>
                  <el-checkbox class="body_dialog_checkbox1" v-model="checked2">1-5石</el-checkbox>
              </div>
              <div>
                  <el-checkbox class="body_dialog_checkbox1" v-model="checked3">水泥</el-checkbox>
              </div>
              <div>
                  <el-checkbox class="body_dialog_checkbox1" v-model="checked4">煤灰</el-checkbox>
              </div>
              <div>
                  <el-checkbox class="body_dialog_checkbox1" v-model="checked5">矿粉</el-checkbox>
              </div>
              <div>
                   <el-checkbox class="body_dialog_checkbox1" v-model="checked6">膨胀剂</el-checkbox>
              </div>
              <div>
                  <el-checkbox class="body_dialog_checkbox1" v-model="checked7">水</el-checkbox>
              </div>
              <div>
                   <el-checkbox class="body_dialog_checkbox1" v-model="checked8">水2</el-checkbox>
              </div>
              <div>
                  <el-checkbox class="body_dialog_checkbox1" v-model="checked9">添加剂</el-checkbox>
              </div>
              <div>
                 <el-checkbox class="body_dialog_checkbox1" v-model="checked10">柴油</el-checkbox>
              </div>
              <div>
                 <el-checkbox class="body_dialog_checkbox1" v-model="checked11">混凝土</el-checkbox>
              </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="adddialog = false">取 消</el-button>
          <el-button type="primary" @click="adddialog = false,add()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Table from "@/views/yuanliaoguanli/gonyingshangxinxi/table.vue";
import { querylistgysxx , addgysxx , deletesgysxx , modifygysxx } from '@/api/user.js'
import { data } from 'autoprefixer';
// import { indexOf } from 'mock/user';
// import { slice } from 'mock/user';
export default {
  components: { Table },
  data() {
    return {
        addfrom: {
          ID:"12",
          CompanyID :'HGMES',
          name: '三一重工',
          caption: '123',
          xuhao: '1',
          zhizhao:'中国执照',
          people:'杨工',
          addres:'长沙市',
          phone:'176',
          code:'code',
          note:'测试接口专用'
        },
      adddialog: false,
      options3: [
        {
          value: "选项1",
          label: "原料供应商",
        },
        {
          value: "选项2",
          label: "原料买主",
        },
      ],
      value3: "",
      options4: [
        {
          value: "选项1",
          label: "原料供应商",
        },
        {
          value: "选项2",
          label: "原料买主",
        },
      ],
      value4: "",
    };
  },
  methods: {
    add() {
      const vv = this.$refs.child 
      addgysxx({
        CompanyID :this.addfrom.CompanyID ,
        ID: this.addfrom.ID,
        Caption:this.addfrom.caption,
        License:this.addfrom.zhizhao,
        Manager: this.addfrom.people,
        Phone: this.addfrom.phone,
        HomeAddress: this.addfrom.addres,
        InterfaceID: this.addfrom.code,
        OrderIndex: this.addfrom.xuhao,
        "actionUserID": "string",
        "actionUserName": "string",
        ActionTime:new Date(),
        Remark: this.addfrom.note,
      }).then((response) => {
          this.$message({
            message: "添加成功！",
            type: "success",
          });
          vv.querylist();
        })
        .catch((error) => {
          this.$message({
            message: "添加未成功，请联系管理员",
            type: "error",
          });
        });
    },
    xiugai(){
     
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style scoped>
.body {
  padding: 25px;
}
.el-header,
.el-footer {
  background-color: #ffffff;
  color: #333;
  /* text-align: center; */
  line-height: 100px;
}

.el-aside {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 800px;
}
.con {
  background-color: rgba(223, 184, 59, 0.514);
}
.body_button_1{
  width: 80px;
  margin-left:0%; 
  margin-top: 0%;
}
.body_span_1{
  margin-top: 0.8%;
  margin-left: 2%
}
.body_table_1{
  margin-top: 2%;
  display: flex;
}
.con{
  width: 30%
}
.body_dialog_1{
  width: 100%;
  display:flex
}
.body_dialog_2{
  width: 60%
}
.body_dialog_input{
  width:150px
}
.body_span_3{
  margin-top: 1%;
  margin-left: 9.3%
}
.body_select_1{
  margin-top: 0.3%
}
.body_dialog_checkbox{
  width:130px;
  margin-left:0%
}
.body_dialog_checkbox1{
  width:130px;
  margin-top: 11%
}
</style>