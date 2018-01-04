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
import newsAdd from '@/components/routers/newsAdd'
import cases from '@/components/routers/cases'
import casesAdd from '@/components/routers/casesAdd'
import project from '@/components/routers/project'
import projectAdd from '@/components/routers/projectAdd'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin/login',
      name: 'login',
      component: Login
    }, {
      path: '/admin/home/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'manager',
          name: 'manager',
          component: manager,
          meta: {
            keepAlive: true
          }
        }, {
          path: 'info',
          name: 'info',
          component: info,
          meta: {
            keepAlive: true
          }
        }, {
          path: 'news',
          name: 'news',
          component: news,
          meta: {
            keepAlive: true
          }
        }, {
          path: 'product',
          name: 'product',
          component: product,
          meta: {
            keepAlive: true
          }
        }, {
          path: 'swiper',
          name: 'swiper',
          component: swiper,
          meta: {
            keepAlive: true
          }
        }, {
          path: 'company',
          name: 'company',
          component: company,
          meta: {
            keepAlive: true
          }
        }, {
          path: 'swiperChange',
          name: 'swiperChange',
          component: swiperChange,
          props: (route) => ({
            type: route.query.type,
            slideshowId: route.query.slideshowId,
            order: route.query.orderNum,
            title: route.query.title,
            skip: route.query.skipUrl,
            mark: route.query.remark,
            img: route.query.imgUrl,
            imgId: route.query.imgId
          })
        }, {
          path: 'infoPassword',
          name: 'infoPassword',
          component: infoPassword,
          props: (route) => ({ id: route.query.id, userName: route.query.userName })
        }, {
          path: 'managerAddUser',
          name: 'managerAddUser',
          component: managerAddUser
        }, {
          path: 'productAdd',
          name: 'productAdd',
          component: productAdd,
          props: (route) => ({ type: route.query.type, id: route.query.id })
        }, {
          path: 'classify',
          name: 'classify',
          component: classify,
          meta: {
            keepAlive: true
          }
        }, {
          path: 'classifyAdd',
          name: 'classifyAdd',
          component: classifyAdd,
          props: (route) => ({ type: route.query.type, id: route.query.id })
        }, {
          path: 'newsAdd',
          name: 'newsAdd',
          component: newsAdd,
          props: (route) => ({ type: route.query.type, id: route.query.id })
        }, {
          path: 'cases',
          name: 'cases',
          component: cases,
          meta: {
            keepAlive: true
          }
        }, {
          path: 'project',
          name: 'project',
          component: project,
          meta: {
            keepAlive: true
          }
        }, {
          path: 'casesAdd',
          name: 'casesAdd',
          component: casesAdd,
          props: (route) => ({ type: route.query.type, id: route.query.id, name: route.query.name, remark: route.query.remark })
        }, {
          path: 'projectAdd',
          name: 'projectAdd',
          component: projectAdd,
          props: (route) => ({ type: route.query.type, id: route.query.id })
        }
      ]
    }
  ]
})
