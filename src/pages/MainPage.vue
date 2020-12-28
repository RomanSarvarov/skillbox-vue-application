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
import axios from 'axios';
import ProductFilter from '@/components/products/ProductFilter';
import BasePagination from '@/components/BasePagination';
import ProductList from '@/components/products/ProductList';

export default {
  components: { ProductFilter, BasePagination, ProductList },
  data() {
    return {
      productsData: null,
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
      let filteredProducts = this.products;

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
          (product) => product.colors.findIndex(
            (color) => color.code === this.filterData.color,
          ) !== -1,
        );
      }

      return filteredProducts;
    },
    products() {
      if (this.productsData) {
        const products = this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }));

        return products;
      }

      return [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
  },
  methods: {
    async loadProducts() {
      const response = await axios.get('https://vue-study.dev.creonit.ru/api/products', {
        params: {
          page: this.page,
          limit: this.perPage,
        },
      });

      this.productsData = response.data;
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
