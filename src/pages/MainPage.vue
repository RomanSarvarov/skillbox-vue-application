<template>
  <main class="content container">
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
        <p v-if="isPageLoadFailed">
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
import PageLoading from '@/mixins/page-loading';
import ProductFilter from '@/components/products/ProductFilter';
import BasePagination from '@/components/BasePagination';
import ProductList from '@/components/products/ProductList';

export default {
  components: { ProductFilter, BasePagination, ProductList },
  mixins: [PageLoading],
  data() {
    return {
      productsData: null,
      page: 1,
      perPage: 3,
      filterData: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        colorId: 0,
        color: null,
      },
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
        colorId: this.filterData.color,
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
    pagination: {
      handler() {
        this.loadProducts();
      },
      immediate: true,
    },
    filtration() {
      this.loadProducts();
    },
  },
  methods: {
    async loadProducts() {
      this.pageLoadStart();
      this.pageLoadFailed(false);

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
        this.pageLoadFailed(true);
      } finally {
        this.pageLoadStop();
      }
    },
  },
};
</script>
