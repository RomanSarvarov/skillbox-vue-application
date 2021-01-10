<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" method="GET" @submit.prevent="apply">
      <ProductPriceFilter
        v-model:price-from="currentPriceFrom"
        v-model:price-to="currentPriceTo"
      />

      <ProductCategoryFilter
        v-model:category-id="currentCategoryId"
        v-model:props="currentProps"
      />

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>

      <button v-show="filterDataAffected" class="filter__reset button button--second" type="button" @click="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import ProductPriceFilter from '@/components/products/filter/ProductPriceFilter';
import ProductCategoryFilter from '@/components/products/filter/ProductCategoryFilter';

export default {
  components: {
    ProductCategoryFilter,
    ProductPriceFilter,
  },
  props: ['priceFrom', 'priceTo', 'categoryId', 'color', 'props'],
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentProps: {},
    };
  },
  computed: {
    filterDataAffected() {
      return this.currentPriceFrom
          || this.currentPriceTo
          || this.currentCategoryId
          || Object.keys(this.currentProps).length > 0;
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
  },
  methods: {
    apply() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:props', this.currentProps);
    },
    reset() {
      this.currentPriceFrom = 0;
      this.currentPriceTo = 0;
      this.currentCategoryId = 0;
      this.currentProps = {};

      this.apply();
    },
  },
};
</script>
