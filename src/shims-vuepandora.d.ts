import Vuepandora from 'vue-pandora'
declare global {
  namespace VP {
    export type VForm = Vuepandora.VForm
    export type VTable = Vuepandora.VTable
  }
}
