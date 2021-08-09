<template>
    <div class="body">
        <div class="body-1">
           <div>
                <span>
                日志：
            </span>
             <el-select v-model="value" filterable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
           </div>
           <div style="margin-left:3%">
                <span class="demonstration">时间：</span>
                    <el-date-picker
                    v-model="value3"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
                </el-date-picker>
           </div>
           <div style="margin-left:3%">
                <el-button type="primary" plain>查询</el-button>
           </div>
        </div>
        <div class="body-2">
            <div>
                <span>
                类型：
            </span>
             <el-select v-model="value" filterable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </div>
            <div style="margin-left:2%">
                <span>
                数值：
            </span>
             <el-select v-model="value" filterable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </div>
            <div style="margin-left:2%" >
                <span>
                类型：
            </span>
             <el-select v-model="value" filterable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </div>
            <div style="margin-left:2%">
                <span>
                数值：
            </span>
             <el-select v-model="value" filterable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </div>
            <div style="margin-left:2%">
                <el-button type="primary" plain>导出</el-button>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
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
        value2: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value3: ''
      }
    }
  }
</script>
<style scoped>
.body{
    padding: 25px;
}
.body-1{
    display: flex;
}
.body-2{
    display: flex;
    margin-top: 2%;
}
</style>