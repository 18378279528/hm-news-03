import Vue from 'vue'
import App from './App.vue'
import router from './router'
//公共样式
import './styles/base.less'
// 图标样式
import './styles/iconfont.css'
// Vant组件库
import Vant, {
  Toast
} from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// amfe-flexible库
import 'amfe-flexible'

//全局组件导入
import Header from './components/Header.vue'
import Logo from './components/Hmlogo.vue'
import HmNavItem from './components/HmNavItem.vue'

import moment from 'moment'

// axios优化
import axios from 'axios'

//定义全局过滤器
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})

// 把axios挂载到vue的原型
Vue.prototype.$axios = axios
// 给axios配置默认的baseURL ,基准地址
axios.defaults.baseURL = 'http://localhost:3000'
// 给axios配置拦截器
axios.interceptors.request.use(function (config) {
  // config指的是请求的配置信息
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log('拦截到了响应', response)
  const {
    statusCode,
    message
  } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // console.log('token失效拉')
    // 1. 跳转到登录页面
    router.push('/login')
    // 2. 清除失效的信息
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    // 3. 给提示  用户验证失败
    Toast.fail('登录信息失效')
  }
  return response
})

//公共组件注册
Vue.component('my-header', Header)
Vue.component('my-logo', Logo)
Vue.component('hm-nav', HmNavItem)
Vue.config.productionTip = false

window.vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')