<template>
  <div class="body">
    <el-button @click="querymenu()">
    </el-button>
    <el-steps direction="vertical" :active="active" finish-status="success">
      <el-step
        title="新建用户"
        description="新建用户，添加用户基本信息。"
      ></el-step>
      <div class="body-1">
        <el-form :inline="true" :rules="formRules" :model="addform" class="demo-form-inline">
          <el-form-item prop="name" label="用户名:" :rules="[{required: true, trigger: 'blur', message: '用户名不能为空'}]" >
            <el-input
              v-model="addform.name"
              placeholder="请输入用户名"
              v-on:input="input"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pass" label="密码:" :rules="[{required: true, trigger: 'blur', message: '密码不能为空'},{ min: 6, message: '长度不得小于六位', trigger: 'blur' }]">
            <el-input v-on:input="input" v-model="addform.pass" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="region" label="部门:" :rules="[{required: true, trigger: 'blur', message: '请选择部门'}]">
            <el-select @change="input" v-model="addform.region" placeholder="请选择部门">
              <el-option label="财务部" value="caiwu"></el-option>
              <el-option label="技术部" value="jishu"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input
              v-model="addform.note"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-step
        title="分配菜单"
        description="给新建用户分配菜单，比如某某菜单。"
      >
      </el-step>
      <div class="body-2">
        <div class="body-2-tree">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[0]"
            :default-checked-keys="[0]"
            :props="defaultProps"
          >
          </el-tree>
        </div>
        <div class="body-2-tree">
          <el-tree
            :data="data2"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[0]"
            :default-checked-keys="[0]"
            :props="defaultProps2"
          >
          </el-tree>
        </div>
        <div class="body-2-tree">
          <el-tree
            :data="data3"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[0]"
            :default-checked-keys="[0]"
            :props="defaultProps3"
          >
          </el-tree>
        </div>
        <div class="body-2-tree">
          <el-tree
            :data="data4"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[0]"
            :default-checked-keys="[0]"
            :props="defaultProps4"
          >
          </el-tree>
        </div>
        <div class="body-2-tree">
          <el-tree
            :data="data5"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[0]"
            :default-checked-keys="[0]"
            :props="defaultProps5"
          >
          </el-tree>
        </div>
        <div class="body-2-tree">
          <el-tree
            :data="data6"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[0]"
            :default-checked-keys="[0]"
            :props="defaultProps6"
          >
          </el-tree>
        </div>
        <div class="body-2-tree">
          <el-tree
            :data="data7"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[0]"
            :default-checked-keys="[0]"
            :props="defaultProps7"
          >
          </el-tree>
        </div>
        <div class="body-2-tree">
          <el-tree
            :data="data8"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[0]"
            :default-checked-keys="[0]"
            :props="defaultProps8"
          >
          </el-tree>
        </div>
        <div class="body-2-tree">
          <el-tree
            :data="data9"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[0]"
            :default-checked-keys="[0]"
            :props="defaultProps9"
          >
          </el-tree>
        </div>
        <div class="body-3">
        <el-button
            size="small"
            type="primary"
            @click="ok3"
            plain
            >确定</el-button
          >
        </div>
      </div>
      <el-step title="完成" description="创建用户成功，登录即可使用。">
      </el-step>  
    </el-steps>
    <div style="margin-top:3%">
      <el-table
      :cell-style="rowClass"
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="创建日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="部门"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="拥有菜单"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="备注">
    </el-table-column>
  </el-table>
    </div>
  </div>
</template>
<script>
import { querymenu } from '@/api/menu.js'
export default {
  data() {
    return {
      formRules:{
        // name:[{required: true, trigger: 'blur', message: '用户名不能为空'}]
      },
      router:[],
      name:'example',
      active: 0,
      addform: {
        name: "",
        pass: "",
        com: "",
        region: "",
        note: "",
      },
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      data: [
        {
          id: 1,
          label: "系统设置",
          children: [
            {
              id: 1.1,
              label: "公司信息",
            },
            {
              id: 1.2,
              label: "砼生产线",
            },
            {
              id: 1.3,
              label: "配置信息",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      data2: [
        {
          id: 1,
          label: "综合管理",
          children: [
            {
              id: 1.1,
              label: "员工信息",
            },
            {
              id: 1.2,
              label: "权限管理",
            }
          ],
        },
      ],
      defaultProps2: {
        children: "children",
        label: "label",
      },
      data3: [
        {
          id: 1,
          label: "销售单管理",
        //   children: [
        //     {
        //       id: 1.1,
        //       label: "公司信息",
        //     },
        //     {
        //       id: 1.2,
        //       label: "砼生产线",
        //     },
        //     {
        //       id: 1.3,
        //       label: "配置信息",
        //     },
        //   ],
        },
      ],
      defaultProps3: {
        children: "children",
        label: "label",
      },
      data4: [
        {
          id: 1,
          label: "生产管理",
          children: [
            {
              id: 1.1,
              label: "搅运车信息",
            },
            {
              id: 1.2,
              label: "任务单管理",
            },
            {
              id: 1.3,
              label: "生产单管理",
            },
            {
              id: 1.3,
              label: "发货单管理",
            },
            {
              id: 1.3,
              label: "电话录音",
            },
          ],
        },
      ],
      defaultProps4: {
        children: "children",
        label: "label",
      },
      data5: [
        {
          id: 1,
          label: "实验室",
          children: [
            {
              id: 1.1,
              label: "标准配方库",
            },
            {
              id: 1.2,
              label: "绑定配方",
            },
            {
              id: 1.3,
              label: "历史配方",
            },
          ],
        },
      ],
      defaultProps5: {
        children: "children",
        label: "label",
      },
      data6: [
        {
          id: 1,
          label: "原料管理",
          children: [
            {
              id: 1.1,
              label: "原料信息",
            },
            {
              id: 1.2,
              label: "供应商信息",
            },
            {
              id: 1.3,
              label: "料仓原料",
            },{
              id: 1.3,
              label: "盘库管理",
            },{
              id: 1.3,
              label: "原料库存",
            },
          ],
        },
      ],
      defaultProps6: {
        children: "children",
        label: "label",
      },
      data7: [
        {
          id: 1,
          label: "车辆过磅",
        //   children: [
        //     {
        //       id: 1.1,
        //       label: "公司信息",
        //     },
        //     {
        //       id: 1.2,
        //       label: "砼生产线",
        //     },
        //     {
        //       id: 1.3,
        //       label: "配置信息",
        //     },
        //   ],
        },
      ],
      defaultProps7: {
        children: "children",
        label: "label",
      },
      data8: [
        {
          id: 1,
          label: "数据查询",
          children: [
            {
              id: 1.1,
              label: "生产数据",
            },
            {
              id: 1.2,
              label: "发货数据",
            },
            {
              id: 1.3,
              label: "地磅数据",
            },{
              id: 1.3,
              label: "票单扫码",
            },{
              id: 1.3,
              label: "日志数据",
            },
          ],
        },
      ],
      defaultProps8: {
        children: "children",
        label: "label",
      },
      data9: [
        {
          id: 1,
          label: "帮助",
          children: [
            {
              id: 1.1,
              label: "使用说明",
            },
            {
              id: 1.2,
              label: "远程协助",
            },
            {
              id: 1.3,
              label: "关于",
            },
          ],
        },
      ],
      defaultProps9: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    input(){
      if(this.addform.pass.length>=6){
        if (this.addform.name!='' && this.addform.pass!='' && this.addform.region!='') {
                this.active = 1;
              }else{
                this.active = 0;
              }
       }else{
         this.active = 0;
      }
    },
    ok3() {
      if (this.addform.name!='' && this.addform.pass!='' && this.addform.region!='') {
          this.$confirm('将成功创建用，确定吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '创建成功!'
          });
          this.active = 3;
        }).catch(() => {
          this.active = 1;
          this.$message({
            type: 'info',
            message: '已取消创建'
          });          
        });
      }else{
        this.$message({
            type: 'info',
            message: '请先填写用户基本信息'
          });   
      }
    },
      headClass() {
      return "text-align:center";
    },
    rowClass() {
      return "text-align:center";
    },
    querymenu(){
      querymenu({
        
      })
    }
  },
  mounted(){
  }
};
</script>
<style scoped>
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
</style>