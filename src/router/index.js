import { createWebHistory, createRouter } from 'vue-router';
import Home from '../containers/Home';
import UserView from '../containers/UserView';
import LoginView from '../containers/Login';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/users/:id",
    name: "UserViewEdit",
    component: UserView,
  },
  {
    path: "/users/new",
    name: "UserView",
    component: UserView,
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
