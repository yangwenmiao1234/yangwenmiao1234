<template>
<div class="body">
 <el-tabs class="body_tab" type="border-card">
  <el-tab-pane label="Mes配方">
        <!-- <span>标准配方库</span> -->
    <div class="header">
      <span style="margin-top: 0.6%">生产线：</span>
      <el-select  v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.Caption"
          :value="item.ID"
        >
        </el-option>
      </el-select>
      <span style="margin-top: 0.6%; margin-left: 2%">商品类型：</span>
      <el-select @change="shiyanshicdt()" v-model="value2" placeholder="请选择">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span style="margin-top: 0.6%; margin-left: 2%">混凝土强度：</span>
      <el-select v-model="value3" placeholder="请选择">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.TypePowerGrade"
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
        <el-radio @change="zhucong()" v-model="radio" label="0">主从</el-radio>
        <el-radio @change="zhengbiao()" v-model="radio" label="1">整表</el-radio>
      </div>
    </div>
    <div class="button" style="display:flex">
      <el-button size="small" @click="adddialog=true,queryselect(),addcheck()" style="width:80px;margin-left:3%;margin-top:2.5%" type="primary" plain>添加</el-button>
      <el-button size="small" @click="out()" style="width:80px;margin-left:3%;margin-top:2.5%" type="primary" plain>导出</el-button>
      <el-button size="small" @click="query(),querydata()" style="width:80px;margin-left:3%;margin-top:2.5%" type="primary" plain>查询</el-button>
      <el-button size="small" @click="setupdialog=true,setup()" style="width:80px;margin-left:3%;margin-top:2.5%" type="primary" plain>设置</el-button>
    </div>
    <div style="margin-top:3%;height:350px">
        <el-table
        v-loading="loading"
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
        <el-table-column :prop="item.ColumnName" v-for="item in headerdata" :key="item.ColumnName" :label="item">
           <template slot-scope="scope">
                    <span style="center">{{scope.row[scope.column.property]}}</span>
              </template>
      </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              style="color: rgb(0 0 0 / 67%)" 
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              >查看</el-button
            >
            <el-button style="color: rgb(0 0 0 / 67%)" type="text" size="small"
             @click="editorClick(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20]"
        :page-size="size"
        layout="sizes, prev, pager, next, jumper"
      >
       <!-- layout="total, sizes, prev, pager, next, jumper" :total="total" -->
      </el-pagination>
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
            <el-button type="primary" @click="setupdialog = false, addsave()">确 定</el-button>
          </span>
        </el-dialog>
          <el-dialog
          v-dialogDrag
            title="混凝土配方"
            :visible.sync="adddialog"
            :fullscreen="true"
            :before-close="handleClose">
            <div class="dialogheader" style="display:flex;width:100%;">
              <div style="display:flex;width:100%" >
            <el-form  label-width="80px" :model="addfrom">
            <el-form-item label="配方名称:">
              <el-input v-model="addfrom.Caption"></el-input>
            </el-form-item>
            <el-form-item label="强度等级:">
              <el-select style="margin-left:%;width:153px" v-model="typePowerGrade" placeholder="请选择">
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
          </el-form>
              </div>
              <div style="display:flex;width:100%" >
            <el-form  label-width="80px" :model="addfrom">
            <el-form-item label="搅拌时间(s):">
              <el-input v-model="addfrom.MixTime"></el-input>
            </el-form-item>
            <el-form-item label="坍落度:">
              <el-input v-model="addfrom.TypeSlump"></el-input>
            </el-form-item>
          </el-form>
              </div>
              <div style="width:100%" >
            <el-form  label-width="80px" :model="addfrom">
            <el-form-item label="砂粒径:">
              <el-input style="width:153px" v-model="addfrom.TypeSandSize"></el-input>
            </el-form-item>
          <el-form-item label="抗渗等级:">
            <el-select style="width:153px" v-model="TypeSeepGrade" placeholder="请选择">
              <el-option
                v-for="item in options6"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
              </div>
              <div style="display:flex;width:100%" >
            <el-form  label-width="80px" :model="addfrom">
            <el-form-item label="污水比例(%):">
              <el-input v-model="addfrom.PercentWS"></el-input>
            </el-form-item>
            <el-form-item label="流水号:">
              <el-input v-model="addfrom.SerialNum"></el-input>
            </el-form-item>
          </el-form>
              </div>
              <div style="display:flex;width:100%" >
            <el-form label-width="80px" :model="addfrom">
            <el-form-item label="接口编码:">
              <el-input v-model="addfrom.InterfaceID"></el-input>
            </el-form-item>
            <el-form-item label="备注:">
              <el-input  v-model="addfrom.Remark"></el-input>
            </el-form-item>
          </el-form>
              </div>
            </div>
              <div>
                 <el-form :model="ruleForm">
                    <el-form-item label="生产线">
                    <el-checkbox-group v-if="checkbox"  v-model="checklist">
                  <el-checkbox
                    v-for="item in hardwareListData"
                    :key="item.ID"
                    :label="item.Caption"
                  @change=" handleChange($event,item.ID,item.Caption)">{{item.Caption}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              </el-form>
              <div id="table1Div">
              <el-table
                :v-loading="loading"
                :header-cell-style="{  background: 'rgba(249, 182, 3, 0.67)', color: '#606266' }"
                :data="data"
                :border="border"
                :cell-style="cell"
                style="width: 100%"
              >
                  <el-table-column fixed="left" prop="name" :label="title+title1+title2" width="70px">
                   
                  </el-table-column>
                   <!-- <el-table-column :prop="item.ColumnName" v-for="item in headerdata2" :key="item.ColumnName" :label="item.ColumnName">
                    
                              <span style="center">{{scope.row[scope.column.property]}}</span>
                        </template>
                </el-table-column> -->
                  <el-table-column prop="" v-for="item in headerdata2" :key="item.ColumnName" :label="item.ColumnValue">
                   <template slot-scope="scope">
                    <el-input
                    style="border:0"
                      v-if=" scope.row.edit"
                       v-model="scope.row[item.ColumnName]"
                      size="small"
                      placeholder='请输入'
                    ></el-input>
                    </template>
                </el-table-column>
                  <el-table-column fixed="right" label="操作" width="">
                    <template slot-scope="scope">
                      <el-button
                        style="color: rgb(0 0 0 / 67%)"
                        :plain="true"
                        v-if="false"
                        @click="handleSave(scope.$index, scope.row)"
                        type="text"
                        size="small"
                        >保存</el-button
                      >
                      <el-button style="color: rgb(0 0 0 / 67%)" type="text" size="small"
                      @click="scope.row.edit=true"
                        >编辑</el-button
                      >
                    </template>
                  </el-table-column>
              </el-table>
              </div>
              <div id="tableDiv111" >
              
              </div>
              </div>
            <span slot="footer" class="dialog-footer">
              <el-button style="margin-top:10%" @click="adddialog = false">取 消</el-button>
              <el-button style="margin-top:10%" type="primary" @click="adddialog = false , add() ,handleSave(scope.$index, scope.row)">确 定</el-button>
            </span>
          </el-dialog>
      </div>
    </el-tab-pane>
   <!-- <el-tab-pane label="Pcs配方">
     <Tab>
      </Tab>
    </el-tab-pane> -->
</el-tabs>
  </div>
</template>
 <script src="https://code.jquery.com/jquery-3.0.0.min.js"></script>
 <script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
<script>
import { queryshenchanxianxinxi} from "@/api/user.js";
import { shiyanshi , addshiyanshi , modifyshiyanshi , deleteshiyanshi , shiyanshicdt , shiyanshidata ,querypeifang,
          addSave , querypeizhi
        } from "@/api/shiyanshi.js"
        
// import Tab from '@/views/shiyanshi/biaozhunpeifang/index2'
// import tableVue from '@/components/biaozhunpeifang/table.vue';
export default {
  // components:{ Tab },
  created() {
    this.query()
    this.shiyanshicdt()
    this.querydata()
    this.handleChange()
  },
    render(){
    
  },
  data() {
    return {
      jsonData : [],
      table:[{
        data:'',
        cell:'',
        loading:'loading',
        header:'{  background: rgba(249, 182, 3, 0.67), color: #606266 }',
        border:'border'
      }],
      headerdata:[],
      tableData: [],
      headerdata2:[],
      tableData2: [{
        name:'最大值',
        edit:false,
      },{
        name:'最小值',
        edit:false,
      },{
        name:'配方值',
        edit:false,
      }],
      page:1,
      size:10,
      // total:'',
      title:'',
      title1:'',
      title2:'',
      checked2: true,
      checked3: true,
      checked1: true,
      checked4: true,
      checked5: true,
      checked6: true,
      addfrom : {
        Caption:"",
        MixTime:"",
        TypeSlump:"",
        TypeSandSize:"",
        InterfaceID:"",
        Remark:"",
        SerialNum:"",
        PercentWS:'',
        },
      adddialog:false,
      type:'选项一',
      setupdialog:false,
      radio: "0",
      options: [
        {
          value: "",
          label: "",
          ID:'',
          Caption:"",
        }
      ],
      value: "c85ecb2e-960f-4ca7-bc35-5135968d8594",
      options2: [
        {
          value: "0",
          label: "混凝土",
        },
        {
          value: "2",
          label: "干砂浆",
        },
        {
          value: "1",
          label: "湿砂浆",
        },
      ],
      value2: "0",
      options3: [
        {
          value: "",
          TypePowerGrade: "",
        }
      ],
      value3: "",
      options4: [
        {
          value: "0",
          label: "料仓简称",
        },
        {
          value: "1",
          label: "原料名称",
        },
      ],
      value4: "0",
      options5: [
        {
          value: "0",
          label: "c25",
        },
        {
          value: "1",
          label: "c35",
        },
      ],
      typePowerGrade: "",
      options6: [
        {
          value: "0",
          label: "C",
        },
        {
          value: "1",
          label: "B",
        },
      ],
      TypeSeepGrade: "",
      ruleForm:{
        IsCheck:"",
      },
      hardwareListData:[],
      checklist:[],
      checkbox: true,
      // disabled: false,
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
          this.hardwareListData = response.data.data
          console.log(this.hardwareListData)
        })
    },
    shiyanshicdt(){
      shiyanshicdt({
        productlineid : this.value,
        producttype : this.value2
      }).then((response)=>{
        this.options3 = response.data
      }).catch((error)=>{
        this.$message({
          type:'error',
          message:'查询有误'
        })
      })
    },
    query() {
      this.loading = true;
      this.headerdata = []
      shiyanshi({
        producelineid : this.value,
        typeproduct : this.value2,
        typepowergrade:this.value3,
        headerType:this.value4,
        showtype:this.radio,
        page: this.page,
        intPageSize: this.size,
        comid:localStorage.getItem('comid')
      })
        .then((response) => {
          // this.tableData = response.data.data;
          // this.page = response.data.page;
          // this.size = response.data.PageSize;
          // this.total = response.data.dataCount;
          // this.tableData = response.data
          var header = []
          var table = []
          header = response.data
          header.forEach(item => {
            this.headerdata.push(
              item.ColumnValue,
              // item.ColumnData
            )
          })
          // header.forEach(item => {
          //   table.push(
          //     // item.ColumnValue,
          //     item.ColumnData.split(1,3)
          //   )
          //   alert(table)
          // })
          
          this.loading = false;
        })
        .catch((error) => {
          this.loading = true;
          this.$message({
            type: "info",
            message: "查询失败，请联系管理员！",
          });
        });
    },
    querydata() {
      this.loading = true;
      this.headerdata = []
      shiyanshidata({
        producelineid : this.value,
        typeproduct : this.value2,
        typepowergrade:this.value3,
        headerType:this.value4,
        showtype:this.radio,
        page: this.page,
        intPageSize: this.size,
        comid:localStorage.getItem('comid')
      })
        .then((response) => {
          this.page = response.data.page;
          this.size = response.data.PageSize;
          // this.total = response.data.dataCount;
          // var header = []
          // var table = []
          this.tableData = response.data
          // header.forEach(item => {
          //   this.headerdata.push(
          //     item.ColumnValue,
          //   )
          // })
          this.loading = false;
        })
        .catch((error) => {
          this.loading = true;
          this.$message({
            type: "info",
            message: "查询失败，请联系管理员！",
          });
        });
    },
    add(){  
      addshiyanshi({
        Caption : this.addfrom.Caption,
        typePowerGrade : this.typePowerGrade,
        MixTime : this.addfrom.MixTime,
        TypeSlump : this.addfrom.TypeSlump,
        TypeSandSize : this.addfrom.TypeSandSize,
        TypeSeepGrade : this.TypeSeepGrade,
        InterfaceID : this.addfrom.InterfaceID,
        Remark : this.addfrom.Remark,
        SerialNum : this.addfrom.SerialNum,
        PercentWS : this.addfrom.PercentWS,
        ProduceLineID : this.value,
        CompanyID : localStorage.getItem('comid'),
        ActionTime:localStorage.getItem('ActionTime'),
        ActionUserID:localStorage.getItem('ActionUserID'),
        ActionUserName:localStorage.getItem('ActionUserName'),
      }).then(response=>{
        this.query(),
        this.$message({
          type:'success',
          message:'添加成功'
        })
      }).catch((error)=>{
        this.$message({
          type:'error',
          message:'添加未成功！'
        })
      })
    },
    addcheck(){
      this.checklist= []
      this.hardwareListData.forEach(item=>{
            if(item.ID===this.value){
              this.checklist.push(item.Caption)
            }
          })
          let formulasetting = JSON.stringify({
        isFormulaTitleShowStoreCaption: this.checked1,
        isFormulaTitleShowStoreCaptionMin: this.checked2,
        isFormulaTitleShowStoreCaptionMES: this.checked3,
        isFormulaTitleShowMaterialCaption: this.checked4,
        isFormulaTitleShowWeightMax: this.checked5,
        isFormulaTitleShowWeightMin: this.checked6
          })
        querypeifang({
            formulasetting,
            comid : localStorage.getItem('comid'),
            producelineid : this.value
          }).then((response)=>{
            this.headerdata2 = response.data
            if(this.checked1==true){
              this.title = '料仓全称'
            }else{
              this.title = ''
            }
            if(this.checked2==true){
              this.title1 = '料仓简称'
            }else{
              this.title1 = ''
            }
            if(this.checked3==true){
              this.title2 = '生产系统'
            }else{
              this.title2 = ''
            }
         })
    },
    addsave(){
      let formulasetting = {IsFormulaTitleShowStoreCaption: this.checked1,
        IsFormulaTitleShowStoreCaptionMin: this.checked2,
        IsFormulaTitleShowStoreCaptionMES: this.checked3,
        IsFormulaTitleShowMaterialCaption: this.checked4,
        IsFormulaTitleShowWeightMax: this.checked5,
        IsFormulaTitleShowWeightMin: this.checked6}
        let comid = localStorage.getItem('comid')
      addSave({
        comid : localStorage.getItem('comid'),formulasetting
        }).then((response)=>{
        this.$message({
          type:'success',
          message:'保存成功'
        })
      })
    },
    handleSave(index, row){
      // console.log(this.tableData2)
      var Maxlist =  this.tableData2[0]
      var Minlist = this.tableData2[1]
      var formulalist = this.tableData2[2]
     
     var  param ={Maxlist,Minlist,formulalist}
      // console.log(this.headerdata2)
    //  row.forEach(item=>{
    //     // if(item.name === '最大值'){
    //     //   Maxlist.push(
    //     //   item
    //     // )}else if(item.name === '最小值'){
    //     //     Minlist.push(
    //     //       item
    //     //     )
    //     // }else{
    //     //    peifang.push(
    //     //       item
    //     //     )
    //     // }
    //     // return Maxlist,Minlist,peifang
    //     param.item
    //   })
        console.log(param)
    },
    out(){
      alert("等待接口")
    },
    setup(){
      querypeizhi({
        comid : localStorage.getItem('comid')
      }).then(response=>{
        this.checked1 = response.data.IsFormulaTitleShowStoreCaption
        this.checked2 = response.data.IsFormulaTitleShowStoreCaptionMin,
        this.checked3 = true
        // response.data.IsFormulaTitleShowStoreCaptionMES,
        this.checked4 = response.data.IsFormulaTitleShowMaterialCaption,
        this.checked5 = response.data.IsFormulaTitleShowWeightMax,
        this.checked6 = response.data.IsFormulaTitleShowWeightMin
      })
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    handleSizeChange(val) {
      console.log(val);
      this.size = val;
      this.querydata();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.querydata();
    },
    headClass() {
      return "text-align:center";
    },
    rowClass() {
      return "text-align:center";
    },
    handleChange:function($event,ID,Caption){
      if($event==true){
          //  this.checklist= []
      this.hardwareListData.forEach(item=>{
            if(item.ID===ID){
              this.checklist.push(item.Caption)
            }
          })
          let formulasetting = JSON.stringify({
        isFormulaTitleShowStoreCaption: this.checked1,
        isFormulaTitleShowStoreCaptionMin: this.checked2,
        isFormulaTitleShowStoreCaptionMES: this.checked3,
        isFormulaTitleShowMaterialCaption: this.checked4,
        isFormulaTitleShowWeightMax: this.checked5,
        isFormulaTitleShowWeightMin: this.checked6
          })
        querypeifang({
            formulasetting,
            comid : localStorage.getItem('comid'),
            producelineid : this.value
          }).then((response)=>{
             var html = "";
            // this.headerdata2 = response.data
            // if(this.checked1==true){
            //   this.title = '料仓全称'
            // }else{
            //   this.title = ''
            // }
            // if(this.checked2==true){
            //   this.title1 = '料仓简称'
            // }else{
            //   this.title1 = ''
            // }
            // if(this.checked3==true){
            //   this.title2 = '生产系统'
            // }else{
            //   this.title2 = ''
            // }
            this.jsonData = response.data;
             this.jsonData.forEach(element => {
                   
                });
             html += '<el-table :v-loading="loading" :data="data" :border="border" :cell-style="cell" style="width: 100%">';
             html += '<el-table-column :prop="item.ColumnValue" v-for="item in headerdata2 " :key="item.ColumnName" :label="item.ColumnValue">';
             html += '<p>31211223</p>'
             html += "</el-table-column>";
             html += '<el-table>';
            // console.log(html);
            // console.log($("#table1Div").html());
          $(html).appendTo('#tableDiv111');
           console.log($("#tableDiv111").html());
         })
      }else{
        
      }
    }
  }, 
  mounted(){
    this.queryselect()
    // this.querylist()
    this.shiyanshicdt()
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
.body_tab{
  /* height: 100%; */
}
/* select选中值的时候的颜色 */
/* .el-select .el-input__inner:focus {
    border-color: #6c7f92;
} */
.el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 30px;
}
.el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 30px;
}
/* /deep/.el-input__inner{
  border:0
} */
</style>