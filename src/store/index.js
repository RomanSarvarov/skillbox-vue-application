import { createStore } from 'vuex';
import axios from 'axios';
import config from '@/config';

const store = createStore({
  state: {
    pageLoading: false,
    pageLoadFailed: false,
    cartLoading: false,
    cartLoadFailed: false,
    auth: {
      token: null,
    },
    cart: {
      productsData: null,
      products: [],
    },
  },
  mutations: {
    pageLoadStart(state) {
      state.pageLoading = true;
    },
    pageLoadStop(state) {
      state.pageLoading = false;
    },
    pageLoadFailed(state, failed = true) {
      state.pageLoadFailed = failed;
    },
    cartLoadStart(state) {
      state.cartLoading = true;
    },
    cartLoadStop(state) {
      state.cartLoading = false;
    },
    cartLoadFailed(state, failed = true) {
      state.cartLoadFailed = failed;
    },
    updateAuthToken(state, token) {
      state.auth.token = token;
    },
    updateCartProducts(state, productsData) {
      state.cart.productsData = productsData;
    },
    adaptCartProducts(state, productsData) {
      state.cart.products = productsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
        product: item.product,
      }));
    },
    cartItemUpdateAmount(state, { productId, amount }) {
      const item = state.cart.products.find(
        (cartProduct) => cartProduct.productId === productId,
      );

      if (item) {
        item.amount = amount;
      }
    },
    cartItemDelete(state, productId) {
      state.cart.products = state.cart.products.filter(
        (item) => item.productId !== productId,
      );
    },
  },
  getters: {
    isPageLoading(state) {
      return state.pageLoading;
    },
    isPageLoadFailed(state) {
      return state.pageLoadFailed;
    },
    cartDetailProducts(state) {
      return state.cart.products;
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce(
        (acc, cartProduct) => (cartProduct.product.price * (+cartProduct.amount || 0)) + acc, 0,
      );
    },
    cartCount(state) {
      return state.cart.products.length;
    },
    isCartLoading(state) {
      return state.cartLoading;
    },
    isCartLoadFailed(state) {
      return state.cartLoadFailed;
    },
  },
  actions: {
    async loadCart(context) {
      context.commit('cartLoadStart');
      context.commit('cartLoadFailed', false);

      try {
        const response = await axios.get(`${config.API_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.auth.token,
          },
        });

        const token = response.data.user.accessKey;
        if (!context.state.auth.token) {
          localStorage.setItem('authToken', token);
          context.commit('updateAuthToken', token);
        }

        context.dispatch('syncCartProducts', response.data.items);
      } catch (e) {
        context.commit('cartLoadFailed', true);
      } finally {
        context.commit('cartLoadStop');
      }
    },
    syncCartProducts(context, data) {
      context.commit('updateCartProducts', data);
      context.commit('adaptCartProducts', data);
    },
    async addProductToCart(context, { productId, amount }) {
      const response = await axios.post(`${config.API_URL}/api/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.auth.token,
        },
      });

      context.dispatch('syncCartProducts', response.data.items);

      return response;
    },
    async cartItemUpdateAmount(context, { productId, amount }) {
      context.commit('cartItemUpdateAmount', { productId, amount });

      if (amount < 1) {
        return;
      }

      try {
        const response = await axios.put(`${config.API_URL}/api/baskets/products`, {
          productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.auth.token,
          },
        });

        context.commit('updateCartProducts', response.data.items);
      } catch (e) {
        context.commit('adaptCartProducts', context.state.cart.productsData);
      }
    },
    async cartItemDelete(context, productId) {
      context.commit('cartItemDelete', productId);

      try {
        const response = await axios.delete(`${config.API_URL}/api/baskets/products`, {
          data: {
            productId,
          },
          params: {
            userAccessKey: context.state.auth.token,
          },
        });

        context.commit('updateCartProducts', response.data.items);
      } catch (e) {
        context.commit('adaptCartProducts', context.state.cart.productsData);
      }
    },
  },
});

export default store;
