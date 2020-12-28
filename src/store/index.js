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
        alreadyExistProduct.amount += amount;
        return;
      }

      state.cart.products.push({ productId, amount });
    },
    cartItemUpdateAmount(state, { productId, amount }) {
      // Если количество товаров 0 и меньше - удалить его из корзины.
      if (amount < 1) {
        this.commit('cartItemDelete', productId);
        return;
      }

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
