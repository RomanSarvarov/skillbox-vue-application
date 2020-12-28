<template>
  <li class="catalog__item">
    <RouterLink :to="{ name: 'product', params: { id: product.id } }" class="catalog__pic">
      <img :src="product.image" :alt="product.name">
    </RouterLink>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.name }}
      </a>
    </h3>

    <span class="catalog__price">{{ numberFormat.price(product.price) }} ₽</span>

    <ProductColors
      v-model:current-color="color"
      :colors="product.colors"
      class="colors--black"
    />
  </li>
</template>

<script>
import ProductColors from './ProductColors';

export default {
  components: { ProductColors },
  props: ['product'],
  data() {
    return {
      color: '#7386ea',
    };
  },
};
</script>
