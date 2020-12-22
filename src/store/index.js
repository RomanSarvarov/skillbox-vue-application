import { createStore } from 'vuex';

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
});

export default store;
