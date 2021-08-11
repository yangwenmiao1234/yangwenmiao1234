<template>
  <div class="body">
    <div class="header">
      <el-row :gutter="20">
        <el-col :xl="24">
          <div class="grid-content bg-purple">
            <span>生产线：</span>
            <el-select @change="selectline()" v-model="value" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.Caption"
                :value="item.ID"
              >
              </el-option>
            </el-select>
            <el-button style="margin-left:2%" type="primary" @click="queryselect()" plain
              >查询生产线</el-button>
            <el-button type="primary" plain
              >获取PCS仓名</el-button
            >
            <el-button type="primary" plain
              >保存</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="main">
      <el-row :gutter="20">
        <el-col :xl="24" style="display: flex">
          <div class="grid_content">
            <el-divider content-position="left">生产线配置</el-divider>
            <el-tree
              style="margin-top: 3%"
              :check-strictly="true"
              :data="data"
              default-expand-all
              node-key="id"
              ref="tree"
              highlight-current
              check-on-click-node="true"
              :default-checked-keys="[1]"
              :props="defaultProps"
              @check-change="handleCheckChange"
            >
            </el-tree>
          </div>
          <div class="grid_content2">
            <el-divider content-position="left">{{ title }}</el-divider>
           <div style="width:50px">
              <div
              class="check-group"
              v-for="(item, index) in equipments"
              :key="index"
            >
              <el-checkbox-group
                v-if="checkbox"
                v-model="checkedEquipments[index]"
                @change="handleChange(item.storeID)"
              >
                {{ checkedEquipments[index] }}
                <el-checkbox
                 style="margin-top:20%;"
                  v-for="data in item.equipments"
                  :label="data.storeID"
                  :key="data.storeCaption"
                  >{{ data.menu }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div
              class="check-group"
              v-for="(item, index) in equipments"
              :key="index"
            >
              <el-radio-group
                v-if="radio"
                v-model="checkedEquipments[index]"
                @change="handleChange(item.id)"
              >
                {{ checkedEquipments[index] }}
                <el-radio
                  v-for="data in item.childMenu"
                  :label="data.id"
                  :key="data.menu"
                  >{{ data.menu }}
                </el-radio>
              </el-radio-group>
            </div>
           </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { querylisttree , querylistpzxx , querylistmes} from "@/api/tree.js";
import { queryshenchanxianxinxi} from "@/api/user.js";
export default {
  data() {
    return {
      title: "MES料仓名",
      options: [
        {
          value: '',
          label: "",
          ID : '',
          Caption : "",
        },
      ],
      ID:'',
      value: "",
      data: [
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
        label: "title",
      },
      arr: [],
      checkbox: false,
      radio: false,
      checkedEquipments: [], //随意修改后的checked项（即要传到后台的变更数据）
      equipments: [
        // 所有数据
        {
          storeID:'',
          storeIndex:"",
          storeCaption:"",
        },
      ],
      checkEquip: [
        //模拟后台获取的数据（各el-checkbox-group默认checked项）
        {
          id: "1",
          menu: "设备1",
          childMenu: [],
        },
      ],
      level:'',
    };
  },
  methods: {
    shuxingjiego() {
      querylistpzxx({
        comid : localStorage.getItem('comid'),
        productlineid : this.value
      })
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          alert("获取失败");
        });
    },
    handleCheckChange() {
      this.arr = this.$refs.tree.getCurrentNode();
      if (this.arr.label === "一级节点") {
        this.title = "MES料仓名";
        this.radio = false;
        this.checkbox = true;
        //  this.arr.value 这个是他的id
        if(this.data.label==='一级节点'){
           this.level = '0'
        }else{
           this.level = '1'
        }
        querylistmes({
          level : this.level,
          productlineid : this.value,
          comid : localStorage.getItem('comid'),
          typematerialid : this.arr.value
        }).then((response)=>{
          this.equipments = response.data.value
        })
      } else {
        this.title = "PCS仓名";
        this.checkbox = false;
        this.radio = true;
      }
    },
    handleChange() {
      this.checkEquipArr = [];
      let arr = this.checkedEquipments;
      console.log(this.checkedEquipments[0]);
    },
    queryselect(){
      var page = '1'
      var size = '10'
        queryshenchanxianxinxi({
          page: page,
        intPageSize: size,
        Comid:localStorage.getItem('comid')
        }).then(response=>{
          this.options = response.data.data
        })
    },
    selectline(){
      querylistpzxx({
        comid : localStorage.getItem('comid'),
        productlineid : this.value
      }).then((response)=>{
         this.data = response.data;
         this.$message({
          type:'success',
          message:'查询成功'
        })
      }).catch(error=>{
        console.log(error)
        this.$message({
          type:'error',
          message:'查询失败'
        })
      })
    }
  },
  created() {
    //此处一定要注意，需要将接收多选的集合初始化，要不会报错
    // 初始化默认选中状态
    for (let i = 0; i < this.checkEquip.length; i++) {
      let checkArr = [];
      let item = this.checkEquip[i].childMenu;
      if (item.length === 0) {
        this.checkedEquipments.push([]);
      } else {
        for (let j = 0; j < item.length; j++) {
          checkArr.push(item[j].id);
        }
        this.checkedEquipments.push(checkArr);
      }
    }
  },
  mounted() {
    this.shuxingjiego();
    this.queryselect()
  },
};
</script>
<style scoped>
.body {
  padding: 25px;
}
.grid_content {
  width: 30%;
  /* height: 700px; */
  /* 添加边框 */
  /* border:3px solid rgb(221, 215, 215) */
  /* 添加阴影面 */
  /* box-shadow : 2px 2px 10px rgb(212, 205, 205) */
}
.grid_content2 {
  width: 40%;
}
</style>
