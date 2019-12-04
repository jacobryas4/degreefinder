import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import ByDegree from '@/components/containers/ByDegree'
import BySchool from '@/components/containers/BySchool'
import ByCategory from '@/components/containers/ByCategory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/by-degree',
      name: 'ByDegree',
      component: ByDegree
    },
    {
      path: '/by-school',
      name: 'BySchool',
      component: BySchool
    },
    {
      path: '/by-category',
      name: 'ByCategory',
      component: ByCategory
    }
  ]
})
