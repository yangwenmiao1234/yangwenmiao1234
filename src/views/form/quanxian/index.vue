<template>
  <div class="body">
    <div>
      <el-header style="">
        <span> 部门： </span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          size=""
          type="primary"
          style="
            margin-left: 5%;
            width: 120px;
            background-color: orange;
            border: 2px solid rgb(0 0 0 / 67%);
          "
          @click="sive"
          >保存权限</el-button
        >

        <el-form
          style="margin-top: -3%; margin-left: 43%"
          :label-position="labelPosition"
          label-width="400px"
          :model="dayfrom"
        >
          <el-form-item
            label=" 对于生产数据、发货数据、地磅数据，只能查看最近天数："
          >
            <el-input style="width: 80px" v-model="dayfrom.number"></el-input>
          </el-form-item>
        </el-form>
      </el-header>
    </div>
    <el-tabs
      style="margin-top: 3%"
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane label="系统设置" name="first">
        <el-tree
          :data="data"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          check-on-click-node="true"
          :default-checked-keys="[0]"
          @node-click="treechange"
          :props="defaultProps"
        >
        </el-tree
      ></el-tab-pane>
      <el-tab-pane label="综合管理" name="second">
        <el-tree
          :data="data2"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          check-on-click-node="true"
          :default-checked-keys="[0]"
          @node-click="treechange"
          :props="defaultProps2"
        >
        </el-tree>
      </el-tab-pane>
      <el-tab-pane label="销售管理" name="third">
        <el-tree
          :data="data3"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          check-on-click-node="true"
          :default-checked-keys="[0]"
          @node-click="treechange"
          :props="defaultProps3"
        >
        </el-tree>
      </el-tab-pane>
      <el-tab-pane label="生产管理" name="four">
        <el-tree
          :data="data4"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          check-on-click-node="true"
          :default-checked-keys="[0]"
          @node-click="treechange"
          :props="defaultProps4"
        >
        </el-tree
      ></el-tab-pane>
      <el-tab-pane label="实验室" name="five">
        <el-tree
          :data="data5"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          check-on-click-node="true"
          :default-checked-keys="[0]"
          @node-click="treechange"
          :props="defaultProps5"
        >
        </el-tree
      ></el-tab-pane>
      <el-tab-pane label="原料管理" name="six">
        <el-tree
          :data="data6"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          check-on-click-node="true"
          :default-checked-keys="[0]"
          @node-click="treechange"
          :props="defaultProps6"
        >
        </el-tree
      ></el-tab-pane>
      <el-tab-pane label="地磅房" name="seven">
        <el-tree
          :data="data7"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          check-on-click-node="true"
          :default-checked-keys="[0]"
          @node-click="treechange"
          :props="defaultProps7"
        >
        </el-tree
      ></el-tab-pane>
      <el-tab-pane label="数据查询" name="eight">
        <el-tree
          :data="data8"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          check-on-click-node="true"
          :default-checked-keys="[0]"
          @node-click="treechange"
          :props="defaultProps8"
        >
        </el-tree
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dayfrom: {
        number: "",
      },
      activeName: "first",
      options: [
        {
          value: "选项1",
          label: "公司领导",
        },
        {
          value: "选项2",
          label: "综合部",
        },
        {
          value: "选项3",
          label: "销售部",
        },
        {
          value: "选项4",
          label: "生产部",
        },
        {
          value: "选项5",
          label: "实验室",
        },
      ],
      value: "",
      data: [
        {
          id: 1,
          label: "全部",
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
              label: "通信设置",
            },
            {
              id: 1.4,
              label: "打印模板",
            },
          ],
        }
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
        data2: [
        {
          id: 1,
          label: "全部",
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
        }
      ],
      defaultProps2: {
        children: "children",
        label: "label",
      },
        data3: [
        {
          id: 1,
          label: "全部",
          children: [
            {
              id: 1.1,
              label: "销售单管理",
            },
            {
              id: 1.2,
              label: "销售单审核",
            },
            {
              id: 1.3,
              label: "销售单删除",
            },
          ],
        }
      ],
      defaultProps3: {
        children: "children",
        label: "label",
      },
        data4: [
        {
          id: 1,
          label: "全部",
          children: [
            {
              id: 1.1,
              label: "搅运车信息",
            },
            {
              id: 1.2,
              label: "车队管理",
            },
            {
              id: 1.3,
              label: "任务单管理",
            },
            {
              id: 1.4,
              label: "任务单审核",
            },
             {
              id: 1.5,
              label: "任务单删除",
            },
             {
              id: 1.6,
              label: "生产单管理",
            },
             {
              id: 1.7,
              label: "生产单车辆调度",
            },
             {
              id: 1.8,
              label: "发货单管理",
            },
             {
              id: 1.9,
              label: "发货单审核",
            },
             {
              id: 1.10,
              label: "发货单删除",
            },
             {
              id: 1.11,
              label: "手工发货单",
            },
             {
              id: 1.12,
              label: "电话录音",
            },
          ],
        }
      ],
      defaultProps4: {
        children: "children",
        label: "label",
      },
         data5: [
        {
          id: 1,
          label: "全部",
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
        }
      ],
      defaultProps5: {
        children: "children",
        label: "label",
      },
                  data6: [
        {
          id: 1,
          label: "全部",
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
            },
            {
              id: 1.4,
              label: "盘库管理",
            },
            {
              id: 1.5,
              label: "原料库存",
            },
          ],
        }
      ],
      defaultProps6: {
        children: "children",
        label: "label",
      },
         data7: [
        {
          id: 1,
          label: "全部",
          children: [
            {
              id: 1.1,
              label: "车辆过磅",
            },
            {
              id: 1.2,
              label: "磅单审核",
            },
            {
              id: 1.3,
              label: "磅单删除",
            },
            {
              id: 1.4,
              label: "重量修改",
            },
             {
              id: 1.5,
              label: "扣秤设置",
            },
          ],
        }
      ],
      defaultProps7: {
        children: "children",
        label: "label",
      },
                  data8: [
        {
          id: 1,
          label: "全部",
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
            },
            {
              id: 1.4,
              label: "票单扫码",
            },
            {
              id: 1.5,
              label: "日志数据",
            },
          ],
        }
      ],
      defaultProps8: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    sive() {
      alert("方法还未实现，敬请期待");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    treechange() {
      //   alert(1);
      this.treeid = this.$refs.tree.getCheckedKeys();
      var id = this.treeid;
      //   alert(id);
      if (
        id == "1,1.1,1.2,1.3,1.4" ||
        id == "2,2.1,2.2,2.3,2.4" ||
        id == "3,3.1,3.2,3.3"
      ) {
        alert("1 2 3");
      } else {
        alert("2");
      }
    },
  },
};
</script>
<style>
.body {
  padding: 20px;
}
.el-header {
  background-color: #fbcb5266;
  color: #606266;
  line-height: 60px;
}
.el-aside {
  text-align: center;
  line-height: 200px;
}
.el-main {
  text-align: center;
  line-height: 160px;
}
/deep/.el-input__inner {
  background-color: #f7f0dcab;
  border-color: rgb(0 0 0 / 67%);
}

.el-tabs__item.is-active {
  color: rgba(245, 181, 8, 0.96);
}
.el-tabs__item:hover {
  color: rgba(245, 181, 8, 0.96);
  cursor: pointer;
}
/* 选择器style设置 */
</style>