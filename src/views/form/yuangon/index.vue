<template>
  <div class="body">
    <el-form ref="form" :model="form" label-width="100px">
      <el-row>
        <el-col style="display: flex" :span="24">
          <el-form-item label="菜单名称" prop="menuName">
            <el-input
              v-model="form.menuName"
              placeholder="请输入菜单名称"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="form.status"
              placeholder="菜单状态"
              clearable
              size="small"
            >
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click=" query_1()"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" size="mini"
              >重置</el-button
            >
             <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增菜单</el-button
        >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <el-table
        :data="tableData1"
        style="width: 100%"
        row-key="value"
        :cell-style="rowClass"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column label="菜单序号" prop="order"> </el-table-column>
        <el-table-column label="ID" prop="value"> </el-table-column>
        <el-table-column label="菜单名称" prop="label"> </el-table-column>
        <el-table-column label="父节点ID" prop="Pid"> </el-table-column>
        <el-table-column label="菜单图标" align="center" prop="icon"> 
          <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon" />
        </template>
        </el-table-column>
        <el-table-column label="菜单路径" prop="path"> </el-table-column>
        <el-table-column label="组件路径" prop="component"> </el-table-column>
        <el-table-column label="菜单信息" prop="description"> </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <el-dialog
        :title="title"
        :visible.sync="open"
        v-dialogDrag
        width="40%"
      >
        <el-form ref="form" :model="addform" label-width="100px">
          <el-row style="display:flex">
            <div>
              <el-form-item label="父级菜单名称">
                <el-input class="body_input" v-model="addform.pid"></el-input>
              </el-form-item>
              <el-form-item label="菜单名称">
                <el-input class="body_input" v-model="addform.name"></el-input>
              </el-form-item>
              <el-form-item label="菜单别名">
                <el-input class="body_input" v-model="addform.vueKey"></el-input>
              </el-form-item>
              <el-form-item label="菜单序号">
                <el-input class="body_input" v-model="addform.orderSort"></el-input>
              </el-form-item>
              <el-form-item label="菜单指向">
                <el-input
                  class="body_input"
                  v-model="addform.linkUrl"
                ></el-input>
              </el-form-item>
              <el-form-item label="菜单组件">
                <el-input class="body_input" v-model="addform.component"></el-input>
              </el-form-item>
              <el-form-item label="菜单ID">
                <el-input
                  class="body_input"
                  v-model="addform.id"
                ></el-input>
              </el-form-item>
            </div>
             <div>
               <el-form-item label="菜单path">
                <el-input class="body_input" v-model="addform.path"></el-input>
              </el-form-item>
              <el-form-item label="菜单编码">
                <el-input class="body_input" v-model="addform.code"></el-input>
              </el-form-item>
              <el-form-item label="菜单描述">
                <el-input class="body_input" v-model="addform.description"></el-input>
              </el-form-item>
            <el-form-item label="是否还有子菜单">
                <el-input class="body_input" v-model="addform.hasChildren"></el-input>
              </el-form-item>
              <el-form-item label="菜单图标">
                <el-input class="body_input" v-model="addform.icon"></el-input>
              </el-form-item>
             </div>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="open = false ,  cancel()">取 消</el-button>
            <el-button type="primary" @click="open = false , add()">确 定</el-button>
          </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Ygxx from "@/components/table/yuangonxinxi.vue";
import { querymenu , addmenu , modifymenu , deletemenu } from '@/api/menu.js'
export default {
  data() {
    return {
      bianliang:'',
      title:'',
      pid:'0',
      tableData1: [
        
      ],
      form: {
        name: "",
        stag: "",
      },
      cities: [
        {
          value: "Beijing",
          label: "正常",
        },
        {
          value: "Shanghai",
          label: "停用",
        },
      ],
      value6: "",
      open: false,
      addform: {
        path:'',
        orderSort:'',
        pid:'',
        name:'',
        vueKey:'',
        linkUrl:"",
        component:'',
        id:'',
        code:'',
        description:'',
        hasChildren:'',
        icon:'',
        isDeleted:''
      },
      rules: {
        menuName: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" },
        ],
        orderNum: [
          { required: true, message: "菜单顺序不能为空", trigger: "blur" },
        ],
        path: [
          { required: true, message: "路由地址不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleDelete(row){
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletemenu({
            id: row.value,
          })
            .then((response) => {
              // alert("1  ")
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.query_1();
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
     query_1(){
      this.loading=true
        querymenu({
        pid:this.pid
      })
        .then((response) => {
          this.tableData1 = response.data.children, "value";
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
      add() {
     if (this.bianliang==='新增') {
        addmenu(
        JSON.stringify({
          pid:this.addform.pid,
          name:this.addform.name,
          vueKey:this.addform.vueKey,
          linkUrl:this.addform.linkUrl,
          component:this.addform.component,
          id:this.addform.id,
          Code:this.addform.code,
          description:this.addform.description,
          hasChildren:this.addform.hasChildren,
          icon:this.addform.icon,
          path:this.addform.path,
          IsDeleted:this.addform.isDeleted,
          orderSort:this.addform.orderSort
        })
      )
        .then((response) => {
          this.$message({
            message: "添加成功！",
            type: "success",
          });
          this.query_1();
        })
        .catch((error) => {
          this.$message({
            message: "添加未成功，请联系管理员",
            type: "error",
          });
        });
     }else if(this.bianliang==='修改'){
       modifymenu(
        JSON.stringify({
          pid:this.addform.pid,
          name:this.addform.name,
          vueKey:this.addform.vueKey,
          linkUrl:this.addform.linkUrl,
          component:this.addform.component,
          id:this.addform.id,
          Code:this.addform.code,
          description:this.addform.description,
          hasChildren:this.addform.hasChildren,
          icon:this.addform.icon,
          path:this.addform.path,
          IsDeleted:this.addform.isDeleted,
          orderSort:this.addform.orderSort
        })
      ).then((response) => {
          this.$message({
            message: "修改成功！",
            type: "success",
          });
          this.query_1();
        })
        .catch((error) => {
          this.$message({
            message: "修改未成功，请联系管理员",
            type: "error",
          });
        });
     }
    },
    rowClass() {
      return "text-align:center";
    },
    handleAdd(row) {
      this.title= "添加菜单"
      this.open = true;
      this.bianliang = "新增"
    },
    handleUpdate(row) {
      this.title= "修改菜单"
      this.open = true;
      this.addform.orderSort=row.order
      this.addform.pid=row.Pid
      this.addform.name=row.label
      this.addform.vueKey=row.vuekey
      this.addform.linkUrl=row.redirect
      this.addform.component=row.component
      this.addform.id=row.value
      this.addform.code=row.code
      this.addform.description=row.description
      this.addform.hasChildren=row.hasChildren
      this.addform.icon=row.icon
      this.addform.path=row.path
      this.addform.isDeleted=row.isDeleted
      this.bianliang = "修改"
    },
    cancel(){
      this.title= ""
      this.open = false;
      this.addform.orderSort=""
      this.addform.pid=""
      this.addform.name=""
      this.addform.vueKey=""
      this.addform.linkUrl=""
      this.addform.component=""
      this.addform.id=""
      this.addform.code=""
      this.addform.description=""
      this.addform.hasChildren=""
      this.addform.icon=""
      this.addform.path=""
      this.addform.isDeleted=""
      this.bianliang = ""
    }
  },
  mounted(){
    this.query_1()
  }
};
</script>
<style  scoped>
.body {
  padding: 20px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>