import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DetailView from '../views/DetailView.vue';
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      // 웹브라우저 주소 표시줄에 명시
      path: '/build-ghibli/',
      // RouterView 에 보여줄 페이지 컴포넌트 이름
      component: HomeView
    },
    {
      path: '/build-ghibli/home',
      redirect: '/build-ghibli/'
    },
    {
      path: '/build-ghibli/detail/:id',
      component: DetailView
    },
    {
      path: "/build-ghibli/404",
      name: "notFound",
      component: NotFound,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/build-ghibli/404",
    }
  ]
});

export default router;