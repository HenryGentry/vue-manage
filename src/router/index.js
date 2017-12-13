import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import manager from '@/components/routers/manager'
import managerAddUser from '@/components/routers/managerAddUser'
import info from '@/components/routers/info'
import infoPassword from '@/components/routers/infoPassword'
import news from '@/components/routers/news'
import product from '@/components/routers/product'
import productAdd from '@/components/routers/productAdd'
import swiper from '@/components/routers/swiper'
import swiperChange from '@/components/routers/swiperChange'
import company from '@/components/routers/company'
import classify from '@/components/routers/classify'
import classifyAdd from '@/components/routers/classifyAdd'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/home/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'manager',
          name: 'manager',
          component: manager
        }, {
          path: 'info',
          name: 'info',
          component: info
        }, {
          path: 'news',
          name: 'news',
          component: news
        }, {
          path: 'product',
          name: 'product',
          component: product
        }, {
          path: 'swiper',
          name: 'swiper',
          component: swiper
        }, {
          path: 'company',
          name: 'company',
          component: company
        }, {
          path: 'swiperChange',
          name: 'swiperChange',
          component: swiperChange
        }, {
          path: 'infoPassword',
          name: 'infoPassword',
          component: infoPassword
        }, {
          path: 'managerAddUser',
          name: 'managerAddUser',
          component: managerAddUser
        }, {
          path: 'productAdd',
          name: 'productAdd',
          component: productAdd
        }, {
          path: 'classify',
          name: 'classify',
          component: classify
        }, {
          path: 'classifyAdd',
          name: 'classifyAdd',
          component: classifyAdd
        }
      ]
    }
  ]
})
