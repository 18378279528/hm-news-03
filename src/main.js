import Vue from 'vue'
import App from './App.vue'
import router from './router'
//公共样式
import './styles/base.less'
// 图标样式
import './styles/iconfont.css'
// Vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// amfe-flexible库
import 'amfe-flexible'

//全局组件导入
import Header from './components/Header.vue'
import Logo from './components/Hmlogo.vue'

//公共组件注册
Vue.component('my-header', Header)
Vue.component('my-logo', Logo)

// axios优化
import axios from 'axios'

// 把axios挂载到vue的原型
Vue.prototype.$axios = axios
// 给axios配置默认的baseURL ,基准地址
axios.defaults.baseURL = 'http://localhost:3000'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')