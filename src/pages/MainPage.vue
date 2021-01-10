<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info" v-show="productCount">
        {{ productCount }} товар(-ов)
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
          v-model:price-from="filterData.priceFrom"
          v-model:price-to="filterData.priceTo"
          v-model:category-id="filterData.categoryId"
          v-model:props="filterData.props"
      />

      <section class="catalog">
        <p v-if="pageLoadFailed">
          Ошибка загрузки
          <button @click.prevent="loadProducts">Попробовать ещё раз</button>
        </p>
        <p v-else-if="pageLoading">
          Идет загрузка товаров...
        </p>
        <ProductList :products="products" v-else />

        <BasePagination v-model:page="page" :count="countProducts" :per-page="perPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
import PageLoading from '@/mixins/page-loading.mixin';
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
      perPage: 12,
      filterData: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        props: {},
      },
      pageLoadingFailed: false,
    };
  },
  computed: {
    products() {
      if (this.productsData) {
        return this.productsData.items;
      }

      return [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
    filtration() {
      const filtration = {
        categoryId: this.filterData.categoryId > 0 ? this.filterData.categoryId : null,
        minPrice: this.filterData.priceFrom > 0 ? this.filterData.priceFrom : null,
        maxPrice: this.filterData.priceTo > 0
          && this.filterData.priceTo >= this.filterData.priceFrom ? this.filterData.priceTo : null,
      };

      if (Object.keys(this.filterData.props).length > 0) {
        Object.keys(this.filterData.props).forEach((key) => {
          filtration[`props[${key}]`] = this.filterData.props[key];
        });
      }

      return filtration;
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
    ...mapActions('product', ['loadProductsData']),

    async loadProducts() {
      this.pageLoadStart();
      this.pageLoadFail(false);

      try {
        this.productsData = await this.loadProductsData({
          pagination: this.pagination,
          filtration: this.filtration,
        });
      } catch (e) {
        console.log(e);
        this.pageLoadFail(true);
      } finally {
        this.pageLoadStop();
      }
    },
  },
};
</script>
