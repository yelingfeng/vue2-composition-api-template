import Vue from 'vue'
import ElementUI from 'element-ui'
import VuePandora from 'vue-pandora'
import VueCompositionAPI from '@vue/composition-api'

import BorderBox from '@/components/Common/BorderBox.vue'
import PageContainer from '@/components/Common/PageContainer.vue'
import TabsBaseTable from '@/components/Common/TabsBaseTable.vue'

import 'vue-pandora/lib/vuepandora.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(VuePandora)
Vue.use(VueCompositionAPI)
Vue.use(ElementUI)
Vue.component('BorderBox', BorderBox)
Vue.component('PageContainer', PageContainer)
Vue.component('TabsBaseTable', TabsBaseTable)
