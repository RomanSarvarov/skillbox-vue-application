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
      <ProductFilter
        v-model:price-from="filterData.priceFrom"
        v-model:price-to="filterData.priceTo"
        v-model:category-id="filterData.categoryId"
        v-model:color="filterData.color"
      />

      <section class="catalog">
        <ProductList :products="products" />

        <BasePagination v-model:page="page" :count="countProducts" :per-page="perPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import BasePagination from './components/BasePagination';
import ProductFilter from './components/products/ProductFilter';
import ProductList from './components/products/ProductList';
import products from './data/products';

export default {
  name: 'App',
  components: { ProductFilter, BasePagination, ProductList },
  data() {
    return {
      page: 1,
      perPage: 3,
      filterData: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        color: null,
      },
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filterData.priceFrom > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= this.filterData.priceFrom,
        );
      }

      if (this.filterData.priceTo > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price <= this.filterData.priceTo,
        );
      }

      if (this.filterData.categoryId > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryId === this.filterData.categoryId,
        );
      }

      if (this.filterData.color !== null) {
        filteredProducts = filteredProducts.filter(
          (product) => product.color === this.filterData.color,
        );
      }

      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.perPage;

      return this.filteredProducts.slice(offset, offset + this.perPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
};
</script>
