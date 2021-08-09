<template>
  <div class="body">
    <div class="father">
      <div style="zhongliang">
        <span style="font-size: 40px">{{ one }}</span>
        <span style="font-size: 40px">{{ two }}</span>
        <span style="font-size: 40px">{{ three }}</span>
      </div>
      <div style="margin-top: 1%; margin-left: 3.8%;width:100%">
        <span>过磅类型：</span>
        <el-select style="width: 120px" v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span style="margin-left:1%">车号车牌：</span>
        <el-select style="width: 120px" v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span style="margin-left:1%">类型：</span>
        <el-select style="width: 120px" v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span style="width:73px;margin-left:1%">是否作废</span>
          <el-radio-group style="margin-left:1%"  v-model="radio3">
        <el-radio  :label="1">全部</el-radio>
        <el-radio style="margin-left:-8%" :label="2">正常单</el-radio>
        <el-radio style="margin-left:-8%" :label="3">作废单</el-radio>
      </el-radio-group>
      </div>
    </div>
    <div style="margin-top:1.5%">
      <el-button type="primary" plain>设置</el-button>
      <el-radio-group style="margin-left:1%"  v-model="radio4">
        <el-radio  :label="1">毛重</el-radio>
        <el-radio style="margin-left:-8%" :label="2">皮重</el-radio>
      </el-radio-group>
       <span class="demonstration" style="margin-left:1%">打票时间：</span>
    <el-date-picker
      v-model="value2"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
    <span style="width:73px;margin-left:1%">是否对账</span>
    <el-radio-group  v-model="radio4">
        <el-radio style="margin-left:5%"  :label="1">全部</el-radio>
        <el-radio style="margin-left:-8.5%" :label="2">未对账</el-radio>
        <el-radio style="margin-left:-7.9%" :label="3">已对账</el-radio>
      </el-radio-group>
      <span style="width:73px">是否完成</span>
    <el-radio-group  v-model="radio4">
        <el-radio  style="margin-left:5%" :label="1">全部</el-radio>
        <el-radio style="margin-left:-8.5%" :label="2">未完成</el-radio>
        <el-radio style="margin-left:-7.9%" :label="3">已完成</el-radio>
      </el-radio-group>
    </div>
    <div style="margin-top:1.5%">
        <el-select style="width: 155px" v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span style="margin-left:1.5%"> 原料名称：</span>
        <el-select style="width: 120px" v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span style="margin-left:1%"> 料仓名称：</span>
        <el-select style="width: 120px" v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span style="margin-left:1%"> 供应商：</span>
        <el-select style="width: 120px" v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-checkbox style="margin-left:1%" v-model="checked">显示页面</el-checkbox>
         <el-button type="primary" style="margin-left:1%" plain>扫码复位</el-button>
        <el-button style="margin-left:1.5%;" type="primary" plain>作废单复原</el-button>
    </div>
    <div style="margin-top:1.5%">
        <span> 过磅类型：</span>
        <el-select style="width: 95px" v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button type="primary"  style="margin-left:1.5%;width:70px" plain>查询</el-button>
        <el-button type="primary" style="margin-left:1%" plain>预览</el-button>
        <span style="margin-left:1%"> 打印模板：</span>
        <el-select style="width: 120px" v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button type="primary" style="margin-left:1%" plain>打印</el-button>
        <el-button type="primary" style="margin-left:1%" plain>导出</el-button>
        <el-button type="primary" style="margin-left:1%" plain>未对账</el-button>
        <el-button type="primary" style="margin-left:1%" plain>已对账</el-button>
        <el-button type="primary" style="margin-left:1%" plain>作废</el-button>
    </div>
    <div style="margin-top:1.5%">
 <el-button type="primary" style="width:70px" plain>毛重</el-button>
        <el-button style="margin-left:1.5%;width:70px" type="primary" plain>皮重</el-button>
        <el-radio-group style="margin-left:1.5%"  v-model="radio4">
        <el-radio  :label="1">毛重时新增</el-radio>
        <el-radio style="margin-left:-8.5%" :label="2">皮重时新增</el-radio>
      </el-radio-group>

      <el-button type="primary" style="margin-left:3%" @click="kochen(),kochendialog=true" plain>扣秤设置</el-button>
    </div>
    <div style="margin-top:3%">
        <Table>
        </Table>
    </div>
    <div class="dialog">
        <el-dialog
        v-dialogDrag
  title="提示"
  :visible.sync="kochendialog"
  width="30%"
  :before-close="handleClose">
  <span style="margin-left:3.3%"> 是否扣秤：</span>
        <el-select v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
       <div style="margin-top:3.5%">
          <span style="margin-left:3.3%;"> 扣秤类型：</span>
        <el-select v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
       </div>
        <el-form :label-position="labelPosition" label-width="80px" :model="kochengform">
  <el-form-item style="margin-top:3%" label="扣秤类型：">
    <el-input style="margin-left:-2.8%;width:163px" v-model="kochengform.name"></el-input>
  </el-form-item>
  <el-form-item label="扣秤条件：">
    <el-input style="margin-left:-2.8%;width:163px" v-model="kochengform.region"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="kochendialog = false">取 消</el-button>
    <el-button type="primary" @click="kochendialog = false">确 定</el-button>
  </span>
</el-dialog>
    </div>
  </div>
</template>
<script>
import Table from '@/views/dibangfang/cheliang/table.vue'
export default {
    components:{Table},
  name: "HelloWorld",
  data() {
    return {
      kochengform: {
          name: '',
          region: '',
        },
      kochendialog: false,
        checked:true,
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
        value1: '',
        value2: '',
        radio3:1,
        radio4:1,
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      flag: null,
      one: "00", // 时
      two: "00", // 分
      three: "00", // 秒
      abc: 0, // 秒的计数
      cde: 0, // 分的计数
      efg: 0, // 时的计数
    };
  },
  props: {
    msg: String,
  },
  methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    kochen(){
    },
    // 开始计时
    startHandler() {
      this.flag = setInterval(() => {
        if (this.three === 60 || this.three === "60") {
          this.three = "00";
          this.abc = 0;
          if (this.two === 60 || this.two === "60") {
            this.two = "00";
            this.cde = 0;
            if (this.efg + 1 <= 9) {
              this.efg++;
              this.one = "0" + this.efg;
            } else {
              this.efg++;
              this.one = this.efg;
            }
          } else {
            if (this.cde + 1 <= 9) {
              this.cde++;
              this.two = "0" + this.cde;
            } else {
              this.cde++;
              this.two = this.cde;
            }
          }
        } else {
          if (this.abc + 1 <= 9) {
            this.abc++;
            this.three = "0" + this.abc;
          } else {
            this.abc++;
            this.three = this.abc;
          }
        }
      }, 100);
    },
    // 暂停计时
    endHandler() {
      this.flag = clearInterval(this.flag);
    },
  },
};
</script>
<style scoped>
.body {
  padding: 25px;
   overflow-x:auto;
}
@media (min-width: 1280*800){
    .body{
      overflow-x:auto;
      padding: 25px;
    }
}
.zhongliang {
}
.father {
  display: flex;
}
</style>