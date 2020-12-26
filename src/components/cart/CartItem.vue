<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
          :src="cartProduct.product.image"
          width="120"
          height="120"
          :alt="cartProduct.product.name"
      />
    </div>
    <h3 class="product__title">
      {{ cartProduct.product.name }}
    </h3>
    <span class="product__code">
      Артикул: {{ cartProduct.productId }}
    </span>

    <div class="product__counter form__counter">
      <button
          type="button"
          aria-label="Убрать один товар"
          @click="decreaseAmount">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="amount" name="count" />

      <button
          type="button"
          aria-label="Добавить один товар"
          @click="increaseAmount">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ numberFormat.price(cartProduct.product.price * cartProduct.amount) }} ₽
    </b>

    <button
        class="product__del button-del"
        type="button"
        aria-label="Удалить товар из корзины"
        @click="itemDelete(cartProduct.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: ['cartProduct'],
  computed: {
    amount: {
      get() {
        return this.cartProduct.amount;
      },
      set(amount) {
        this.$store.commit(
          'cartItemUpdateAmount',
          { productId: this.cartProduct.productId, amount },
        );
      },
    },
  },
  methods: {
    ...mapMutations({ itemDelete: 'cartItemDelete' }),

    increaseAmount() {
      this.amount += 1;
    },
    decreaseAmount() {
      this.amount -= 1;
    },
  },
};
</script>
