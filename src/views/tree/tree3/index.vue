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
              :data="datatree"
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
             <el-form :model="ruleForm">
               <el-form-item label="" prop="equipment">
              <el-checkbox-group  v-model="checklist">
            <el-checkbox
              v-for="item in hardwareListData"
              :key="item.StoreID"
              :label="item.StoreCaption"
            @change=" handleChange($event,item.StoreID,item.StoreCaption)">{{item.StoreCaption}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        </el-form>
            <!-- <div
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
            </div> -->
           </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { querylisttree , querylistpzxx , querylistmes , addmes} from "@/api/tree.js";
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
          IsCheck : "",
        },
      ],
      ID:'',
      value: "",
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
        label: "title",
      },
      arr: [],
      checkbox: false,
      radio: false,
      // checkedEquipments: [], //随意修改后的checked项（即要传到后台的变更数据）
      // equipments: [
      //       {
      //       StoreID:'',
      //       StoreIndex:"",
      //       StoreCaption:"",
      //       }
      //   ],
      // checkEquip: [
      //   //模拟后台获取的数据（各el-checkbox-group默认checked项）
      //   {
      //     id: "1",
      //     menu: "设备1",
      //     childMenu: [],
      //   },
      // ],
      level:'',
      hardwareListData:[],//后台返回的多选项
      checkedData: [],//选择多选框时的选中值
      ruleForm:{
        IsCheck:"",
      },
      // IsCheck:[1],//v_model取此值，没有默认0值使回显报错
      check : [],
      checklist : [],
    };
  },
  methods: {
    shuxingjiego() {
      querylistpzxx({
        comid : localStorage.getItem('comid'),
        productlineid : this.value
      })
        .then((response) => {
          this.datatree = response.data;
        })
        .catch((error) => {
          alert("获取失败");
        });
    },
    handleCheckChange() {
      // 获取树形结构父节点id
      this.arr = this.$refs.tree.getCurrentNode();
      if (this.arr.label === "一级节点") {
        this.title = "MES料仓名";
        this.radio = false;
        this.checkbox = true;
        //  this.arr.value 这个是他的id
           this.level = '0'
        querylistmes({
          level : this.level,
          productlineid : this.value,
          comid : localStorage.getItem('comid'),
          typematerialid : this.arr.value
        }).then((response)=>{
          this.checklist=[]
          this.hardwareListData = response.data.value
          this.check = response.data.value
          this.check.forEach(item=>{
            if(item.IsCheck==true){
              this.checklist.push(item.StoreCaption)
            }
          })
        })
      } else {
        this.title = "PCS仓名";
        this.checkbox = false;
        this.radio = true;
      }
    },
    // handleChange() {
    //   this.checkEquipArr = [];
    //   let arr = this.checkedEquipments;
    //   console.log(this.checkedEquipments[0]);
    // },
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
         this.datatree = response.data;
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
    },
    handleChange:function(e,StoreID,StoreCaption) {
      // 父节点id
      // alert(this.arr.value)
      console.log(e,StoreID,StoreCaption)
      if(e){
        this.checkedData.push(StoreID);
        this.level = '0'
        var productLineID = this.value
        let storeIDs = this.checkedData
        addmes(JSON.stringify({
            storeIDs,
            level : this.level,
            typeMaterialID : this.arr.value,
            companyID : localStorage.getItem('comid'),
            productLineID : this.value
        })).then((responss)=>{
          alert('成功')
        }).catch((error)=>{
          alert('失败')
        })
      }else{
        this.delete(id);
      }
      console.log(this.checkedData);
    },
  },
    created() {
        getHardwareListData();
    },
  mounted() {
    // this.shuxingjiego();
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
