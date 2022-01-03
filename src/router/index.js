import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout'
import Login from '@/views/login'
import Register from '@/views/register'
import List from '@/views/list'
import Home from '@/views/home'
import Detail from '@/views/detail'
import Manage from '@/views/manage'
import Analyse from '@/views/analyse'
import Info from '@/views/info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/login',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home,
        },
        {
          path: '/manage',
          name: 'Manage',
          component: Manage,
        },
        {
          path: '/search',
          name: 'List',
          component: List,
        },
        {
          path: '/detail',
          name: 'Detail',
          component: Detail,
        },
        {
          path: '/analyse',
          name: 'Analyse',
          component: Analyse,
        },
        {
          path: '/info',
          name: 'Info',
          component: Info,
        },
      ]
    }
  ]
})
