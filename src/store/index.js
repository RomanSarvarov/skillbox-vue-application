import { createStore } from 'vuex';
import products from '@/data/products';

const store = createStore({
  state: {
    cart: {
      products: [
        {
          productId: 1,
          amount: 4,
        },
      ],
    },
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const alreadyExistProduct = state.cart.products.find(
        (cartProduct) => cartProduct.productId === productId,
      );

      if (alreadyExistProduct) {
        alreadyExistProduct.amount += 1;
        return;
      }

      state.cart.products.push({ productId, amount });
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cart.products.map((cartProduct) => (
        {
          ...cartProduct,
          product: products.find((product) => product.id === cartProduct.productId),
        }
      ));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce(
        (acc, cartProduct) => (cartProduct.product.price * cartProduct.amount) + acc, 0,
      );
    },
    cartCount(state) {
      return state.cart.products.length;
    },
  },
});

export default store;
