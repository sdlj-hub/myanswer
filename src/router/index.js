import Vue from 'vue'
import VueRouter from 'vue-router'
import Radio from '../components/Radio.vue'
import Checkbox from '../components/Checkbox.vue'
import Judge from '../components/Judge.vue'
import Tiankong from '../components/Tiankong.vue'
import Index from '../views/Index.vue'
import Indata from '../views/indata.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/radio',
    component:Radio
  },
  {
    path: '/checkbox',
    component: Checkbox
  },
  {
    path: '/judge',
    component: Judge
  },
  {
    path: '/tiankong',
    component: Tiankong
  },
  {
    path: '/add',
    component: Indata
  },
  {
    path: '/index',
    component : Index
  },
  {
    path: '/*',
    redirect: '/index'
  }

]

const router = new VueRouter({
  routes
})

export default router
