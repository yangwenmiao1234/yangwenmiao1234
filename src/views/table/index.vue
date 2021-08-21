<template>
  <div class="dahezi">
    <div class="from">
      <el-form :inline="true" :model="formInline" class="class">
        <el-form-item label="公司编号:">
          <el-input
            v-model="formInline.bianhao"
            placeholder="公司编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="公司全称:">
          <el-input v-model="formInline.name" placeholder="公司全称"></el-input>
        </el-form-item>
      </el-form>
      <div class="from-2" style="">
        <el-button
          class="from-2-1"                                                                                  
          icon="el-icon-zoom-in"
          @click="query()"
          type="primary"
          style=""
          >查询</el-button
        >
        <el-button
          icon="el-icon-circle-plus"
          class="from-2-2"
          @click="adddialog = true"
          type="primary"
          style=""
          >添加</el-button
        >
      </div>
    </div>
    <div class="hezi1">
      <Gsxx ref="gonsixinxi"> </Gsxx>
    </div>
    <div>
      <el-dialog
      v-dialogDrag
        title="添加公司信息"
        :visible.sync="adddialog"
         class="body_dialog"
         width="40%"
        :before-close="handleClose"
      >
        <el-form
          label-width="88px"
          :model="addform"
          :rules="formRules"
        >
          <div class="" style="display: flex">
            <div>
              <el-form-item label="公司编号" prop="ID" :rules="[{required: true, trigger: 'blur', message: '公司编号不能为不能为空'}]">
                <el-input class="body_input" v-model="addform.ID"></el-input>
              </el-form-item>
              <el-form-item label="公司全称" prop="Caption" :rules="[{required: true, trigger: 'blur', message: '公司全称不能为不能为空'}]">
                <el-input class="body_input" v-model="addform.Caption"></el-input>
              </el-form-item>
              <el-form-item label="公司简介" prop="MinName" :rules="[{required: true, trigger: 'blur', message: '公司简介不能为不能为空'}]">
                <el-input class="body_input" v-model="addform.MinName"></el-input>
              </el-form-item>
              <el-form-item label="法定代表">
                <el-input class="body_input" v-model="addform.ParentCompanyID"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input class="body_input" v-model="addform.CompanyImage"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="公司电话">
                <el-input class="body_input" v-model="addform.CompanyPhone"></el-input>
              </el-form-item>
              <el-form-item label="公司传真">
                <el-input class="body_input" v-model="addform.CompanyFax"></el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input class="body_input" v-model="addform.CompanyAddress"></el-input>
              </el-form-item>
              <el-form-item label="接口编码">
                <el-input class="body_input" v-model="addform.CompanyManager"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            icon="el-icon-close"
            @click="(adddialog = false), addfalse()"
            >取 消</el-button
          >
          <el-button
            icon="el-icon-check"
            type="primary"
            @click="(adddialog = false), add()"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import plopfile from 'plopfile';
import Gsxx from "@/components/table/gonsixinxi.vue";
import { addgonsixinxi, gonsixin } from "@/api/user";
export default {
  components: { Gsxx },
  data() {
    return {
      formRules:{},
      adddialog: false,
      putdialog: false,
      formInline: {
        bianhao: "",
        name: "",
      },
      addform: {
        ID: "",
        Caption: "",
        MinName: "",
        ParentCompanyID: "",
        CompanyPhone: "",
        CompanyFax: "",
        CompanyAddress: "",
        CompanyManager: "",
        CompanyImage: "",
      },
      putform: {
        ID: "",
        Caption: "",
        MinName: "",
        ParentCompanyID: "",
        CompanyPhone: "",
        CompanyFax: "",
        CompanyAddress: "",
        CompanyManager: "",
        CompanyImage: "",
      },
      tableData: [],
    };
  },
  methods: {
    query() {
      const gonsixinxi = this.$refs.gonsixinxi;
      this.loading = true;
      gonsixin({
        page: gonsixinxi.page,
        intPageSize: gonsixinxi.size,
        code: this.formInline.bianhao,
        name: this.formInline.name,
      })
        .then((response) => {
          gonsixinxi.tableData = response.data.data;
          gonsixinxi.page = response.data.page;
          gonsixinxi.size = response.data.PageSize;
          gonsixinxi.total = response.data.dataCount
          gonsixinxi.loading = false;
        })
        .catch((error) => {
          this.loading = true;
          this.$message({
            type: "info",
            message: "查询失败，请联系管理员！",
          });
        });
    },
    querylist() {
      const gonsixinxi = this.$refs.gonsixinxi;
      gonsixinxi.querylist();
    },
    add() {
      if (this.addform.ID == "") {
        this.adddialog = true;
        this.$message({
          message: "请填写公司编号信息",
          type: "info",
        });
      } else {
        if (this.addform.MinName == "") {
          this.adddialog = true;
          this.$message({
            message: "请填写公司简介信息",
            type: "info",
          });
        } else {
          if (this.addform.Caption == "") {
            this.adddialog = true;
            this.$message({
              message: "请填写公司全称信息",
              type: "info",
            });
          } else {
            addgonsixinxi(
              JSON.stringify({
                id: this.addform.ID,
                caption: this.addform.Caption,
                minName: this.addform.MinName,
                parentCompanyID: this.addform.ParentCompanyID,
                companyPhone: this.addform.CompanyPhone,
                companyFax: this.addform.CompanyFax,
                companyAddress: this.addform.CompanyAddress,
                // companyImage:this.addform.CompanyImage,
                companyManager: this.addform.CompanyManager,
              })
            )
              .then((response) => {
                this.$message({
                  message: "添加成功！",
                  type: "success",
                });
                this.querylist();
                this.addform.ID = "";
                this.addform.Caption = "";
                this.addform.MinName = "";
                this.addform.ParentCompanyID = "";
                this.addform.CompanyPhone = "";
                this.addform.CompanyFax = "";
                this.addform.CompanyAddress = "";
                // const gonsixinxi=this.$refs.gonsixinxi
                // gonsixinxi.querylist()
              })
              .catch((error) => {
                this.$message({
                  message: "添加未成功，请联系管理员",
                  type: "error",
                });
              });
          }
        }
      }
      // const gonsixinxi=this.$refs.gonsixinxi
      // console.log(gonsixinxi)
      // this.addform.ID=this.$refs.gonsixinxi.tableData[0].ID
      // console.log(this.$refs.gonsixinxi.tableData)
    },
    addfalse() {
      this.$message("已经取消添加");
      this.addform.ID = "";
      this.addform.Caption = "";
      this.addform.MinName = "";
      this.addform.ParentCompanyID = "";
      this.addform.CompanyPhone = "";
      this.addform.CompanyFax = "";
      this.addform.CompanyAddress = "";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.addform.ID = "";
          this.addform.Caption = "";
          this.addform.MinName = "";
          this.addform.ParentCompanyID = "";
          this.addform.CompanyPhone = "";
          this.addform.CompanyFax = "";
          this.addform.CompanyAddress = "";
        })
        .catch((_) => {});
    },
  },
};
</script>
<style scoped>
.dahezi {
  padding: 25px;
}
.from {
  /* margin-top: 0%; */
  display: flex;
}
.hezi1 {
  margin-top: 2%;
}
/* 输入框 边框颜色设置*/
/* /deep/.el-input__inner {
  background-color: #f7f0dcab;
  border-color: rgb(0 0 0 / 67%);
} */
.from-2 {
  display: flex;
  height: 45px;
  margin-top: 0%;
  margin-left: 3%;
}
.from-2-1 {
  margin-left: 3%;
  /* background-color: orange; */
  /* border: 2px solid rgb(0 0 0 / 67%); */
}

.from-2-2 {
  margin-left: 3%;
  /* background-color: orange; */
  /* border: 2px solid rgb(0 0 0 / 67%); */
}
.body_input{
  width:220px;
}

</style>