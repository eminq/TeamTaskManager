import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import TasksView from '../views/TasksView.vue';
import ErrorView from '../views/ErrorView.vue';
import EditView from '../views/EditView.vue';
import store from '@/store/store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: TasksView,
    beforeEnter: (to, from, next) => {
      if(store.state.isLoggedIn === false) {
          router.push('/');
      } else {
          next();
      }
    }
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditView
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
