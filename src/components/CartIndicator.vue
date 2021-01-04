<template>
  <RouterLink
    class="header__cart"
    :class="{ 'cart-count-loading': isCartLoading }"
    :to="{ name: 'cart' }"
    aria-label="Корзина с товарами">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count"  aria-label="Количество товаров">
      {{ $store.state.cart.products.length }}
    </span>
  </RouterLink>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isCartLoading']),
  },
};
</script>

<style>
.cart-count-loading {
  opacity: .5;
}
</style>
