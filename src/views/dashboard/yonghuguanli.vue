<template>
  <div class="body">
    <el-drawer
      title="分配菜单"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose">
      <el-tree
      show-checkbox=""
      style="margin-top: 3%"
      :data="datatree"
      default-expand-all
      node-key="id"
      ref="tree"
    >
    </el-tree>
    <el-form style="margin-top:10%;margin-left:10%" ref="form" :model="form" label-width="80px">
      <el-form-item>
        <el-button type="primary" @click="drawer=false,savemenu()" plain>保存菜单</el-button>
        <el-button type="primary" @click="drawer=false" plain>取消</el-button>
      </el-form-item>
    </el-form>
    </el-drawer>
    <el-dialog
      :title="title"
      :visible.sync="adduserdialog"
      width="30%">
        <div class="dialog">
            <el-form ref="form" :rules="formRules" :model="addform" label-width="80px">
              <el-form-item label="用户名称：" prop="name" :rules="[{required: true, trigger: 'blur', message: '请输入用户名'}]">
                <el-input v-model="addform.name"></el-input>
              </el-form-item>
              <el-form-item label="密码：" prop="pass" :rules="[{required: true, trigger: 'blur', message: '请输入密码'}]">
                <el-input v-model="addform.pass"></el-input>
              </el-form-item>
              <el-form-item prop="region" label="部门：" :rules="[{required: true, trigger: 'blur', message: '请选择部门'}]">
                <el-select v-model="region" placeholder="请选择活动区域">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="创建时间：">
                  <el-date-picker
                    v-model="time"
                    type="datetime"
                    placeholder="选择日期时间"
                    default-time="12:00:00">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="性别：">
              <el-radio v-model="radio" label="1">男</el-radio>
              <el-radio v-model="radio" label="2">女</el-radio>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input v-model="addform.remark"></el-input>
              </el-form-item>
              <el-form-item label="菜单权限：" :rules="[{required: true, trigger: 'blur', message: '请选择部门'}]">
                <el-button @click="drawer = true , querymenu()" type="primary">
                  点击分配
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="adduserdialog=false , dialog()"  type="primary">{{button}}</el-button>
                <el-button @click="adduserdialog=false">取消</el-button>
              </el-form-item>
            </el-form>
        </div>
        </el-dialog>
      <div class="body-1">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item prop="name" label="用户名:" >
            <el-input
              v-model="form.name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="department" label="部门:">
            <el-select v-model="department" clearable placeholder="请选择部门">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <!-- :disabled="jinyong==-1"  jinyong:'-1', 当值为-1时候 按钮禁用 -->
            <el-button  icon="el-icon-search" type="primary" @click="querylist()" plain>查询</el-button>
          <el-button icon="el-icon-circle-plus-outline" type="primary" @click="adddialog()" plain>增加</el-button>
          </el-form-item>
        </el-form>
      </div>
    <div class="table" style="margin-top:3%">
      <el-table
      :header-cell-style="{  background: 'rgba(249, 182, 3, 0.67)', color: '#606266' }"
      v-loading="loading"
      :cell-style="cellStyle"
      :row-class-name="tableRowClassName"
      :data="tableData"
      border
      style="width: 100%">
    <el-table-column fixed="left" label="编号" width="70px">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
    <el-table-column
      prop="DateComeInCompany"
      label="创建日期">
    </el-table-column>
    <el-table-column
      prop="UserName"
      label="用户名">
    </el-table-column>
    <el-table-column
      prop="Sex"
      label="性别">
    </el-table-column>
    <el-table-column
      prop="UserID"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="DepartmentID"
      label="部门">
    </el-table-column>
    <el-table-column
      prop="Remark"
      label="备注">
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="150px">
          <template slot-scope="scope">
            <el-button
            icon="el-icon-edit"
              type="text"
              size="small"
              @click="editorClick(scope.row)"
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
import { querymenu } from '@/api/menu.js'
import { queryuser, adduser, modifyuser, deleteuser } from '@/api/usercontrol.js'
import { validUsername } from '@/utils/validate';
export default {
  data() {
    return {
      title:'',
      pickerOptions: {
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
      time: '',
      drawer: false,
      direction: 'rtl',
      adduserdialog: false,
      formRules:{
        // name:[{required: true, trigger: 'blur', message: '用户名不能为空'}]
      },
      router:[],
      name:'example',
      active: 0,
      form: [
        {
        name: "",
        department: "",
      }
      ],
      loading: false,
      total: 0,
      size: 10,
      page: 1,
      tableData: [{
          
        },],
      addform: {
            name: '',
            region: '',
            pass: '',
            remark: '',
          },
        datatree: [
        {
          value: "",
          title: "",
          label: "",
          children: [
            {
              value: "",
              title: "",
              label: "",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
       options: [{
          value: '选项1',
          label: '销售部'
        }, {
          value: '选项2',
          label: '技术部'
        },],
        department: '',
        options2: [{
          value: '选项1',
          label: '销售部'
        }, {
          value: '选项2',
          label: '技术部'
        },],
        region:'',
      pid:0,
      arr:[],
      router:[],
      radio:'1',
      button:''
      };
  },
  methods: {
    // 修改表头样式 字体居中
    headClass() {
      return "text-align:center";
    },
    // 修改行内样式 表格字体居中
    cellStyle() {
      return "text-align:center";
    },
    // 修改表格颜色 隔行换行
    tableRowClassName({ row, rowIndex }) {
        if (rowIndex%2=== 1) {
            return 'warning-row';
        } else {
            return 'success-row';
        }
        return '';
    },
    handleClose(done){
      this.$confirm("还未保存，确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // handleCheckChange() {
    // @check-change="handleCheckChange" 这是是要求填到上面树形控件里面去的
    //   // 获取树形结构父节点id
    //   this.arr = this.$refs.tree.getCurrentNode();
    // },
    savemenu(){
      console.log(this.$refs.tree.getCheckedNodes())
      this.arr = this.$refs.tree.getCheckedNodes()
      this.arr.forEach(item=>{
        this.router.push(item.value)  
      })
    },
    // 查询菜单方法
    querymenu(){
      querymenu({
        pid : this.pid
      }).then((response)=>{
        this.datatree = response.data.children
      })
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
    // 查询用户表格数据方法
    querylist() { 
      this.loading = true;
      queryuser({
        page: this.page,
        intPageSize: this.size,
        Comid:localStorage.getItem('comid'),
        username:this.form.name,
        deptid:this.department
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
    // 删除用户
    deletes(row) {
      // debugger;
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteuser({
            id: row.UserID,
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
    adddialog(){
      this.title = "添加用户"
      this.button = '立即创建'
      this.adduserdialog = true
    },
    dialog(){
      // 添加用户
      if(this.title==='添加用户'){
        let perIdList = this.router
      if(this.addform.name==""){
        this.$message('请输入用户名');
        this.adduserdialog = true
      }else{
          if(this.addform.pass===''){
               this.$message('请输入密码');
               this.adduserdialog = true
          }else{
            if(this.region===''){
                this.$message('请选择部门');
                this.adduserdialog = true
            }else{
              var routes = this.router
              if(routes.length===0){
                   this.$message('请分配菜单，至少大于1个');
                   this.adduserdialog = true
              }else{
                adduser({
                  perIdList,
                  companyID: localStorage.getItem('comid'),
                  departmentID: this.region,
                  userID: this.addform.name,
                  userName: this.addform.name,
                  userPwd: this.addform.pass, 
                  remark: this.addform.remark
                }).then(response=>{
                  this.querylist()
                  this.$message({
                    type:'success',
                    message: '添加成功，登录即可使用'
                  })
                }).catch((error)=>{
                  this.$message({
                    type:'success',
                    message: '添加失败'
                  })
                })
              }
            }
          }
      }
      }else if(this.title==='修改用户'){
      let perIdList = this.router
        modifyuser({
        perIdList,
        companyID: localStorage.getItem('comid'),
        departmentID: this.region,
        userID: this.addform.name,
        userName: this.addform.name,
        userPwd: this.addform.pass, 
        remark: this.addform.remark
      }).then(response=>{
        this.querylist()
        this.$message({
          type:'success',
          message: '修改成功，登录即可使用'
        })
      }).catch((error)=>{
        this.$message({
          type:'success',
          message: '修改失败'
        })
      })    
    }
  },
    editorClick(row){
      this.title = "修改用户"
      this.button = '提交修改'
      this.adduserdialog = true
      this.region = row.DepartmentID
      this.addform.name = row.UserID
      this.addform.name = row.UserName
      this.addform.pass = row.UserPwd
      this.addform.remark = row.Remark
      this.datatree = row.children
    }
  },
  mounted(){
    this.querylist()
  }
};
</script>
<style>
.body {
  padding: 25px;
  width: 100%;
}
.body-1 {
  margin-top: 1%;
}
.body-2 {
    display: flex;
  margin-top: 1%;
  width: 15%;
}
.body-3 {
  margin-top: -3%;
  margin-left: 3%;
}
/* .body-2-tree{
    height: 30px;
} */
.body-2-tree{
    margin-left: 10%;
}
.body-button2{
    margin-top: -3.5%;
    margin-left: 10%;
}
.table{
  cursor: pointer;
}
.el-table .warning-row {
  background: rgb(243, 241, 231);
}

.el-table .success-row {
  background: #ece9db;
}

.el-table__body tr:hover>td{
  background-color: #eee4aacb!important;
}
</style>