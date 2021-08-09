<template>
  <div class="body">
    <div class="header" style="display: flex">
      <el-button @click="adddialog = true" style="" type="primary" plain
        >增加</el-button
      >
      <el-button style="" type="primary" plain>刷新</el-button>
      <el-button style="" type="primary" plain>查询</el-button>
      <span style="" class="body_span_1">开盘时间:</span>
      <el-date-picker
        class="body_picker_1"
        style=""
        v-model="value2"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      >
      </el-date-picker>
      <span class="body_span_2" style="">生产线：</span>
      <el-select
        class="body_select_1"
        style=""
        v-model="value3"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-form
        :inline="true"
        style=""
        :model="goncheng"
        class="demo-form-inline"
      >
        <el-form-item label="料仓名称:" style="">
          <el-input
            class="body_input_1"
            style=""
            v-model="goncheng.name"
            placeholder="料仓名称"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 3%">
      <ATable ref="table"> </ATable>
    </div>
    <div class="dialog">
      <el-dialog
      v-dialogDrag
        title="添加"
        :visible.sync="adddialog"
        width="45%"
        :before-close="handleClose"
      >
        <div class="dialog">
          <div>
            <el-form
              :label-position="labelPosition"
              label-width="88px"
              :model="addform"
            >
              <el-form-item label="盘库单号：">
                <el-input v-model="addform.ID"></el-input>
              </el-form-item>
             <div style="display:flex">
                <span class="body_span_3"
                >盘库时间：</span
              >
              <el-date-picker
              class="body_picker_2"
                style=""
                v-model="StoreInitTime"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="StoreInitTime"
              >
              </el-date-picker>
             </div>
              <el-form-item class="body_form_1" label="盘库人员：">
                <el-input v-model="addform.StoreInitPerson"></el-input>
              </el-form-item>
              <el-form-item label="印刷票号：">
                <el-input v-model="addform.PageID"></el-input>
              </el-form-item>
              <el-form-item label="理论库存：">
                <el-input v-model="addform.TypeMaterialID"></el-input>
              </el-form-item>
              <el-form-item label="公司ID">
                <el-input v-model="addform.CompanyID"></el-input>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input v-model="addform.Remark"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="body_dialog_2">
            <el-form
              :label-position="labelPosition"
              label-width="88px"
              :model="addform"
            >
              <span class="body_span_4">生产线：</span>
              <el-select
                style="margin-top: %"
                v-model="value5"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <div>
                <span class="body_span_5">类型：</span>
                <el-select
                  style="margin-top: 7%"
                  v-model="value6"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options6"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div>
                <span class="body_span_6">料仓名称：</span>
                <el-select
                class="body_select_2"
                  style=""
                  v-model="ewqe"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options7"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div>
                <span class="body_span_6">原料名称：</span>
                <el-select
                class="body_select_2"
                  v-model="StoreID"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options8"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <el-form-item
              class="body_form_2"
                label="实际库存："
              >
                <el-input
                class="body_input_2"
                  v-model="addform.MaterialCaption"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="adddialog = false">取 消</el-button>
          <el-button type="primary" @click="add(), (adddialog = false)"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import ATable from "@/views/yuanliaoguanli/pankuguanli/table.vue";
import { querylistpkgl, addpkgl, deletespkgl, modifypkgl } from "@/api/user.js";
// import Btable from '@/views/shiyanshi/lishi/btable.vue'
export default {
  components: { ATable },
  data() {
    return {
      adddialog: false,
      table: true,
      ertable: false,
      santable: false,
      radio: "1",
      radio: "3",
      checked: false,
      addform: {
        StoreInitPerson:"",
        CompanyID:"",
        ID: "",
        PageID: "",
        TypeMaterialID: "",
        Remark: "",
        MaterialCaption: "",
        ActionUserID: "4123",
        ActionUserName: "4231",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      StoreInitTime: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      StoreInitTime: "",
      value1: "",
      value2: "",
      options3: [
        {
          value: "选项1",
          label: "一号线",
        },
        {
          value: "选项2",
          label: "二号线",
        },
        {
          value: "选项3",
          label: "三号线",
        },
      ],
      value3: "",
      options5: [
        {
          value: "选项1",
          label: "一号线",
        },
        {
          value: "选项2",
          label: "二号线",
        },
        {
          value: "选项3",
          label: "三号线",
        },
      ],
      value5: "",
      options6: [
        {
          value: "选项1",
          label: "粉料",
        },
        {
          value: "选项2",
          label: "骨料",
        },
        {
          value: "选项3",
          label: "水料",
        },
      ],
      value6: "",
      options7: [
        {
          value: "选项1",
          label: "1-2水泥",
        },
        {
          value: "选项2",
          label: "1-粉煤灰",
        },
        {
          value: "选项3",
          label: "1-矿粉",
        },
      ],
      CompanyID: "",
      options8: [
        {
          value: "选项1",
          label: "水泥",
        },
        {
          value: "选项2",
          label: "煤灰",
        },
        {
          value: "选项3",
          label: "矿粉",
        },
      ],
      StoreID: "",
      goncheng: {
        name: "",
        number: "",
      },
    };
  },
  methods: {
    add() {
      const ss = this.$refs.table;
      addpkgl(
        JSON.stringify({
          StoreInitPerson:this.addform.StoreInitPerson,
          CompanyID: this.addform.CompanyID,
          ID: this.addform.ID,
          PageID: this.addform.PageID,
          TypeMaterialID: this.addform.TypeMaterialID,
          MaterialCaption: this.addform.MaterialCaption,
          Remark: this.addform.Remark,
          StoreID: this.StoreID,
          ActionUserID: this.addform.ActionUserID,
          ActionUserName: this.addform.ActionUserName,
        })
      )
        .then((response) => {
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    setup() {},
  },
};
</script>

<style scoped>
.body {
  padding: 25px;
}
.el-input--small .el-input__inner {
  height: 120px;
  /* line-height: 2rem; */
}
.dialog {
  display: flex;
}
.header {
  height: 50px;
}
.body_span_1 {
  /* font-size: 13px;  */
  /* width: 88px; */
  margin-left: 3%;
  margin-top: 1.1%;
}
.body_picker_1 {
  margin-top: 0.3%;
  margin-left: 0.5%;
}
.body_span_2 {
  margin-left: 2%;
  margin-top: 1.1%;
}
.body_select_1 {
  margin-top: 0.3%;
  margin-left: 0.5%;
}
.demo-form-inline {
  margin-top: 0.4%;
  margin-left: 2%;
}
.body_span_3{
  width: 80px;
  margin-left: 4%
}
.body_picker_2{
  margin-left: 0%
}
.body_form_1{
  margin-top: 8%
}
.body_dialog_2{
  margin-left: 5%
}
.body_span_4{
  margin-top: 0%;
  margin-left: 5%
}
.body_span_5{
  margin-top: 0%;
  margin-left: 10%
}
.body_select_2{
  margin-top: 7%
}
.body_form_2{
  margin-top: 7%;
  margin-left: -5.2%
}
.body_input_2{
margin-left: -4.4%
}
</style>