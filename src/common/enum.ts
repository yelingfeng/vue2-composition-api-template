export const enum REQUEST_STATUS {
  // 成功
  SUCCESS = 200,
  // 服务器内部错误
  ERROR = 500,
  // 重定向
  REDIRECT = 50001
}

/**
 * App类型
 *   1: 'App应用',
 *   2: '快应用',
 *   99: '其他'
 */
export const enum APP_TYPE {
  BASE = '1',
  FASTAPP = '2',
  OTHER = '99'
}
/* app语种
'1': '中文',
'2': '英文',
'3': '其他' */
export const enum APP_LANGUAGE {
  CN = '1',
  EN = '2',
  OTHER = '3'
}
/* 在架状态
'0': '在架',
'1': '下架' */
export const enum ONLINE_STATUS {
  ONLINE = '1',
  OUTLINE = '0'
}
/* 是否存在问题
'1': '合格',
'2': '不合格',
'0': '未检测' */
export const enum ILLEGAL {
  PASS = '1',
  NG = '2',
  ND = '0'
}
/* 更新类型
'1': '新上架',
'2': '功能更新',
'3': '未报备' */
export const enum UPDATE_TYPE {
  NEW = '1',
  UPDATE = '2',
  NOREPORT = '3'
}
/* 隐私政策是否申明
true: '已申明',
false: '未申明' */
export const enum POLICE_STATE {
  AVOW = 'ture',
  NO_AVOW = 'false'
}
/* 检测状态
'0': '未检测',
'1': '检测中',
'2': '检测完成',
'-2': '检测失败' */
export const enum TASK_STATUS {
  NO = '0',
  ING = '1',
  SUCCESS = '2',
  ERROR = '-2'
}
/* 敏感度
normal: '正常',
dangerous: '危险' */
export const enum LEVEL {
  NORMAL = 'normal',
  DANGEROUS = 'dangerous'
}
/* 评估结果
0: '未检测',
1: '合规',
2: '不合规',
3: '有' */
export const enum RESULT {
  NOEXAM = '0',
  PASS = '1',
  NG = '2',
  HAVE = '3'
}
