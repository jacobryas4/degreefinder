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
import Login from '@/components/UI/Login'

import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
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
      component: AddDegree,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add-degree-reqs',
      name: 'AddDegReq',
      component: AddDegReq,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-degree/:degree_slug',
      name: 'EditDegree',
      component: EditDegree,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-degree-reqs/:degree_slug',
      name: 'EditDegreeReq',
      component: EditDegreeReq,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/degrees/:degree_id/:school_slug/:degree_type',
      name: 'DegreeInfo',
      component: DegreeInfo
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  // check to see if route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = firebase.auth().currentUser
    if (user) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router
