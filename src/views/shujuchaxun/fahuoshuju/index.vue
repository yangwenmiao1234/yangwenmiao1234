<template>
  <div class="body">
    <div class="body-1">
      <div class="body-1-1">
        <div class="block" style="width:100%">
          <span class="demonstration">打票时间：</span>
          <el-date-picker
          style="width:80%"
            v-model="value2"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </div>
        <div class="select" style="display:flex;margin-top:3%">
          <span style="margin-top:1.8%">浇筑部位：</span>
            <el-select style="width:140px" v-model="value" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span style="margin-top:1.8%;margin-left:6%">坍落度：</span>
            <el-select style="width:140px" v-model="value" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </div>
        <div class="select" style="display:flex;margin-top:3%">
          <span style="margin-top:1.8%">浇筑方式：</span>
            <el-select style="width:140px" v-model="value" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-form :label-position="labelPosition" label-width="80px" :model="form">
              <el-form-item style="margin-left:1.5%" label="打票配方：">
                <el-input style="width:120px;margin-left:-5.3%"  v-model="form.peifangname"></el-input>
              </el-form-item>
            </el-form>
        </div>
        <div class="select" style="margin-top:%;display:flex">
          <span style="margin-top:1.8%">抗渗等级：</span>
            <el-select style="width:140px" v-model="value" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div>
                <el-form :label-position="labelPosition" label-width="80px" :model="form">
              <el-form-item style="margin-left:1.5%" label="打票强度：">
                <el-input style="width:120px;margin-left:-5.3%"  v-model="form.peifangname"></el-input>
              </el-form-item>
            </el-form>
            </div>
        </div>
      </div>
      <div class="body-1-2">
         <div style="margin-left:5%">
           <span style="margin-top:1.8%;">生产线：</span>
            <el-select style="width:120px;" v-model="value" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
         </div>
         <div style="margin-top:7%;margin-left:7%">
           <span style="margin-left:4.4%">车号：</span>
            <el-select style="width:120px;" v-model="value" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
         </div>
         <div style="margin-top:6%;margin-left:-6.5%">
           <el-form :label-position="labelPosition" label-width="80px" :model="form">
              <el-form-item label="打料人员：">
                <el-input style="width:120px;margin-left:-5.3%"  v-model="form.peifangname"></el-input>
              </el-form-item>
            </el-form>
         </div>
         <div style="margin-top:6%;margin-left:-6.5%">
           <el-form :label-position="labelPosition" label-width="80px" :model="form">
              <el-form-item label="签收人员：">
                <el-input style="width:120px;margin-left:-5.3%"  v-model="form.peifangname"></el-input>
              </el-form-item>
            </el-form>
         </div>
      </div>
      <div class="body-1-3">
        <div style="display:flex;margin-top:2.5%" >
            <div>
              <el-radio v-model="radio" label="1">自动单</el-radio>
            <el-radio v-model="radio" label="2">手动单</el-radio>
            <el-radio v-model="radio" label="3">全部</el-radio>
            </div>
        </div>
         <div style="margin-top:5%">
              <el-radio v-model="radio" label="1">正常单</el-radio>
            <el-radio v-model="radio" label="2">作废单</el-radio>
            <el-radio v-model="radio" label="3">全部</el-radio>
            </div>
            <div style="margin-top:5%">
               <el-radio v-model="radio" label="1">未对账</el-radio>
            <el-radio v-model="radio" label="2">已对账</el-radio>
            <el-radio v-model="radio" label="3">全部</el-radio>
            </div>
            <div style="margin-top:5%">
               <el-radio v-model="radio" label="1">已签收</el-radio>
            <el-radio v-model="radio" label="2">未签收</el-radio>
            <el-radio v-model="radio" label="3">全部</el-radio>
            </div>
            <div style="margin-top:2%;margin-left:-2%">
                <el-form :label-position="labelPosition" label-width="80px" :model="form">
              <el-form-item label="工程名称：">
                <el-input style="width:120px;margin-left:-5.3%"  v-model="form.peifangname"></el-input>
              </el-form-item>
            </el-form>
            </div>
      </div>
    </div>
    <div class="body-2">
          <div class="body-2-1">
              <el-tabs type="border-card">
                <el-tab-pane label="明细查询">
                    <div style="display:flex">
                        <span style="margin-top:0.7%">排序：</span>
                          <el-select style="width:140px" v-model="value" filterable placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                          <span style="margin-top:0.7%;margin-left:1%">排序：</span>
                          <el-select style="width:140px" v-model="value" filterable placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                           <span style="margin-top:0.7%;margin-left:1%">排序：</span>
                          <el-select style="width:140px" v-model="value" filterable placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                           <span style="margin-top:0.7%;margin-left:1%">排序：</span>
                          <el-select style="width:140px" v-model="value" filterable placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                           <span style="margin-top:0.7%;margin-left:1%">排序：</span>
                          <el-select style="width:140px" v-model="value" filterable placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                          <el-button style="margin-left:1%" type="primary" plain>查询</el-button>
                          <el-button type="primary" plain>导出</el-button>
                    </div>
                    <div>
                        <div class="body-2-1-1">

                        </div>
                        <div class="body-2-1-2">

                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="统计查询">
                    <div style="display:flex">
                        <span style="margin-top:0.7%">分类：</span>
                          <el-select style="width:140px" v-model="value" filterable placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                          <span style="margin-top:0.7%;margin-left:1%">分类：</span>
                          <el-select style="width:140px" v-model="value" filterable placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                           <span style="margin-top:0.7%;margin-left:1%">分类：</span>
                          <el-select style="width:140px" v-model="value" filterable placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                           <span style="margin-top:0.7%;margin-left:1%">分类：</span>
                          <el-select style="width:140px" v-model="value" filterable placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                           <span style="margin-top:0.7%;margin-left:1%">分类：</span>
                          <el-select style="width:140px" v-model="value" filterable placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                          <el-button style="margin-left:1%" type="primary" plain>查询</el-button>
                          <el-button type="primary" plain>导出</el-button>
                    </div>
                </el-tab-pane>
              </el-tabs>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked:true,
      radio:'1',
      radio2:'1',
       options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      form:{
        name:'',
        peifangname:'',
      },
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: '',
    };
  },
  methods: {},
};
</script> 
<style scoped>
.body {
  padding: 25px;
  width: 100%;
  /* position:absolute; */
  min-height: 100%;
}
/* @media screen and ( min-device-width: 1680px) and (max-device-width:1920px){
        .body{
          /* overflow-x:scroll; */
          /* background-color: oldlace; */
        /* } 
} */ 
.body-1 {
  display: flex;
  flex:1;
}
.body-1-1 {
  /* position: absolute; */
  width: 40%;
  height: 280px;
  border: oldlace;
  /* background-color: aqua; */
}
.body-1-2 {
  margin-left:0.5%;
  width: 18%;
  height: 280px;
  border: oldlace;
  /* background-color: aqua; */
}
.body-1-3 {
   margin-left:0.5%;
  width: 33%;
  height: 280px;
  border: oldlace;
  /* background-color: aqua; */
}
.body-2{
  margin-top: 0%;                  
}
/* .body-2-1-1{
  height: 400px;
}
.body-2-1-2{
  height: 400px;
} */
</style>