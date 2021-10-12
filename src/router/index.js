import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout'
import Login from '@/views/login'
import List from '@/views/list'
import Home from '@/views/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children:[
        {
          path:'/home',
          name:'Home',
          component: Home,
        },
        {
          path:'/edit',
          name:'List',
          component: List,
        },
        {
          path:'/search',
          name:'List',
          component: List,
        },
      ]
    }
  ]
})
