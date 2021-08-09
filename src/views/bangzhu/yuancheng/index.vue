<template>
  <div class="app-container">
    <div class="filter-container">
      <el-checkbox-group v-model="checkboxVal">
        <el-checkbox label="apple">
          apple
        </el-checkbox>
        <el-checkbox label="banana">
          banana
        </el-checkbox>
        <el-checkbox label="orange">
          orange
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table :key="key" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="name" label="fruitName" width="180" />
      <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
        <template slot-scope="scope">
          {{ scope.row[fruit] }}
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-tree ref="tree" :indent="7" v-loading="loadingTree" 
    :expand-on-click-node="false"  empty-text="正在加载中" element-loading-text="正在加载中"     
    :data="treeData" :default-expanded-keys="keyIdArray" :props="defaultProps" node-key="id">
       <span slot-scope="{ node, data }">
             <el-radio v-model="radio" 
                            :label="data.id" 
                            @change="change(data)">
                    {{ node.label }}
              </el-radio>
        </span>
</el-tree>
    </div>
  </div>
</template>

<script>
const defaultFormThead = ['apple', 'banana']

export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "lable"
      },
      radio: "",    //  这一行
      keyIdArray: ["1"],
      // treeData: [],
      loadingTree: false,
      checkedList: [] ,  //选中节点的数据
      treeData: [
        {
          id: 1,
          label: '品牌一',
          children: [
            {
              id: 4,
              label: '华东区域',
              children: [
                {
                  id: 9,
                  label: '上海'
                },
                {
                  id: 10,
                  label: '昆山'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '品牌二',
          children: [
            {
              id: 5,
              label: '华东区域'
            },
            {
              id: 6,
              label: '华南区域'
            }
          ]
        },
        {
          id: 3,
          label: '品牌三',
          children: [
            {
              id: 7,
              label: '华北区域'
            },
            {
              id: 8,
              label: '华南区域'
            }
          ]
        }
      ],
      // defaultProps: null,
      // selectOrg: {
      //   orgsid: []
      // },
      tableData: [
        {
          name: 'fruit-1',
          apple: 'apple-10',
          banana: 'banana-10',
          orange: 'orange-10'
        },
        {
          name: 'fruit-2',
          apple: 'apple-20',
          banana: 'banana-20',
          orange: 'orange-20'
        }
      ],
      key: 1, // table key
      formTheadOptions: ['apple', 'banana', 'orange'],
      checkboxVal: defaultFormThead, // checkboxVal
      formThead: defaultFormThead // 默认表头 Default header
    }
  },
  watch: {
    checkboxVal(valArr) {
      this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
      this.key = this.key + 1// 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
    }
  },
  methods:{
    change(data) {
      this.checkedList = [];
      this.checkedList[0] = data;
    },
    // check-change 
// 节点选中状态发生变化时的回调   
// 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
orgCheckChange(data, checked, indeterminate) {
     console.log(data, '数据')
     console.log(checked, '选中状态')
     console.log(indeterminate, '子树中选中状态')
     // 获取当前选择的id在数组中的索引
     const indexs = this.selectOrg.orgsid.indexOf(data.id)
     // 如果不存在数组中，并且数组中已经有一个id并且checked为true的时候，代表不能再次选择。
     if (indexs < 0 && this.selectOrg.orgsid.length === 1 && checked) {
       console.log('only one')
       this.$message({
         message: '只能选择一个区域！',
         type: 'error',
         showClose: true
       })
       // 设置已选择的节点为false 很重要
       this.$refs.tree.setChecked(data, false)
     } else if (this.selectOrg.orgsid.length === 0 && checked) {
       // 发现数组为空 并且是已选择
       // 防止数组有值，首先清空，再push
       this.selectOrg.orgsid = []
       this.selectOrg.orgsid.push(data.id)
     } else if (
       indexs >= 0 &&
       this.selectOrg.orgsid.length === 1 &&
       !checked
     ) {
       // 再次直接进行赋值为空操作
       this.selectOrg.orgsid = []
     }
   }
  }
}
</script>

