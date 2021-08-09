<template>
  <!--  :header-cell-style="{background:'rgb(0 0 0 / 67%)',color:'#606266'}"
修改表头背景颜色
  -->
<div>
   <el-dialog
   v-dialogDrag
        title="添加"
        :visible.sync="editordialog"
        width="45%"
        :before-close="handleClose"
      >
        <div class="dialog">
          <div>
            <el-form
              :label-position="labelPosition"
              label-width="80px"
              :model="editorform"
            >
              <el-form-item label="盘库单号：">
                <el-input v-model="editorform.ID"></el-input>
              </el-form-item>
               <span class="body_span_3">盘库时间：</span>
                <el-date-picker
               class="body_picker_2"
                  v-model="StoreInitTime"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="StoreInitTime">
                </el-date-picker>
              <el-form-item class="body_form_1" label="盈亏：">
                <el-input v-model="editorform.WeightTheory"></el-input>
              </el-form-item>
              <el-form-item label="印刷票号：">
                <el-input v-model="editorform.PageID"></el-input>
              </el-form-item>
            <el-form-item label="理论库存：">
                <el-input v-model="editorform.TypeMaterialID"></el-input>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input v-model="editorform.Remark"></el-input>
              </el-form-item>
            </el-form>
          </div>
         <div class="body_dialog_2">
            <el-form
              :label-position="labelPosition"
              label-width="80px"
              :model="editorform"
            >
              <span class="body_span_4">生产线：</span>
      <el-select filterable  allow-create
    default-first-option style="margin-top: %" v-model="value5" placeholder="请选择">
        <el-option
          v-for="item in options5"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
     <div>
        <span  class="body_span_6">料仓名称：</span>
      <el-select filterable  allow-create
    default-first-option style="margin-top: 7%" v-model="CompanyID" placeholder="请选择">
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
      <el-select  filterable allow-create
    default-first-option  style="margin-top: 7%" v-model="StoreID" placeholder="请选择">
        <el-option
          v-for="item in options8"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      </div>
     <el-form-item class="body_form_2" label="实际库存：">
      <el-input class="body_input_2" v-model="editorform.MaterialCaption"></el-input>
    </el-form-item>
    <el-form-item  class="body_form_3" label="盘库人员：">
     <el-input class="body_input_3" style="" v-model="editorform.StoreInitPerson"></el-input>
    </el-form-item>
  </el-form>
</div>
</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editordialog = false">取 消</el-button>
          <el-button type="primary"  @click="editordialog = false,modify()">确 定</el-button>
        </span>
      </el-dialog>
<div class="table">
        <el-table
        v-loading="loading"
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
        <el-table-column prop="StoreInitTime" label="盘库时间" width="">
        </el-table-column>
        <el-table-column prop="ProduceLineID" label="生产线" width="">
        </el-table-column>
        <el-table-column prop="CompanyID" label="料仓名称" width="">
        </el-table-column>
        <el-table-column prop="TypeMaterialID" label="理论库存" width="">
        </el-table-column>
        <el-table-column prop="MaterialCaption" label="实际库存" width="">
        </el-table-column>
        <el-table-column prop="WeightTheory" label="盈亏" width="">
        </el-table-column>
        <el-table-column prop="StoreID" label="原料名称" width="">
        </el-table-column>
        <el-table-column prop="StoreInitPerson" label="盘库人员" width=""> 
        </el-table-column>
        <el-table-column prop="PageID" label="印刷票号" width=""> 
        </el-table-column>
        <el-table-column prop="Remark" label="备注" width=""> 
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100px">
          <template slot-scope="scope">
            <el-button style="color: rgb(0 0 0 / 67%)" type="text" size="small"
             @click="editorClick(scope.row),editordialog=true"
              >编辑</el-button
            > 
            <el-button style="color: rgb(0 0 0 / 67%)" type="text" size="small"
             @click="deletes(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
</div>
<div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { querylistpkgl , addpkgl , deletespkgl , modifypkgl } from '@/api/user.js'
export default {
    data() {
    return {
      editordialog:false,
       loading: false,
      total: 0,
      size: 10,
      page: 1,
        editorform:{
          ID:'',
          PageID:"",
          TypeMaterialID:"",
          Remark:"",
          MaterialCaption:"",
          ActionUserID:'4123',
          ActionUserName:'4231',
          WeightTheory:"",
          StoreInitPerson:'',
        },
      tableData: [
        {
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
      ],
      viewdialog: false,
      editordialog:false,
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
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        StoreInitTime: '',
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
    };
  },
  methods: {
    deletes(row){
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        alert(row.ID)
          deletespkgl({
            ID:row.ID,
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
    querylist(){
      querylistpkgl({
            page: this.page,
        intPageSize: this.size,
         Comid:localStorage.getItem('comid')
      }).then((response) => {
          this.tableData = response.data.data;
          this.page = response.data.page;
          this.size = response.data.PageSize;
          this.total = response.data.dataCount; 
          this.$message({
            type: "success",
            message: "查询成功",
          });
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
    modify() {
      modifypkgl(
      JSON.stringify({
      WeightTheory:this.editorform.WeightTheory,
      CompanyID:this.CompanyID ,
      ID:this.editorform.ID,
      PageID:this.editorform.PageID,
      TypeMaterialID:this.editorform.TypeMaterialID,
      MaterialCaption:this.editorform.MaterialCaption,
      Remark:this.editorform.Remark,
      StoreID:this.StoreID,
      ActionUserID :this.editorform.ActionUserID,
      ActionUserName :this.editorform.ActionUserName,
      StoreInitPerson:this.editorform.StoreInitPerson,
        })
      )
        .then((response) => {
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
    editorClick(row){
    this.editorform.ID = row.ID
    this.StoreInitTime = row.StoreInitTime
    this.ProduceLineID = row.ProduceLineID
    this.CompanyID = row.CompanyID
    this.editorform.TypeMaterialID = row.TypeMaterialID
    this.editorform.MaterialCaption = row.MaterialCaption
    this.editorform.WeightTheory = row.WeightTheory
    this.StoreID = row.StoreID
    this.editorform.StoreInitPerson = row.StoreInitPerson
    this.editorform.PageID = row.PageID
    this.editorform.Remark = row.Remark
    this.editorform.StoreInitPerson = row.StoreInitPerson
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
.dialog {
  display: flex;
}
.body_span_3{
  margin-left: 5%
}
.body_picker_2{
  margin-left: 3.3%
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
.body_form_3{
  margin-left:-5.2%
}
.body_input_3{
  margin-left:-4.4%
}
</style>