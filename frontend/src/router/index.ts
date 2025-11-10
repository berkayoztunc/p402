import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Marketplace from '../views/Marketplace.vue';
import Dashboard from '../views/Dashboard.vue';
import ApiDetail from '../views/ApiDetail.vue';
import ApiPlayground from '../views/ApiPlayground.vue';
import Documentation from '../views/Documentation.vue';
import PaymentHistory from '../views/PaymentHistory.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/marketplace',
      name: 'marketplace',
      component: Marketplace,
    },
    {
      path: '/api/:id',
      name: 'api-detail',
      component: ApiDetail,
    },
    {
      path: '/playground',
      name: 'playground',
      component: ApiPlayground,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/documentation',
      name: 'documentation',
      component: Documentation,
    },
    {
      path: '/payment-history',
      name: 'payment-history',
      component: PaymentHistory,
      meta: { requiresAuth: true }
    },
  ],
});

export default router;
