import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

import { defineAsyncComponent } from 'vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Home,
    meta:{
      layout:"Guest"
    }
  },

  {
    path: '/register',
    name: 'Register',
    component: defineAsyncComponent(()=>import(/*webpackChunkName:'register'*/ '@/views/Register.vue')),
    meta:{
      layout:"Guest"
    }
  },

  {
    path: '/findip',
    name: 'findip',
    component:defineAsyncComponent(() => import(/*webpackChunkName:'register'*/ '@/views/Findip.vue')), 
    meta:{
      layout:"Authenticated",
      loginRequired: true
    }
  },



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to)=>{
  if(to.meta.loginRequired)
  {
    const auth = getAuth()
    onAuthStateChanged(auth, (user)=>{
      if(user)
      {
        console.log('user logged in')
      }
      else{
          router.replace('/')
      }
    })
  }
  else{
    console.log(to)
  }
})


export default router
