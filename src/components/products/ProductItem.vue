<template>
  <li class="catalog__item">
    <RouterLink :to="{ name: 'product', params: { id: product.id } }" class="catalog__pic">
      <img v-if="product.image" :src="product.image" :alt="product.title">
    </RouterLink>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">{{ numberHelper.price(currentPropPrice) }} ₽</span>

    <ProductColors
      v-model="color"
      class="colors--black"
      :colors="product.colors"
    />

    <ProductOffers
      v-if="isColorPropMain"
      v-model="prop"
      :props="product.offers"
    />
  </li>
</template>

<script>
import ProductOffers from '@/components/products/ProductOffers';
import ProductColors from './ProductColors';

export default {
  components: { ProductOffers, ProductColors },
  props: ['product'],
  data() {
    return {
      currentPropPrice: this.product.price,
      prop: null,
      color: null,
    };
  },
  computed: {
    isColorPropMain() {
      return this.colorHelper.isColorProp(this.product.mainProp.id);
    },
  },
  watch: {
    prop(propId) {
      const needleProp = this.product.offers.find(
        (offer) => offer.id === propId,
      );

      this.currentPropPrice = needleProp
        ? needleProp.price
        : this.product.price;
    },
  },
};
</script>
