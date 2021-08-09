<template>
    <div class="body">
        <div class="header">
            <span>料仓类型：</span>
            <el-checkbox v-model="checkbox" label="粉料仓"></el-checkbox>
            <el-checkbox label="骨料仓"></el-checkbox>
            <el-checkbox label="水料仓"></el-checkbox>
            <span style="margin-left:2%">
              生产线:
            </span>
            <el-select style="margin-left:0.5%;margin-top:-0.6%" v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <span style="margin-left:2%" class="demonstration">截止时间：</span>
    <el-date-picker
    style="margin-left:0.5%;margin-top:-0.6%"
      v-model="value2"
      align="right"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions">
    </el-date-picker>
    <el-button size="small" style="width:80px;margin-left:2%;margin-top:-0.6%" type="primary" plain>刷新</el-button>
        </div>
        <div style="margin-top:2%">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="图形模式" name="first">图形模式</el-tab-pane>
    <el-tab-pane label="表格模式" name="second">
        <el-table
        :header-cell-style="{  background: 'rgba(249, 182, 3, 0.67)', color: '#606266' }"
        :data="tableData"
        border
        :cell-style="rowClass"
        style="width: 100%"
      >
        <el-table-column fixed="left" label="序号" width="70px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="idname" label="料仓全称" width="">
        </el-table-column>
        <el-table-column prop="name" label="当前原料" width="">
        </el-table-column>
        <el-table-column prop="profile" label="最大容量" width="">
        </el-table-column>
        <el-table-column prop="legal" label="当前重量" width="">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100px">
          <template slot-scope="scope">
            <el-button style="color: rgb(0 0 0 / 67%)" type="text" size="small"
             @click="editorClick(scope.row),editordialog=true"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            tableData: [
        {
          idname: "1",
          name: "1",
          profile: "1",
          legal: "1",
          phone: "1",
          fax: "1",
          addres: "1",
          code: "1",
          note: "1",
        },
        {
          idname: "1",
          name: "1",
          profile: "1",
          legal: "1",
          phone: "1",
          fax: "1",
          addres: "1",
          code: "1",
          note: "1",
        },
        {
          idname: "1",
          name: "1",
          profile: "1",
          legal: "1",
          phone: "1",
          fax: "1",
          addres: "1",
          code: "1",
          note: "1",
        },
        {
          idname: "1",
          name: "1",
          profile: "1",
          legal: "1",
          phone: "1",
          fax: "1",
          addres: "1",
          code: "1",
          note: "1",
        },
      ],
             activeName: 'first',
            radio:'1',
            checkbox:true,
            options: [{
          value: '选项1',
          label: '一号线'
        }, {
          value: '选项2',
          label: '二号线'
        }, {
          value: '选项3',
          label: '三号线'
        },],
        value: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
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
        value2: '',
        }
    },
    methods:{
    }

}
</script>
<style scoped>
.body{
    padding: 40px;
}
.header{
    display: flex;
}
</style>