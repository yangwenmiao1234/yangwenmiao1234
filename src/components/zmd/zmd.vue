<template>
  <!--动态将图片轮播图的容器高度设置成与图片一致-->
  <el-carousel :interval="4000" type="card" height="220px">
      <el-carousel-item v-for="item in imagebox" :key="item.id">
        <img :src="item.idView" class="image">
      </el-carousel-item>
    </el-carousel>
</template>
<script>
  export default{
    name:'zmd',
    data(){
      return {
       imagebox:[{id:0,idView:require('@/assets/logo/hg1.png')},
        {id:1,idView:require('@/assets/logo/hg2.png')},
        {id:2,idView:require('@/assets/3.jpg')},
        {id:2,idView:require('@/assets/4.jpg')}
        ],
         
        // 浏览器宽度
        screenWidth :0
      }
    },
     methods:{
              setSize:function () {
                // 通过浏览器宽度(图片宽度)计算高度
                this.bannerHeight = 400 / 1920 * this.screenWidth;
              },
            },
          mounted() {
              // 首次加载时,需要调用一次
              this.screenWidth =  window.innerWidth;
              this.setSize();
              // 窗口大小发生改变时,调用一次
              window.onresize = () =>{
              this.screenWidth =  window.innerWidth;
              this.setSize();
            }
          }
  }
</script>

<style>
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
    img{
     /*设置图片宽度和浏览器宽度一致*/
      width:100%;
      height:inherit;
    }
</style>