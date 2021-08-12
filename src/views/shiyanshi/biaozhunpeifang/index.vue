<template>
  <div class="body">
    <!-- <span>标准配方库</span> -->
    <div class="header">
      <span style="margin-top: 0.6%">生产线：</span>
      <el-select @change="xianlu()"  v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.Caption"
          :value="item.ID"
        >
        </el-option>
      </el-select>
      <span style="margin-top: 0.6%; margin-left: 2%">商品类型：</span>
      <el-select v-model="value2" placeholder="请选择">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span style="margin-top: 0.6%; margin-left: 2%">混凝土强度：</span>
      <el-select @change="setup()"  v-model="value3" placeholder="请选择">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span style="margin-top: 0.6%; margin-left: 2%">表头类型：</span>
      <el-select v-model="value4" placeholder="请选择">
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div style="margin-top: 0.6%; margin-left: 1%">
        <el-radio @change="zhucong()" v-model="radio" label="1">主从</el-radio>
        <el-radio @change="zhengbiao()" v-model="radio" label="2">整表</el-radio>
      </div>
    </div>
    <div class="button" style="display:flex">
      <el-button size="small" @click="add(),adddialog=true" style="width:80px;margin-left:3%;margin-top:2.5%" type="primary" plain>添加</el-button>
      <el-button size="small" @click="out()" style="width:80px;margin-left:3%;margin-top:2.5%" type="primary" plain>导出</el-button>
      <el-button size="small" @click="query(),queryselect()" style="width:80px;margin-left:3%;margin-top:2.5%" type="primary" plain>查询</el-button>
      <el-button size="small" @click="setup(),setupdialog=true" style="width:80px;margin-left:3%;margin-top:2.5%" type="primary" plain>设置</el-button>
    </div>
    <div v-if="zhuxianlu" style="margin-top:3%;height:450px">
        <Zhuyao>
        </Zhuyao>
    </div>
    <div class="dialog">
        <el-dialog
        v-dialogDrag
  title="提示"
  :visible.sync="setupdialog"
  width="35%"
  :before-close="handleClose">
  <div>
    <div style="display:flex">
      <el-checkbox v-model="checked1">显示料仓全称</el-checkbox>
      <el-checkbox style="margin-left:5%" v-model="checked2">显示料仓简称</el-checkbox>
      <el-checkbox style="margin-left:5%" v-model="checked3">显示生产系统</el-checkbox>
    </div>
    <div style="display:flex;margin-top:3%">
      <el-checkbox v-model="checked4">显示当前原料</el-checkbox>
      <el-checkbox style="margin-left:5%" v-model="checked5">显示最大重量</el-checkbox>
      <el-checkbox style="margin-left:5%" v-model="checked6">显示最小重量</el-checkbox>
    </div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="setupdialog = false">取 消</el-button>
    <el-button type="primary" @click="setupdialog = false">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
v-dialogDrag
  title="混凝土配方"
  :visible.sync="adddialog"
  width="80%"
  fullscreen=true
  :before-close="handleClose">
   <div style="display:flex;;width:100%;">
     <div style="display:flex;width:100%" >
  <el-form :label-position="labelPosition" label-width="80px" :model="addfrom">
  <el-form-item label="配方名称:">
    <el-input v-model="addfrom.name"></el-input>
  </el-form-item>
  <span style="margin-left:8.7%">强度等级:</span>
  <el-select style="margin-left:3.5%;width:153px" v-model="value5" placeholder="请选择">
    <el-option
      v-for="item in options5"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</el-form>
     </div>
     <div style="display:flex;width:100%" >
  <el-form :label-position="labelPosition" label-width="80px" :model="addfrom">
  <el-form-item label="搅拌时间(s):">
    <el-input v-model="addfrom.time"></el-input>
  </el-form-item>
  <el-form-item label="坍落度:">
    <el-input v-model="addfrom.slump"></el-input>
  </el-form-item>
</el-form>
     </div>
     <div style="width:100%" >
  <el-form :label-position="labelPosition" label-width="80px" :model="addfrom">
  <el-form-item label="砂粒径:">
    <el-input style="width:153px" v-model="addfrom.size"></el-input>
  </el-form-item>
 <span style="margin-left:8.5%">抗渗等级:</span>
  <el-select style="margin-left:3%;width:153px" v-model="value6" placeholder="请选择">
    <el-option
      v-for="item in options6"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</el-form>
     </div>
     <div style="display:flex;width:100%" >
  <el-form :label-position="labelPosition" label-width="80px" :model="addfrom">
  <el-form-item label="污水比例(%):">
    <el-input v-model="addfrom.sewage"></el-input>
  </el-form-item>
  <el-form-item label="流水号:">
    <el-input v-model="addfrom.Serial"></el-input>
  </el-form-item>
</el-form>
     </div>
     <div style="display:flex;width:100%" >
  <el-form :label-position="labelPosition" label-width="80px" :model="addfrom">
  <el-form-item label="接口编码:">
    <el-input v-model="addfrom.code"></el-input>
  </el-form-item>
  <el-form-item label="备注:">
    <el-input v-model="addfrom.note"></el-input>
  </el-form-item>
</el-form>
     </div>
   </div>
    <div>
       <span style="margin-left:1.9%">生产线:</span>
    <el-checkbox @change="addyixian()" style="margin-left:1.7%" size="medium" v-model="checked">1线</el-checkbox>
    <el-checkbox @change="adderxian()" v-model="checked7" size="medium">2线</el-checkbox>
    <el-checkbox @change="addsanxian()" v-model="checked8" size="medium">3线</el-checkbox>
     </div>
     <div v-if="addatable" :key="7" style="margin-top:2.5%">
       <Adda>
       </Adda>
     </div>
     <div v-if="addbtable" :key="8" style="margin-top:2.5%">
       <Addb>
       </Addb>
     </div>
     <div v-if="addctable" :key="9" style="margin-top:2.5%">
       <Addc>
       </Addc>
     </div>
  <span slot="footer" class="dialog-footer">
    <el-button style="margin-top:10%" @click="adddialog = false">取 消</el-button>
    <el-button style="margin-top:10%" type="primary" @click="adddialog = false">确 定</el-button>
  </span>
</el-dialog>
    </div>
    <div v-if="yixianlu" :key="1">
      
    </div>
    <div v-if="erxianlu" :key="2">
        <Btable>
        </Btable>
    </div>
    <div v-if="sanxianlu" :key="3">
        <Ctable>
        </Ctable>
    </div>
    <div v-if="guanxi" :key="4" style="margin-top:2.5%">
        <Zb>
        </Zb>
    </div>
    <div v-if="bguanxi" :key="5" style="margin-top:2.5%">
        <Bzhubiao>
        </Bzhubiao>
    </div>
    <div v-if="cguanxi" :key="6" style="margin-top:2.5%">
        <Czhubiao>
        </Czhubiao>
    </div>
  </div>
</template>
<script>
import { queryshenchanxianxinxi} from "@/api/user.js";
import { shiyanshi , addshiyanshi , modifyshiyanshi , deleteshiyanshi } from "@/api/shiyanshi.js"
import Zhuyao from '@/components/biaozhunpeifang/table.vue'
import Atable from '@/components/biaozhunpeifang/atable.vue'
import Btable from '@/components/biaozhunpeifang/btable.vue'
import Ctable from '@/components/biaozhunpeifang/ctable.vue'
import Zb from '@/components/biaozhunpeifang/zhubiao.vue'
import Bzhubiao from '@/components/biaozhunpeifang/bzhubiao.vue'
import Czhubiao from '@/components/biaozhunpeifang/czhubiao.vue'
import Adda from '@/components/biaozhunpeifang/Addatable.vue'
import Addb from '@/components/biaozhunpeifang/Addbtable.vue'
import Addc from '@/components/biaozhunpeifang/Addctable.vue'
export default {
  components:{ Zhuyao , Atable , Btable , Ctable , Zb , Bzhubiao ,Czhubiao ,Adda , Addb , Addc},
  data() {
    return {
      page:1,
      size:10,
      total:'',
      addatable:true,
      addbtable:false,
      addctable:false,
      checked: true,
      checked2: false,
      checked3: false,
       checked1: true,
      checked4: false,
       checked5: false,
      checked6: false,
       checked7: false,
      checked8: false,
      addfrom : {
          name: '',
          Strength: '',
          slump: '',
          time: '',
          size: '',
          garde: '',
          sewage: '',
          Serial: '',
          code: '',
          note: ''
        },
      adddialog:false,
      Bzhubiao:false,
      Czhubiao:false,
      guanxi:false,
      zhuxianlu:true,
      yixianlu:false,
      erxianlu:false,
      sanxianlu:false,
      type:'选项一',
      setupdialog:false,
      radio: "1",
      options: [
        {
          value: "",
          label: "",
          ID:'',
          Caption:"",
        }
      ],
      value: "",
      options2: [
        {
          value: "选项1",
          label: "混凝土",
        },
        {
          value: "选项2",
          label: "干砂浆",
        },
        {
          value: "选项3",
          label: "湿砂浆",
        },
      ],
      value2: "",
      options3: [
        {
          value: "选项1",
          label: "C25",
        },
        {
          value: "选项2",
          label: "C35",
        },
        {
          value: "选项3",
          label: "C15",
        },
      ],
      value3: "",
      options4: [
        {
          value: "选项1",
          label: "料仓简称",
        },
        {
          value: "选项2",
          label: "原料名称",
        },
      ],
      value4: "",
      options5: [
        {
          value: "选项1",
          label: "c25",
        },
        {
          value: "选项2",
          label: "c35",
        },
      ],
      value5: "",
      options6: [
        {
          value: "选项1",
          label: "料仓简称",
        },
        {
          value: "选项2",
          label: "原料名称",
        },
      ],
      value6: "",
    };
  },
  methods:{
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
     
    add(){
     
    },
    query(){
      alert("暂时还未实现")
    },
    out(){
      alert("等待接口")
    },
    setup(){
      alert("123")
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    xianlu(){
      // alert(this.value)
     if(this.radio==='1'){
         if(this.value==='选项1'){
        // this.zhuxianlu=false
         this.erxianlu=false
         this.sanxianlu=false
         this.yixianlu=true
      }else if(this.value==='选项2'){
        this.yixianlu=false
         this.sanxianlu=false
        this.erxianlu=true
      }else if(this.value==='选项3'){
        this.yixianlu=false
         this.erxianlu=false
        this.sanxianlu=true
      }else{
        this.erxianlu=false
         this.sanxianlu=false
        this.yixianlu=true
      }
     }else{
       if(this.value==='选项1'){
        this.erxianlu=false
       this.sanxianlu=false
       this.yixianlu=false
        this.zhuxianlu=false
         this.bguanxi=false
         this.cguanxi=false
         this.guanxi=true
      }else if(this.value==='选项2'){
        this.zhuxianlu=false
         this.erxianlu=false
       this.sanxianlu=false
       this.yixianlu=false
        this.guanxi=false
        this.cguanxi=false
        this.bguanxi=true
      }else if(this.value==='选项3'){
        this.zhuxianlu=false
        this.erxianlu=false
       this.sanxianlu=false
       this.yixianlu=false
        this.guanxi=false
        this.bguanxi=false
        this.cguanxi=true
      }else{
        this.zhuxianlu=false
        this.erxianlu=false
       this.sanxianlu=false
       this.yixianlu=false
         this.zhuxianlu=false
         this.bguanxi=false
         this.cguanxi=false
         this.guanxi=true
      }
     }
    },
     zhucong(){
      this.bguanxi=false
      this.cguanxi=false
      this.guanxi=false
      this.zhuxianlu=true
      this.yixianlu=true
      },
      zhengbiao(){
       this.erxianlu=false
       this.sanxianlu=false
       this.yixianlu=false
       this.xianlu()
      },
      addyixian(){
        if(this.checked===false){
          alert("1")
          this.addatable=false
        }else{
          alert("-1")
          this.addatable=true
        }
      },
      adderxian(){
        if(checked7===false){
          alert("2")
          this.addbtable=false
        }else{
          alert("-2")
          this.addbtable=true
        }
      },
      addsanxian(){
        if(checked8===false){
          alert("3")
          this.addctable=false
        }else{
          alert("-3")
          this.addctable=true
        }
      },
  }, 
  mounted(){
    this.queryselect()
    this.querylist()
  }
};
</script>
<style scoped>
.body {
  padding: 25px;
  flex-wrap: nowrap;
}
.header {
  width: 100%;
  display: flex;
}
/* select选中值的时候的颜色 */
/* .el-select .el-input__inner:focus {
    border-color: #6c7f92;
} */
</style>