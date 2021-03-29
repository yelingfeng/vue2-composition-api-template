import { http } from '@/common/request'
const handlerData = (resp: any) => {
  const options = resp.data.map((item: any) => {
    return {
      name: item.name,
      value: item.code
    }
  })
  return options
}

export async function getCitiesOptions(value) {
  return http.get(`/dictionary/getCities?id=${value}`).then((resp: any) => {
    return handlerData(resp)
  })
}

export async function getAreasOptions(value) {
  return http.get(`/dictionary/getCounties?id=${value}`).then((resp: any) => {
    return handlerData(resp)
  })
}
