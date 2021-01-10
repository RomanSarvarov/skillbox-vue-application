<template>
  <ul v-if="products.length" class="catalog__list">
    <ProductItem
        v-for="product in products"
        :product="product"
        :key="product.id"
    />
  </ul>
  <p v-else>Товаров по данному запросу не найдено.</p>
</template>

<script>
import ProductItem from '@/components/products/ProductItem';

export default {
  components: { ProductItem },
  props: ['products'],
};
</script>
