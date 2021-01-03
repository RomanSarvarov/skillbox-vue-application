<template>
  <main class="content container" :class="{ 'page-loading': pageLoading }">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ productCount }} товар(-ов)
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
        <p v-if="pageLoadingFailed">
          Ошибка загрузки
          <button @click.prevent="loadProducts">Попробовать ещё раз</button>
        </p>
        <ProductList :products="products" v-else />

        <BasePagination v-model:page="page" :count="countProducts" :per-page="perPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import config from '@/config';
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
      pageLoading: false,
      pageLoadingFailed: false,
    };
  },
  computed: {
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
    filtration() {
      return {
        categoryId: this.filterData.categoryId > 0 ? this.filterData.categoryId : null,
        minPrice: this.filterData.priceFrom,
        maxPrice: this.filterData.priceTo >= this.filterData.priceFrom ? this.filterData.priceTo : null,
      };
    },
    pagination() {
      return {
        page: this.page,
        limit: this.perPage,
      };
    },
    productCount() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  watch: {
    pagination() {
      this.loadProducts();
    },
    filtration() {
      this.loadProducts();
    },
  },
  methods: {
    async loadProducts() {
      this.pageLoading = true;
      this.pageLoadingFailed = false;

      try {
        const response = await axios.get(`${config.API_URL}/api/products`, {
          params: {
            ...this.filtration,
            ...this.pagination,
          },
        });

        this.productsData = response.data;
      } catch (e) {
        console.log(e);
        this.pageLoadingFailed = true;
      } finally {
        this.pageLoading = false;
      }
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style>
.page-loading {
  opacity: .7;
  pointer-events: none;
}
</style>
