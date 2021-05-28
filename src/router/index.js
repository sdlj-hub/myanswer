import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '../components/Test.vue'
import Test1 from '../components/Test1.vue'
import Test2 from '../components/Test2.vue'
import Test3 from '../components/Test3.vue'
import Test4 from '../components/Test4.vue'
import Index from '../views/In.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //  path:'/test',
  //  component:Test
  // },
  {
    path: '/test1',
    component:Test1
  },
  {
    path: '/test2',
    component: Test2
  },
  {
    path: '/test3',
    component: Test3
  },
  {
    path: '/test4',
    component: Test4
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
