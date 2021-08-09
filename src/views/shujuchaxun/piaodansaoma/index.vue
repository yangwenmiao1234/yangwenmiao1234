<template>
    <div class="body">
        <div class="header">
           <div class="header-1">
                <span>请选择票单类型：</span>
            <el-radio v-model="radio" label="1">发货单</el-radio>
            <el-radio v-model="radio" label="2">地磅单</el-radio>
           </div>
            <div class="header-2">
                <el-button style="margin-left:3%" type="primary" plain>导出</el-button>
            </div>
            <div class="header-3">
                <el-button style="margin-left:3%" type="primary" plain>导出</el-button>
            </div>
            <div class="header-4">
                <el-form :label-position="labelPosition" label-width="80px" :model="form">
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            </div>
            <div  style="margin-left:3%">
                 <el-button type="primary" plain>扫码复位</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            radio:"1",
            form:{
                name:'',
            }
        }
    }
}
</script>
<style scoped>
.body{
    padding:25px;
}
.header{
    width: 100%;
    display: flex;    
}
.header-1{
    margin-top: 0.8%;
}
.header-2{
    margin-left: 3%;
    /* display: flex; */
}
.header-3{
     margin-left: 1%;
}
.header-4{
    margin-top: 0.3%;
}
</style>