<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
          v-if="cartProduct.product.preview"
          :src="cartProduct.product.preview.file.url"
          width="120"
          height="120"
          :alt="cartProduct.product.name"
      />
    </div>
    <h3 class="product__title">
      {{ cartProduct.product.title }}
    </h3>
    <span class="product__code">
      Артикул: {{ cartProduct.productId }}
    </span>

    <ProductAmount v-model="amount" class="product__counter" />

    <b class="product__price">
      {{ numberHelper.price(cartProduct.product.price * cartProduct.amount) }} ₽
    </b>

    <button
        class="product__del button-del"
        type="button"
        aria-label="Удалить товар из корзины"
        @click="cartItemDelete(cartProduct.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions } from 'vuex';
import ProductAmount from '@/components/products/ProductAmount';

export default {
  components: { ProductAmount },
  props: ['cartProduct'],
  computed: {
    amount: {
      get() {
        return this.cartProduct.amount;
      },
      set(amount) {
        this.cartItemUpdateAmount({ productId: this.cartProduct.productId, amount });
      },
    },
  },
  methods: {
    ...mapActions('cart', ['cartItemUpdateAmount', 'cartItemDelete']),
  },
};
</script>
