<template>
  <section class="catalog">
    <ProductList :products="products" />

    <BasePagination v-model:page="page" :count="countProducts" :per-page="perPage"/>
  </section>
</template>

<script>
import BasePagination from '@/components/BasePagination';
import ProductList from './components/products/ProductList';
import products from './data/products';

export default {
  name: 'App',
  components: { BasePagination, ProductList },
  data() {
    return {
      page: 1,
      perPage: 3,
    };
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.perPage;

      return products.slice(offset, offset + this.perPage);
    },
    countProducts() {
      return products.length;
    },
  },
};
</script>
