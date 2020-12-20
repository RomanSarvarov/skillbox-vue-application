<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#" @click.prevent="this.navigate('product', {id: product.id})">
      <img :src="product.image" :alt="product.name">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.name }}
      </a>
    </h3>

    <span class="catalog__price">{{ this.numberFormat.price(product.price) }} ₽</span>

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
