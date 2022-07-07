import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import UserList from '../views/UserList.vue'
import RoomList from '../views/RoomList.vue'
import ChatBoard from '../views/ChatBoard.vue'
import Login_page from '../views/Login_confirmation.vue'
import SignUp from '../views/SignUp.vue'
// import firebase from "@/firebase/firebase";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'RoomList',
    component: RoomList,
    meta: { requiresAuth: true }
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatBoard
  },
  {
  path: '/login',
  name: 'Login',
  component: Login_page
  },
  {
  path: '/signup',
  name: 'signup',
  component: SignUp
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})



router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    const user =sessionStorage.getItem('user')
    console.log(JSON.parse(user))
    if (!user) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
    // firebase.auth().onAuthStateChanged((user) =>{
    //   if (!user) {
    //     next({
    //       path: '/login',
    //       query: { redirect: to.fullPath }
    //     })
    //   } else {
    //     next()
    //   }
    // })
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})

export default router
