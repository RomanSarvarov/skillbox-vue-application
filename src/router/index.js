import { createWebHashHistory, createRouter } from 'vue-router';
import MainPage from '@/pages/MainPage';
import NotFoundPage from '@/pages/errors/NotFoundPage';
import ProductPage from '@/pages/ProductPage';
import CartPage from '@/pages/CartPage';
import OrderCreationPage from '@/pages/OrderCreationPage';
import OrderViewPage from '@/pages/OrderViewPage';

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
    name: 'cart',
    component: CartPage,
    path: '/cart',
  },
  {
    name: 'orderCreation',
    component: OrderCreationPage,
    path: '/order',
  },
  {
    name: 'orderView',
    component: OrderViewPage,
    path: '/order/:id',
  },
  {
    name: 'notFound',
    component: NotFoundPage,
    path: '/:catchAll(.*)',
  },
];

const history = createWebHashHistory();

const router = createRouter({
  history,
  routes,
});

export default router;
