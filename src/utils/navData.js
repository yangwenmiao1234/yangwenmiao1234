import Layout from '@/layout'
export default [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '用户管理', icon: 'dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/yonghuguanli'),
        meta: { title: '用户管理', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'example',
    meta: { title: '系统设置', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '公司信息', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '砼生产线', icon: 'tree' }
      },
      {
        path: 'tongxin',
        name: 'Tongxin',
        component: () => import('@/views/tongxin/index'),
        meta: { title: '通信设置', icon: 'tree' }
      }
    ]
  },

  {
    path: '/from',
    component: Layout,
    name: 'From',
    redirect: '/from/yuangon',
    meta: { title: '综合管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/yuangon',
        name: 'Yuangon',
        component: () => import('@/views/form/yuangon/index'),
        meta: { title: '菜单管理', icon: 'form' }
      }
      // {
      //     path: '/quanxian',
      //     name: 'Quanxian',
      //     component: () => import('@/views/form/quanxian/index'),
      //     meta: { title: '权限管理', icon: 'form' }
      // }
    ]
  },
  {
    path: '/xiaoshou',
    component: Layout,
    redirect: '/xiaoshou',
    meta: { title: '销售单管理', icon: 'dashboard' },
    children: [
      {
        path: 'xiaoshou',
        name: 'xiaoshou',
        component: () => import('@/views/xiaoshou/index'),
        meta: { title: '销售管理', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/shengchanguanli',
    component: Layout,
    name: 'shengchanguanli',
    redirect: '/shengchanguanli/renwudan',
    meta: { title: '生产管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/renwudan',
        name: 'Renwudan',
        component: () => import('@/views/shengchanguanli/renwudan/index'),
        meta: { title: '任务单管理', icon: 'form' }
      },
      {
        path: '/shengchandan',
        name: 'Shengchandan',
        component: () => import('@/views/shengchanguanli/shengchandan/index'),
        meta: { title: '生产单管理', icon: 'form' }
      },
      {
        path: '/fahuodan',
        name: 'Fahuodan',
        component: () => import('@/views/shengchanguanli/fahuodan/index'),
        meta: { title: '发货单管理', icon: 'form' }
      }
      // {
      //     path: '/dianhua',
      //     name: 'Dianhua',
      //     component: () => import('@/views/shengchanguanli/dianhua/index'),
      //     meta: { title: '电话录音', icon: 'form' }
      // }
    ]
  },
  {
    path: '/shiyanshi',
    component: Layout,
    name: 'Shiyanshi',
    redirect: '/shiyanshi/biaozhunpeifang',
    meta: { title: '实验室', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/biaozhunpeifang',
        name: 'Biaozhunpeifang',
        component: () => import('@/views/shiyanshi/biaozhunpeifang/index'),
        meta: { title: '标准配方库', icon: 'form' }
      },
      {
        path: '/bangding',
        name: 'Bangding',
        component: () => import('@/views/shiyanshi/bangding/index'),
        meta: { title: '绑定配方', icon: 'form' }
      },
      {
        path: '/lishi',
        name: 'Lishi',
        component: () => import('@/views/shiyanshi/lishi/index'),
        meta: { title: '历史配方', icon: 'form' }
      }
    ]
  },
  {
    path: '/yuanliaoguanli',
    component: Layout,
    name: 'Yuanliaoguanli',
    redirect: '/yuanliaoguanli/yuanliaoxinxi',
    meta: { title: '原料管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/yuanliaoxinxi',
        name: 'Yuanliaoxinxi',
        component: () => import('@/views/yuanliaoguanli/yuanliaoxinxi/index'),
        meta: { title: '原料信息', icon: 'form' }
      },
      {
        path: '/gonyingshangxinxi',
        name: 'Gonyingshangxinxi',
        component: () =>
          import('@/views/yuanliaoguanli/gonyingshangxinxi/index'),
        meta: { title: '供应商信息', icon: 'form' }
      },
      {
        path: '/liaocangyuanliao',
        name: 'Liaocangyuanliao',
        component: () =>
          import('@/views/yuanliaoguanli/liaocangyuanliao/index'),
        meta: { title: '料仓原料', icon: 'form' }
      },
      {
        path: '/pankuguanli',
        name: 'Pankuguanli',
        component: () => import('@/views/yuanliaoguanli/pankuguanli/index'),
        meta: { title: '盘库管理', icon: 'form' }
      },
      {
        path: '/yuanliaokucun',
        name: 'Yuanliaokucun',
        component: () => import('@/views/yuanliaoguanli/yuanliaokucun/index'),
        meta: { title: '原料库存', icon: 'form' }
      }
    ]
  },
  {
    path: '/wuliuguanli',
    component: Layout,
    name: 'wuliuguanli',
    redirect: '/wuliuguanli/jiaoyunche',
    meta: { title: '物流管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/jiaoyunche',
        name: 'Jiaoyunche',
        component: () => import('@/views/wuliuguanli/jiaoyunche/index'),
        meta: { title: '物流管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/shujuchaxun',
    component: Layout,
    name: 'Shujuchaxun',
    redirect: '/shujuchaxun/shengchanshuju',
    meta: { title: '数据查询', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/shengchanshuju',
        name: 'Shengchanshuju',
        component: () => import('@/views/shujuchaxun/shengchanshuju/index'),
        meta: { title: '生产数据', icon: 'form' }
      },
      {
        path: '/fahuoshuju',
        name: 'Fahuoshuju',
        component: () => import('@/views/shujuchaxun/fahuoshuju/index'),
        meta: { title: '发货数据', icon: 'form' }
      },
      {
        path: '/dibangshuju',
        name: 'Dibangshuju',
        component: () => import('@/views/shujuchaxun/dibangshuju/index'),
        meta: { title: '地磅数据', icon: 'form' }
      },
      {
        path: '/piaodansaoma',
        name: 'Piaodansaoma',
        component: () => import('@/views/shujuchaxun/piaodansaoma/index'),
        meta: { title: '票单扫码', icon: 'form' }
      },
      {
        path: '/rizhishuju',
        name: 'Rizhishuju',
        component: () => import('@/views/shujuchaxun/rizhishuju/index'),
        meta: { title: '日志数据', icon: 'form' }
      }
    ]
  }
]
