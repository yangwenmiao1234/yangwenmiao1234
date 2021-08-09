<template>
    <div class="body">
        <div class="header">
            <el-row :gutter="20">
              <el-col :xl="24">
                <div class="grid-content bg-purple">
                  <span>生产线：</span>
                    <el-select v-model="value" filterable placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                     <el-button type="primary" plain>获取PCS仓名</el-button>
                 </div>
                </el-col>
            </el-row>
        </div>
        <div class="main">
            <el-row :gutter="20">
              <el-col :xl="24" style="display:flex">
                <div class="grid_content">
                  <el-divider content-position="left">生产线配置</el-divider>
                  <el-button type="primary" @click="ceshi()" plain>变字</el-button>
                </div>
                <div class="grid_content2">
                  <el-divider content-position="left">{{title}}</el-divider>
                </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      title:'MES料仓名',
      options: [{
          value: '一号线',
          label: '一号线'
        }, {
          value: '二号线',
          label: '二号线'
        }, {
          value: '三号线',
          label: '三号线'
        },],
        value: ''
    }
  },
  methods:{
   ceshi(){
     this.title = 'PCS仓名'
   }
  }
}
</script>
<style scoped>
.body{
  padding: 25px;
}
.grid_content{
width: 30%;
/* height: 700px; */
/* 添加边框 */
/* border:3px solid rgb(221, 215, 215) */
/* 添加阴影面 */
/* box-shadow : 2px 2px 10px rgb(212, 205, 205) */
}
.grid_content2{
  width: 40%;
}
</style>
