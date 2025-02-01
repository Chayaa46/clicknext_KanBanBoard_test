import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import BoardView from '../components/BoardView.vue'
import Invite from '../components/Invite.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/board',
      component: BoardView
    },
    {
      path: '/invite',
      component: Invite
    }
  ]
})

export default router