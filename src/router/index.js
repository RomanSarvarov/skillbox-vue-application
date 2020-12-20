import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '@/pages/MainPage';
import NotFoundPage from '@/pages/errors/NotFoundPage';
import ProductPage from '@/pages/ProductPage';

const routes = [
  {
    name: 'main',
    component: MainPage,
    path: '/',
  },
  {
    name: 'product',
    component: ProductPage,
    path: '/products/:id',
  },
  {
    name: 'notFound',
    component: NotFoundPage,
    path: '/:catchAll(.*)',
  },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;
