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
      const response = await axios.get(`${this.appConstants.API_BASE_URL}/api/products`, {
        params: {
          ...this.filtration,
          ...this.pagination,
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
