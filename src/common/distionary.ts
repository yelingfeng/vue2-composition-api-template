import { APP_TYPE, APP_LANGUAGE, ONLINE_STATUS, ILLEGAL, UPDATE_TYPE, POLICE_STATE, TASK_STATUS, LEVEL, RESULT } from './enum'

// app类型
export const appType = {
  [APP_TYPE.BASE]: 'App应用',
  [APP_TYPE.FASTAPP]: '快应用',
  [APP_TYPE.OTHER]: '其他'
}
// app语种
export const appLanguage = {
  [APP_LANGUAGE.CN]: '中文',
  [APP_LANGUAGE.EN]: '英文',
  [APP_LANGUAGE.OTHER]: '其他'
}
// 在架状态
export const onlineStatus = {
  [ONLINE_STATUS.ONLINE]: '在架',
  [ONLINE_STATUS.OUTLINE]: '下架'
}
// 是否存在问题
export const illegal = {
  [ILLEGAL.PASS]: '合规',
  [ILLEGAL.NG]: '不合格',
  [ILLEGAL.ND]: '未检测'
}
// 更新类型
export const updateType = {
  [UPDATE_TYPE.NEW]: '新上架',
  [UPDATE_TYPE.UPDATE]: '功能更新',
  [UPDATE_TYPE.NOREPORT]: '未报备'
}
// 隐私政策是否申明
export const policeState = {
  [POLICE_STATE.AVOW]: '已申明',
  [POLICE_STATE.NO_AVOW]: '未申明'
}
// 检测状态
export const taskStatus = {
  [TASK_STATUS.NO]: '未检测',
  [TASK_STATUS.ING]: '检测中',
  [TASK_STATUS.SUCCESS]: '检测完成',
  [TASK_STATUS.ERROR]: '检测失败'
}
// 敏感度
export const level = {
  [LEVEL.NORMAL]: '正常',
  [LEVEL.DANGEROUS]: '危险'
}
// 评估结果
export const result = {
  [RESULT.NOEXAM]: '未检测',
  [RESULT.PASS]: '合规',
  [RESULT.NG]: '不合规',
  [RESULT.HAVE]: '有'
}
