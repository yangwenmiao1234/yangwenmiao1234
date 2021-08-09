<template>
  <div class="dashboard-container">
    <div>
      <Zmd></Zmd>
    </div>
   <div class="use">
      <el-divider content-position="center"><span style="font-size:27px" >长沙惠工智科科技股份有限公司</span></el-divider>
 <div class="dahezi">
         <div class="hezi1">
          <img style="height:100px; width:100px;margin-top: 44%;
    margin-left: 22.5%;" src="@/assets/logo/使用说明.png" alt="">

     <div class="chakan1" style="margin-top:70%">
        <el-divider></el-divider>
        <div class="xiangqing" style="text-align: center">
        <a style="display:block;line-height:45px">
          查看详情
        </a>
        </div>
     </div>
       </div>

     <div class="hezi2" style="margin-left:18%">
        <img style="height:100px; width:100px;margin-top: 44%;
    margin-left: 22.5%;" src="@/assets/logo/远程协助.png" alt="">
             <div class="chakan2" style="margin-top:70%">
        <el-divider></el-divider>
        <div class="xiangqing2" style="text-align: center">
        <a style="display:block;line-height:45px">
          查看详情
        </a>
        </div>
     </div>
     </div>
     <div class="hezi3" style="margin-left:18%">
        <img style="height:100px; width:100px;margin-top: 44%;
    margin-left: 22.5%;" src="@/assets/logo/关于.png" alt="">
             <div class="chakan3" style="margin-top:70%">
        <el-divider></el-divider>
        <div class="xiangqing3" style="text-align: center">
        <a style="display:block;line-height:45px">
          查看详情
        </a>
        </div>
     </div>
     </div>
 </div>


   </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Zmd from '@/components/zmd/zmd.vue' 

// import sysm from '@/components/shiyongsming.html'
export default {
  name: 'Dashboard',
  components: {  Zmd ,},  
  data() {
    return {
    }
  },

   methods:{
  
          }
}
</script>

<style  scoped>
.dashboard-container{
   margin:0 ;
        padding:0;
  background-color: #ffffff  ;
}
  .el-carousel__item h3 {
    color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  } 
.use{
height: 559px;
}

.dahezi{
  display: flex;
}


.hezi1{
   margin:0 ;
        padding:0;
  margin-left: 15%;
  margin-top: 8%;
  height: 360px;
  width: 180px;
  border:1px solid rgb(0 0 0 / 67%);
}
  .hezi1:hover{
    /* bottom: 10px; */
    /* margin-top: 1px; */
    -webkit-box-shadow: 0 6px 18px 0 rgb(0 0 0 / 67%);
}
  .xiangqing{
    width: 100%;
    height: 50px;
    border-radius: 0px;
    margin-top: -13.4%;
  }
  .use .hezi1 .chakan1 .xiangqing:hover{
    background-color: rgb(0 0 0 / 67%);
    color: azure;
  }

.hezi2{
   margin:0 ;
        padding:0;
  margin-left: 5%;
  margin-top: 8%;
  height: 360px;
  width: 180px;
  border:1px solid rgb(0 0 0 / 67%);
}
  .hezi2:hover{
    bottom: 10px;
    -webkit-box-shadow: 0 6px 18px 0 rgb(0 0 0 / 67%);
}
  .xiangqing2{
    width: 100%;
    height: 50px;
    border-radius: 0px;
    margin-top: -13.4%;
  }
  .use .hezi2 .chakan2 .xiangqing2:hover{
    background-color: rgb(0 0 0 / 67%);
    color: azure;
  }


  .hezi3{
   margin:0 ;
        padding:0;
  margin-left: 5%;
  margin-top: 8%;
  height: 360px;
  width: 180px;
  border:1px solid rgb(0 0 0 / 67%);
}
  .hezi3:hover{
    bottom: 10px;
    -webkit-box-shadow: 0 6px 18px 0 rgb(0 0 0 / 67%);
}
  .xiangqing3{
    width: 100%;
    height: 50px;
    border-radius: 0px;
    margin-top: -13.4%;
  }
  .use .hezi3 .chakan3 .xiangqing3:hover{
    background-color: rgb(0 0 0 / 67%);
    color: azure;
  }
</style>

