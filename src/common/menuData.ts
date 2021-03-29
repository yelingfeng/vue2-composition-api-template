export const navList = [
  {
    menuId: '10000',
    menuName: '数据安全备案主体发现系统',
    menuURL: 'dataOperation/main',
    isInternal: true
  },
  {
    menuId: '20000',
    menuName: '数据安全监信息备案系统',
    menuURL: '',
    isInternal: false
  },
  {
    menuId: '30000',
    menuName: '数据安全监管监察系统',
    menuURL: '',
    isInternal: false
  },
  {
    menuId: '40000',
    menuName: '投诉举报系统',
    menuURL: '',
    isInternal: false
  },
  {
    menuId: '50000',
    menuName: '数据安全监测预警系统',
    menuURL: 'dataSafeMonitor/attackEvent',
    isInternal: true
  },
  {
    menuId: '60000',
    menuName: '个人信息安全监测预警系统',
    menuURL: 'infoSafeWarning/darkPhoneMonitor',
    isInternal: true
  },
  {
    menuId: '70000',
    menuName: '数据安全态势感知系统',
    menuURL: '',
    isInternal: true
  },
  {
    menuId: '80000',
    menuName: '数据安全执法办案系统',
    menuURL: '',
    isInternal: false
  },
  {
    menuId: '90000',
    menuName: '数据安全备管理协作系统',
    menuURL: '',
    isInternal: false
  },
  {
    menuId: '100000',
    menuName: '监管数据综合展示系统',
    menuURL: '',
    isInternal: false
  }
]

export const menuList = [
  {
    path: 'MenuIndex',
    name: '导航页',
    meta: {
      title: '导航页',
      icon: 'icon-shouye'
    }
  },
  {
    path: 'dataOperation',
    name: '数据安全备案发现系统',
    meta: {
      title: '数据运营者信息',
      icon: 'iconyunyingzhechaxun',
      id: '10000'
    },
    children: [
      {
        path: 'dataOperation/main',
        name: '数据运营者信息',
        id: '10001',
        meta: {
          title: '数据运营者信息',
          parentId: '10000',
          icon: 'iconyunyingzhechaxun'
        }
      },
      {
        path: 'dataOperation/serviceAPI',
        name: '服务API信息',
        id: '10002',
        meta: {
          title: '服务API信息',
          parentId: '10000',
          icon: 'iconAPIxinxi'
        }
      },
      {
        path: 'dataOperation/IOT',
        name: '物联网信息',
        id: '10003',
        meta: {
          title: '物联网信息',
          parentId: '10000',
          icon: 'iconwulianwang'
        }
      },
      {
        path: 'dataOperation/website',
        name: '网站信息',
        id: '10004',
        meta: {
          title: '网站信息',
          parentId: '10000',
          icon: 'iconwangzhanxinxi'
        }
      },
      {
        path: 'dataOperation/miniProgram',
        name: '小程序信息',
        id: '10005',
        meta: {
          title: '小程序信息',
          parentId: '10000',
          icon: 'iconxiaochengxu'
        }
      },
      {
        path: 'dataOperation/officialAccount',
        name: '公众号信息',
        id: '10006',
        meta: {
          title: '公众号信息',
          parentId: '10000',
          icon: 'icongongzhonghao'
        }
      },
      {
        path: 'dataOperation/app',
        name: '移动应用信息',
        id: '10007',
        meta: {
          title: '移动应用信息',
          parentId: '10000',
          icon: 'iconapp'
        }
      }
    ]
  },
  {
    path: 'dataSafeMonitor',
    name: '数据安全监测预警系统',
    meta: {
      title: '数据安全攻击事件监测',
      icon: 'iconyunyingzhechaxun',
      id: '20000'
    },
    children: [
      {
        path: 'dataSafeMonitor/attackEvent',
        name: '数据安全攻击事件监测',
        id: '20001',
        meta: {
          title: '数据安全攻击事件监测',
          parentId: '20000',
          icon: 'icongongjishijianjiance'
        }
      },
      {
        path: 'dataSafeMonitor/appMonitor',
        name: 'App安全数据监测',
        id: '20002',
        meta: {
          title: 'App安全数据监测',
          parentId: '20000',
          icon: 'iconappjiance'
        }
      }
    ]
  },
  {
    path: 'infoSafeWarning',
    name: '个人信息安全监测预警系统',
    meta: {
      title: '黑产手机号监测',
      icon: 'iconyunyingzhechaxun',
      id: '60000'
    },
    children: [
      {
        path: 'fleece',
        name: '业务模块',
        id: '61000',
        meta: {
          title: '业务模块',
          parentId: '60000',
          icon: 'iconheichanshoujihaojiance'
        },
        children: [
          {
            path: 'infoSafeWarning/fleece',
            name: '薅羊毛',
            id: '61001',
            meta: {
              title: '薅羊毛',
              parentId: '61000',
              icon: 'iconheichanshoujihaojiance'
            }
          },
          {
            path: 'infoSafeWarning/zombieFans',
            name: '僵尸粉',
            id: '61002',
            meta: {
              title: '僵尸粉',
              parentId: '61000',
              icon: 'iconheichankashangjiance'
            }
          },
          {
            path: 'infoSafeWarning/maliciousDrainage',
            name: '恶意引流',
            id: '61003',
            meta: {
              title: '恶意引流',
              parentId: '61000',
              icon: 'iconheichantuanhuojiance'
            }
          },
          {
            path: 'infoSafeWarning/networkGambling',
            name: '网络博彩',
            id: '61004',
            meta: {
              title: '网络博彩',
              parentId: '61000',
              icon: 'iconbeianwangzhandubo'
            }
          },
          {
            path: 'infoSafeWarning/platformByBuyer',
            name: '个人信息交易平台-买方',
            id: '61005',
            meta: {
              title: '个人信息交易平台-买方',
              parentId: '61000',
              icon: 'iconbeianwangzhandubo'
            }
          },
          {
            path: 'infoSafeWarning/platformBySeller',
            name: '个人信息交易平台-卖方',
            id: '61006',
            meta: {
              title: '个人信息交易平台-卖方',
              parentId: '61000',
              icon: 'iconbeianwangzhandubo'
            }
          },
          {
            path: 'infoSafeWarning/platform',
            name: '个人信息交易平台',
            id: '61007',
            meta: {
              title: '个人信息交易平台',
              parentId: '61000',
              icon: 'iconbeianwangzhandubo'
            }
          }
        ]
      },
      {
        path: 'darkPhoneMonitor',
        name: '基础数据页',
        id: '62000',
        meta: {
          title: '基础数据页',
          parentId: '60000',
          icon: 'iconheichanshoujihaojiance'
        },
        children: [
          {
            path: 'infoSafeWarning/darkPhoneMonitor',
            name: '黑产手机号监测',
            id: '62001',
            meta: {
              title: '黑产手机号监测',
              parentId: '62000',
              icon: 'iconheichanshoujihaojiance'
            }
          },
          {
            path: 'infoSafeWarning/darkVendorMonitor',
            name: '黑产卡商监测',
            id: '62002',
            meta: {
              title: '黑产卡商监测',
              parentId: '62000',
              icon: 'iconheichankashangjiance'
            }
          },
          {
            path: 'infoSafeWarning/darkGangMonitor',
            name: '黑产团伙监测',
            id: '62003',
            meta: {
              title: '黑产团伙监测',
              parentId: '62000',
              icon: 'iconheichantuanhuojiance'
            }
          },
          {
            path: 'infoSafeWarning/gamblingDarkChain',
            name: '备案网站赌博暗链',
            id: '62004',
            meta: {
              title: '备案网站赌博暗链',
              parentId: '62000',
              icon: 'iconbeianwangzhandubo'
            }
          },
          {
            path: 'infoSafeWarning/gamblingAPP',
            name: '个人信息窃取赌博APP',
            id: '62005',
            meta: {
              title: '个人信息窃取赌博APP',
              parentId: '62000',
              icon: 'iconappdubo'
            }
          }
        ]
      }
    ]
  }
]
