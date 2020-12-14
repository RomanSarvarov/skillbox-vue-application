<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter />

      <section class="catalog">
        <ProductList :products="products" />

        <BasePagination v-model:page="page" :count="countProducts" :per-page="perPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import BasePagination from '@/components/BasePagination';
import ProductFilter from '@/components/products/ProductFilter';
import ProductList from './components/products/ProductList';
import products from './data/products';

export default {
  name: 'App',
  components: { ProductFilter, BasePagination, ProductList },
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
