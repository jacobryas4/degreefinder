import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import ByDegree from '@/components/containers/ByDegree'
import BySchool from '@/components/containers/BySchool'
import ByCategory from '@/components/containers/ByCategory'
import AddDegree from '@/components/containers/AddDegree'
import AddDegReq from '@/components/containers/AddDegReq'
import EditDegree from '@/components/containers/EditDegree'
import EditDegreeReq from '@/components/containers/EditDegreeReq'
import DegreeInfo from '@/components/containers/DegreeInfo'
import SignUp from '@/components/UI/SignUp'

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
    },
    {
      path: '/add-degree',
      name: 'AddDegree',
      component: AddDegree
    },
    {
      path: '/add-degree-reqs',
      name: 'AddDegReq',
      component: AddDegReq
    },
    {
      path: '/edit-degree/:degree_slug',
      name: 'EditDegree',
      component: EditDegree
    },
    {
      path: '/edit-degree-reqs/:degree_slug',
      name: 'EditDegreeReq',
      component: EditDegreeReq
    },
    {
      path: '/degrees/:degree_slug/:school_slug',
      name: 'DegreeInfo',
      component: DegreeInfo
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
