import Layout from '@/layout'
import { getInfo } from "@/api/user.js"


export function addRouter(){
    getInfo({
      name:localStorage.getItem("name"),
      pass:localStorage.getItem("pass")
    }).then((response)=>{
        data = routesData(response.data.perTree.children)
        router.addRoutes(data)
        console.log(router)
    })
  }
  export function routesData(children){
    // var routes = []
      children.forEach(item=>{
        constantRoutes.push({
          path: item.path,
          component: Layout,
          redirect: item.redirect,
          meta: { title: item.label, icon: item.icon },
          children:getChilder(item.children)
        })
      })
      return constantRoutes
  }
  export function getChilder(dd){
    var routers2 = [];
       dd.forEach(item => {
         routers2.push({
          path: item.path,
          name: item.name,
          component: () => import(item.component),
          meta: { title: item.label, icon: item.icon }
        })
      })
      return routers2;
  }
export default { addRouter }