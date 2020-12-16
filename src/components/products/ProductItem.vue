<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.name">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.name }}
      </a>
    </h3>

    <span class="catalog__price">{{ product.price }} ₽</span>

    <ProductColors :colors="product.colors" />
  </li>
</template>

<script>
import ProductColors from "./ProductColors";
export default {
  components: {ProductColors},
  props: ['product'],
  data() {
    return {
      color: '#7386ea',
    };
  },
};
</script>
