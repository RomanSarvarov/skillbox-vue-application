import { createStore } from 'vuex';
import OrdersModule from '@/store/modules/orders.module';
import AuthModule from '@/store/modules/auth.module';
import CartModule from '@/store/modules/cart.module';
import PageLoadingModule from '@/store/modules/page-loading.module';

const store = createStore({
  modules: {
    orders: OrdersModule,
    auth: AuthModule,
    cart: CartModule,
    pageLoading: PageLoadingModule,
  },
});

export default store;
