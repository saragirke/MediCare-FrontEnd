import { createRouter, createWebHistory } from 'vue-router'
// IMporterar från views
import HomeView from '../views/HomeView.vue'
import VitaminView from '../views/VitaminView.vue';
import SuperView from '../views/SuperView.vue';
import AccountsView from '../views/AccountsView.vue';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/vitamin',
      name: 'vitamin',
      component: VitaminView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/superfood',
      name: 'superfood',
      component: SuperView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: AccountsView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        hideHeader: true,
        hideFooter: true
       }
    }
    
  ]
})

export default router
