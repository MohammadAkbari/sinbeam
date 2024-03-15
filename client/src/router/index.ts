import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from '../views/newMain/mainView.vue'
import Profile from '../views/profile/profile.vue'
import Questions from '../views/profile/tabs/questions.vue'
import Requests from '../views/profile/tabs/requests.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/home"
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/main/:id?',
      name: 'main',
      component: MainView,
      redirect:{name:'generalDetails'},      
      children: [
        {
          path: '/main/:id?/generalDetails',   
          name:'generalDetails'          
        },
        {
          path: '/main/:id?/defineSection',  
          name:'defineSection'
        },
        {
          path: '/main/:id?/loading',  
          name:'loading'
        },
        {
          path: '/main/:id?/analysis',  
          name:'analysis'
        },
        {
          path: '/main/:id?/verifications',  
          name:'verifications'
        },
        {
          path: '/main/:id?/design',  
          name:'design'
        }
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component:Profile,
      redirect:'/profile/questions',
      children: [
        {
          path: '/profile/questions',   
          name:'questions',
          component:Questions
        },
        {
          path: '/profile/requests',  
          name:'requests',
          component:Requests
        },
       
      ]
    }


    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
