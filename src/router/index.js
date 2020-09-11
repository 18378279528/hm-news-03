import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import {
  Toast
} from 'vant'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    component: Login,
    name: 'login'
  }, {
    path: '/register',
    component: Register,
    name: 'register'
  },
  {
    path: '/user',
    component: User,
    name: 'user'
  }
]

const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach(function (to, from, next) {
  const token = localStorage.getItem('token')
  const Urls = ['/user']
  if (!Urls.includes(to.path) || token) {
    next()
  } else {
    Toast('请先登录')
    router.push('/login')
  }

})

export default router