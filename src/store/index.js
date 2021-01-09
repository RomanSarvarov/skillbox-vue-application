import { createStore } from 'vuex';
import ProductModule from '@/store/modules/product.module';
import ProductCategoryModule from '@/store/modules/product-category.module';
import ProductColorModule from '@/store/modules/product-color.module';
import OrderModule from '@/store/modules/order.module';
import AuthModule from '@/store/modules/auth.module';
import CartModule from '@/store/modules/cart.module';
import PageLoadingModule from '@/store/modules/page-loading.module';

const store = createStore({
  modules: {
    product: ProductModule,
    productCategory: ProductCategoryModule,
    productColor: ProductColorModule,
    order: OrderModule,
    auth: AuthModule,
    cart: CartModule,
    pageLoading: PageLoadingModule,
  },
});

export default store;
