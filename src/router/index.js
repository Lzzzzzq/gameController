import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main/Main'
import Control from '../components/Control/Control'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/control',
      name: 'Control',
      component: Control
    }
  ]
})
