import { createStore } from 'vuex';

const store = createStore({
  state: {
    cart: {
      products: [
        {
          id: 1,
          amount: 4,
        },
      ],
    },
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const alreadyExistProduct = state.cart.products.find(
        (product) => product.id === productId,
      );

      if (alreadyExistProduct) {
        alreadyExistProduct.amount += 1;
        return;
      }

      state.cart.products.push({ id: productId, amount });
    },
  },
});

export default store;
