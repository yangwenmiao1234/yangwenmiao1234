<template>
    <div>
       <el-button @click="addfrom()">
           添加规格
       </el-button>
       <div>
           <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item v-for="item in label" :key="item.value"  :label="item.name">
                <el-input id="name" v-model="item.sex"></el-input>
                <el-button @click="addfrom2">保存</el-button>
            </el-form-item>
            </el-form>
       </div>
       <div v-if="div" class="body_div">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item v-for="item in label2" :key="item.value"  :label="item.name">
                <el-input v-model="item.sex"></el-input>
                <el-button @click="addfrom2">保存</el-button>
            </el-form-item>
            </el-form>
       </div>
    </div>
</template>
<script>

export default{
    data(){
        return{
            div:false,
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        label:[],
        label2:[],
        zhi:'',
        adddata:[],
        a:'',
    }
},
methods:{
    addfrom(){
    this.label.push({
        value:'',
        name:'',
        sex:'',
    })
    },
    addfrom2(){
        this.div=true
        alert(document.getElementById("name"))
        this.label.forEach(item => {
            this.zhi = item.sex
        })
        console.log(this.zhi)
    this.label2.push({
        value:'',
        name:this.zhi,
        sex:'',
    })
    }
}
}
</script>
<style scoped>
.body_div{
    height: 300px;
    width: 300px;
 border: 1px solid blue
}
</style>